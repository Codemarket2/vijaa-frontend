import { useState } from 'react';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import Link from 'next/link';
import { onAlert } from '../../utils/alert';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import StyleDrawer from '../style/StyleDrawer';
import { useRouter } from 'next/router';
import ItemScreen from '../list/ItemScreen';
import ImageList from '../post/ImageList';
import CommentLikeShare from '../common/commentLikeShare/CommentLikeShare';
import SingleComment from '../comment/SingleComment';
import { convertToSlug } from './LeftNavigation';
import DisplayRichText from '../common/DisplayRichText';
import Overlay from '../common/Overlay';
import { useUpdateListItemSettings } from '@frontend/shared/hooks/list';

interface IProps {
  fieldValue: any;
  field: any;
  parentId: string;
  onSelect?: (arg1: any, arg2: any) => void;
  index?: any;
  previewMode?: boolean;
  drawer?: boolean;
}

const initialState = {
  drawer: false,
  expandedItem: false,
  itemId: '',
};

export default function FieldValueCard({
  fieldValue,
  field,
  parentId,
  index,
  onSelect,
  drawer,
  previewMode = false,
}: IProps): any {
  const [state, setState] = useState({
    ...initialState,
  });
  const { query } = useRouter();
  // console.log(query);
  const [showHideComments, setShowHideComments] = useState(false);
  const auth = useSelector(({ auth }: any) => auth);
  const listItem = { ...field, slug: query.itemSlug, parentId, fieldId: field._id };
  // console.log(listItem);
  const { onSettingsChange } = useUpdateListItemSettings({ listItem, onAlert });
  const handleRemoveStyle = (field: any, styleKey: string) => {
    if (field?.options?.style) {
      const { [styleKey]: removedStyle, ...restStyles } = field?.options?.style;
      handleEditStyle(field._id, restStyles);
    }
  };
  const handleSubmit = (fieldId: string, values: any) => {
    onSettingsChange(
      listItem?.fields.map((field) =>
        field._id === fieldId ? { ...field, options: { ...field?.options, values } } : field,
      ),
    );
    setState(initialState);
  };

  const handleEditStyle = (fieldId: string, style: any) => {
    onSettingsChange([
      {
        ...field,
        settings: {
          ...field?.settings,
          styles: { [fieldId]: style },
        },
      },
    ]);
  };
  // console.log(field);
  return (
    <div>
      {!previewMode && (auth.admin || auth.attributes['custom:_id'] === fieldValue.createdBy._id) && (
        <div className="d-flex justify-content-end">
          <IconButton aria-label="settings" onClick={(event) => onSelect(event.target, fieldValue)}>
            <EditIcon />
          </IconButton>
        </div>
      )}
      {/* {drawer && ( */}
      <StyleDrawer
        onClose={() => setState(initialState)}
        open={true}
        styles={field?.options?.style || {}}
        handleResetStyle={() => handleEditStyle(field._id, {})}
        onStyleChange={(value) =>
          handleEditStyle(
            field._id,
            field?.settings?.styles?.field._id
              ? { ...field?.settings?.styles?.field._id, ...value }
              : value,
          )
        }
        removeStyle={(styleKey) => handleRemoveStyle(field, styleKey)}
      />
      {/* )} */}
      {console.log(field)}
      <div>
        {field.fieldType === 'date' ? (
          moment(fieldValue.valueDate).format('L')
        ) : field.fieldType === 'number' ? (
          fieldValue.valueNumber
        ) : field.fieldType === 'boolean' ? (
          fieldValue.valueBoolean.toString()
        ) : field.fieldType === 'type' ? (
          <div>
            <Tooltip title="More Details">
              <IconButton
                edge="start"
                onClick={() =>
                  setState({
                    ...state,
                    expandedItem: !state.expandedItem,
                    itemId: fieldValue._id,
                  })
                }
              >
                {state.expandedItem ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Tooltip>
            <Link href={`/types/${field.typeId.slug}/${fieldValue.itemId.slug}`}>
              {fieldValue.itemId.title}
            </Link>
            <Overlay
              open={state.expandedItem && state.itemId === fieldValue._id}
              onClose={() =>
                setState({
                  ...state,
                  expandedItem: false,
                  itemId: '',
                })
              }
            >
              <ItemScreen hideBreadcrumbs slug={fieldValue.itemId.slug} noTogglePreviewMode />
            </Overlay>
          </div>
        ) : field.fieldType === 'url' ? (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a target="_blank" href={fieldValue.value}>
            {fieldValue.value}
          </a>
        ) : field.fieldType === 'media' ? (
          <ImageList media={fieldValue.media} />
        ) : field.fieldType === 'textarea' || field.fieldType === 'contentBox' ? (
          <DisplayRichText value={fieldValue.value} />
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {fieldValue.value}
          </Typography>
        )}
      </div>
      {/* {!previewMode && (
        <> */}
      <CommentLikeShare
        showHideComments={showHideComments}
        setShowHideComments={setShowHideComments}
        parentId={fieldValue._id}
        index={index}
        itemSlug={convertToSlug(field.label)}
        fieldTitle={fieldValue?.itemId?.title?.trim().toLowerCase()}
      />
      <SingleComment
        setShowHideComments={setShowHideComments}
        _id={query?.commentId?.toString()}
        itemSlug={convertToSlug(field.label)}
        fieldTitle={fieldValue?.itemId?.title?.trim().toLowerCase()}
      />
      {/* </>
      )} */}
    </div>
  );
}
