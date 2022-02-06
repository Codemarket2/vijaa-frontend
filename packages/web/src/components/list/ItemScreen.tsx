import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EditIcon from '@material-ui/icons/Edit';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
  useCRUDListItems,
  useGetListItemBySlug,
  useDeleteListItem,
  usePublishListItem,
} from '@frontend/shared/hooks/list';
import { useAuthorization } from '@frontend/shared/hooks/auth';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { updateSettingAction } from '@frontend/shared/redux/actions/setting';
import { onAlert } from '../../utils/alert';
import FieldValues from '../field/FieldValues';
import ActionButtons from './ActionButtons';
import InlineForm from './InlineForm';
import MediaForm from './MediaForm';
import LeftNavigation from '../field/LeftNavigation';
import Breadcrumbs from '../common/Breadcrumbs';
import ErrorLoading from '../common/ErrorLoading';
import Backdrop from '../common/Backdrop';
import ImageList from '../post/ImageList';
import NotFound from '../common/NotFound';
import DisplayRichText from '../common/DisplayRichText';
import ListItemsFields from './ListItemsFields';
import ListItemsFieldsValue from './ListItemsFieldsValue';
import Overlay from '../common/Overlay';
import PermaLink from './PermaLink';

interface IProps {
  slug: string;
  setItem?: any;
  onSlugUpdate?: (arg: string) => void;
  pushToAnchor?: () => void;
  hideBreadcrumbs?: boolean;
  hideleft?: boolean;
}

