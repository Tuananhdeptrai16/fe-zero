import React from 'react';
import { Link } from 'react-router-dom';
import config from 'src/config';

const RenderProject = ({ project }) => {
  if (project) {
    return (
      <Link to={`${config.routes.reportEditProject}/${project?.id}`}>
        {project.title}
      </Link>
    );
  }
  return '';
};

RenderProject.propTypes = {};

RenderProject.defaultProps = {};

export default RenderProject;
