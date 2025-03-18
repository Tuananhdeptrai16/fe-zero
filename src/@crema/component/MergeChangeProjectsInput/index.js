import React, { useEffect, useMemo } from 'react';
import { uniq } from 'lodash';
import useFetch from 'src/@crema/hook/fetchData/useFetch';
import API from 'src/@crema/services/apis';
import { METHOD_FETCH } from 'src/shared/constants/FetchData';
import { Spin } from 'antd';
import { toDatetime } from 'src/shared/utils/filter';
import { PROJECT_CHANGE_LABEL } from 'src/shared/constants/ProjectConstants';
import { compareFieldChangeProject, getValue } from 'src/shared/utils/Project';

const MergeChangeProjectsInput = ({ onChange, histories, children }) => {
  const historyApply = histories.filter(
    (item) => item?.status === 'not_handle',
  );
  const projectIds = uniq(historyApply.map((item) => item?.project_id));
  const { data, isLoading } = useFetch(
    {
      url: API.GET_PROJECT_LIST_BY_IDS,
      method: METHOD_FETCH.POST,
      body: projectIds,
    },
    [...projectIds],
  );

  const projects = useMemo(() => {
    return (data?.result || []).map((project) => {
      return {
        ...project,
        util_ids: (project?.utils || [])?.map((item) => item?.id),
      };
    });
  }, [data?.result]);

  useEffect(() => {
    if (projects) {
      const projectsMerge = projects.map((project) => {
        const projectMerge = { ...project };
        const historyProject = historyApply
          .filter((history) => history?.project_id === project?.id)
          .sort((a, b) => {
            if (a.created_at && b.created_at) {
              return toDatetime(a.created_at) - toDatetime(b.created_at);
            }

            return true;
          });

        PROJECT_CHANGE_LABEL.forEach((field) => {
          historyProject.forEach((history) => {
            const changeProject = history?.content || {};
            if (
              !compareFieldChangeProject(projectMerge, changeProject, field)
            ) {
              projectMerge[field.value] = changeProject[field.value];

              if (field?.fieldId && field?.key) {
                projectMerge[field?.fieldId] = getValue(
                  changeProject[field.value],
                  field?.key,
                );
              }
            }
          });
        });
        projectMerge.history_of_project_ids = historyProject.map(
          (history) => history?.id,
        );
        return projectMerge;
      });
      onChange(projectsMerge);
    }
  }, [projects]);

  return <Spin spinning={isLoading}>{children}</Spin>;
};

MergeChangeProjectsInput.propTypes = {};

MergeChangeProjectsInput.defaultProps = {};

export default MergeChangeProjectsInput;