export default function ItemScreen({
  slug,
  hideBreadcrumbs = false,
  setItem,
  onSlugUpdate,
  pushToAnchor,
  hideleft = false,
}: IProps): any {
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const setting = useSelector((state: any) => state.setting);
  const [state, setState] = useState({
    fieldName: '',
    fields: [],
    hideLeftNavigation: false,
  });
  const [seoFields, setSeoFields] = useState({ showDescription: false, showMedia: false });
  const [fieldValueCount, setFieldValueCount] = useState({});
  const { data, error } = useGetListItemBySlug({ slug });
  const authorized = useAuthorization([data?.getListItemBySlug?.createdBy?._id], true);
  console.log(seoFields.showDescription);
  const deleteCallBack = () => {
    router.push(
      `/types/${data?.getListItemBySlug?.types && data?.getListItemBySlug?.types[0]?.slug}`,
    );
  };

  const updateCallBack = (newSlug) => {
    setState({ ...state, fieldName: '' });
    if (newSlug !== slug && onSlugUpdate) {
      onSlugUpdate(newSlug);
    }
  };

  const { handleDelete, deleteLoading } = useDeleteListItem({ onAlert });
  const { handlePublish } = usePublishListItem();

  const dispatch = useDispatch();

  const {
    state: crudState,
    setState: setCrudState,
    formik,
    setFormValues,
    CRUDLoading,
  } = useCRUDListItems({
    onAlert,
    updateCallBack,
  });
  const handleHideBottomSheet = () => {
    dispatch(updateSettingAction({ bottomDrawer: false }));
  };

  const onCancel = () => {
    setState({ ...state, fieldName: '' });
  };

  const onEdit = (fieldName) => {
    setFormValues(data.getListItemBySlug);
    setState({ ...state, fieldName });
  };
  console.log(crudState);
  useEffect(() => {
    if (data && data.getListItemBySlug && setItem) {
      setItem(data.getListItemBySlug);
    }
  }, [data]);

  if (error || !data) {
    return <ErrorLoading error={error} />;
  }

  if (!data?.getListItemBySlug || (!authorized && !data?.getListItemBySlug?.active)) {
    return <NotFound />;
  }
  console.log(router.basePath);
  const leftNavigationProps = {
    parentId: data.getListItemBySlug?.types[0]?._id,
    slug: `/types/${data?.getListItemBySlug?.types[0]?.slug}/${data?.getListItemBySlug?.slug}`,
    // slug: previewMode
    //   ? `/page/${data?.getListItemBySlug?.slug}`
    //   : `/types/${data?.getListItemBySlug?.types[0]?.slug}/${data?.getListItemBySlug?.slug}`,
    fields: state.fields,
    fieldValueCount,
    layouts: JSON.parse(data.getListItemBySlug?.layouts) || {},
    itemSlug: data.getListItemBySlug.slug,
    _id: data.getListItemBySlug._id,
    previewMode: !authorized,
  };

  return (
    <div>
      {!hideBreadcrumbs && (
        <div className="d-flex justify-content-between align-content-center align-items-center">
          <Breadcrumbs>
            <Link href="/types">Template</Link>
            <Link href={`/types/${data.getListItemBySlug.types[0].slug}`}>
              <a>{data.getListItemBySlug.types[0].title}</a>
            </Link>
            <Typography color="textPrimary">
              {data.getListItemBySlug.title.includes('-n-e-w')
                ? 'Title'
                : data.getListItemBySlug.title}
            </Typography>
          </Breadcrumbs>
          <div className="d-flex align-items-center">
            {authorized && (
              <>
                <Tooltip title="Make a copy">
                  <IconButton onClick={() => alert('Comming soon')}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      checked={data.getListItemBySlug?.active}
                      onChange={() =>
                        handlePublish(
                          data.getListItemBySlug?._id,
                          slug,
                          !data.getListItemBySlug?.active,
                          data.getListItemBySlug?.authenticateUser,
                        )
                      }
                    />
                  }
                  label="Publish"
                />
                {data.getListItemBySlug?.active && (
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={data.getListItemBySlug?.authenticateUser}
                        onChange={() =>
                          handlePublish(
                            data.getListItemBySlug?._id,
                            slug,
                            data.getListItemBySlug?.active,
                            !data.getListItemBySlug?.authenticateUser,
                          )
                        }
                      />
                    }
                    label="Auth Required"
                  />
                )}
                <ActionButtons
                  onDelete={() => {
                    const answer = confirm('Are you sure you want to delete?');
                    if (answer) {
                      handleDelete(data.getListItemBySlug._id, deleteCallBack);
                    }
                  }}
                />
              </>
            )}
            <Tooltip title="share">
              <IconButton
                onClick={() =>
                  navigator.clipboard.writeText(`${window?.location?.origin}/page/${slug}`)
                }
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
      {!hideleft && (
        <>
          <Hidden smUp>
            <Drawer anchor="bottom" open={setting.bottomDrawer} onClose={handleHideBottomSheet}>
              <LeftNavigation
                style={{ maxHeight: '50vh' }}
                onClick={handleHideBottomSheet}
                setEditValue={(val: string) => {
                  onEdit(val);
                }}
                {...leftNavigationProps}
              >
                <ListItemsFields listItem={data.getListItemBySlug} previewMode={!authorized} />
              </LeftNavigation>
            </Drawer>
          </Hidden>
          <Hidden xsDown>
            <LeftNavigation
              style={{
                position: 'fixed',
                width: '15%',
                maxHeight: '80vh',
                paddingBottom: 10,
                overflowX: 'hidden',
                overflowY: 'auto',
              }}
              setEditValue={(val: string) => {
                onEdit(val);
              }}
              {...leftNavigationProps}
            >
              <ListItemsFields listItem={data.getListItemBySlug} previewMode={!authorized} />
            </LeftNavigation>
          </Hidden>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Paper
          style={{ width: matches || hideleft ? '100%' : '84%', border: 'none' }}
          variant="outlined"
          className="p-2 pb-5"
        >
          <>
            {state.fieldName === 'title' ? (
              <InlineForm
                fieldName={state.fieldName}
                label="Title"
                onCancel={onCancel}
                formik={formik}
                formLoading={CRUDLoading}
              />
            ) : (
              <>
                <Typography id="title" className="d-flex align-items-center">
                  Title
                  {authorized && (
                    <Tooltip title="Edit Title">
                      <IconButton onClick={() => onEdit('title')} size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Typography>
                <Typography
                  variant="h4"
                  variantMapping={{ h4: 'h1' }}
                  className="d-flex align-items-center"
                >
                  {data.getListItemBySlug.title.includes('-n-e-w')
                    ? 'Title'
                    : data.getListItemBySlug.title}
                </Typography>
              </>
            )}
            <Overlay
              open={
                state.fieldName === 'description' ||
                state.fieldName === 'media' ||
                state.fieldName === 'permaLink'
              }
              title={state.fieldName}
              onClose={() => {
                onCancel();
              }}
            >
              <div style={{ padding: '20px' }}>
                {state.fieldName === 'description' && (
                  <>
                    <InlineForm
                      multiline
                      fieldName={state.fieldName}
                      label={state.fieldName}
                      onCancel={onCancel}
                      formik={formik}
                      formLoading={CRUDLoading}
                    />
                    <DisplayRichText value={data.getListItemBySlug.description} />
                  </>
                )}
                {state.fieldName === 'media' && (
                  <MediaForm
                    state={crudState}
                    setState={setCrudState}
                    onCancel={onCancel}
                    onSave={formik.handleSubmit}
                    loading={CRUDLoading}
                  />
                )}
                {state.fieldName === 'permaLink' && (
                  <PermaLink
                    fieldName="permaLink"
                    label="permaLink"
                    onCancel={onCancel}
                    formik={formik}
                    formLoading={CRUDLoading}
                  />
                )}
              </div>
            </Overlay>
          </>
          {data.getListItemBySlug?.types[0]?._id && (
            <FieldValues
              pushToAnchor={pushToAnchor}
              parentId={data.getListItemBySlug._id}
              typeId={data.getListItemBySlug?.types[0]?._id}
              setFields={(fields) => setState({ ...state, fields })}
              setFieldValueCount={(index, value) =>
                setFieldValueCount({ ...fieldValueCount, [index]: value })
              }
              layouts={JSON.parse(data?.getListItemBySlug?.layouts) || {}}
              isPublish={data?.getListItemBySlug?.active}
              authorized={authorized}
            />
          )}
          <ListItemsFieldsValue listItem={data?.getListItemBySlug} previewMode={!authorized} />
        </Paper>
      </div>
      <Backdrop open={deleteLoading || CRUDLoading} />
    </div>
  );
}
