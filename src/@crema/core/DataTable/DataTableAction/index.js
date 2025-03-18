import React from 'react';
import PropTypes from 'prop-types';
import AppIconButton from 'src/@crema/core/AppIconButton';
import IntlMessages from 'src/@crema/utility/IntlMessages';
import { isFunction, isObject, isString } from 'src/shared/utils/Typeof';

import styles from './index.module.scss';

const DataTableAction = ({ row, actions }) => {
  // console.log({ actions });
  const checkVisibleAction = (action) => {
    const { visible } = action;
    if (isFunction(visible)) {
      return visible(row);
    }

    return true;
  };

  const renderTitle = (label) => {
    if (isObject(label)) {
      return <IntlMessages {...label} />;
    } else if (isString(label)) {
      return <IntlMessages id={label} />;
    }
    return '';
  };

  return (
    <div className={styles.dataTableAction}>
      {actions.map((action, index) => {
        const { label, icon, onClick, component, render } = action;
        const isVisible = checkVisibleAction(action);
        if (!isVisible) {
          return null;
        }
        if (component) {
          return <div key={`action-button-${index}`}>{component}</div>;
        }
        if (render) {
          if (isFunction(render)) {
            return render(row);
          }
          return render;
        }
        return (
          <AppIconButton
            key={`action-button-${index}`}
            title={renderTitle(label)}
            icon={icon}
            onClick={() => {
              onClick(row);
            }}
          />
        );
      })}
    </div>
  );
};

DataTableAction.propTypes = {
  row: PropTypes.object.isRequired,
  actions: PropTypes.array,
};

DataTableAction.defaultProps = {};

export default DataTableAction;
