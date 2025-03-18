import config from 'src/config/index';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { TYPES_ICON_WORKSPACE } from './DataFixed';
import { REACT_APP_DATA_WAREHOUSE_URL } from 'src/shared/constants/serverConfig';

export const FeatureWorkspace = [
  {
    messageId: 'sidebar.sourceData',
    children: [
      {
        id: ROUTER_NAME.LIST_SOURCE_DATA_ORGANIZATION,
        path: config.routes.listSourceOrganizationTraining,
      },
      {
        id: ROUTER_NAME.LIST_SOURCE_DATA_E_LEARNING,
        path: config.routes.listSourceELearning,
      },
      {
        id: ROUTER_NAME.LIST_SOURCE_DATA_DMDC,
        path: config.routes.listSourceDMDC,
      },
      {
        id: ROUTER_NAME.LIST_SOURCE_DATA_MANAGEMENT_NCKH,
        path: config.routes.listSourceManagerNCKH,
      },
      {
        id: ROUTER_NAME.LIST_SOURCE_DATA_SUPPORT_TRAINING,
        path: config.routes.listSourceSupportTraining,
      },
      {
        id: ROUTER_NAME.LIST_SOURCE_DATA_EXAMINATION,
        path: config.routes.listSourceExamination,
      },
      {
        id: ROUTER_NAME.LIST_SOURCE_DATA_EXECUTIVE_DOCUMENT,
        path: config.routes.listSourceExecutiveDocuments,
      },
      {
        id: ROUTER_NAME.LIST_SOURCE_DATA_OFFICE_MANAGER,
        path: config.routes.listSourceOfficeManager,
      },
    ],
    typeIconWorkspace: TYPES_ICON_WORKSPACE.management,
  },
  {
    messageId: 'intermediate_data_area',
    children: [
      {
        id: ROUTER_NAME.DATA_INTEGRATION_ORGANIZATION,
        path: config.routes.integrateOrganizationTraining,
      },
      {
        id: ROUTER_NAME.DATA_INTEGRATION_E_LEARNING,
        path: config.routes.integrate_E_learning,
      },
      {
        id: ROUTER_NAME.DATA_INTEGRATION_E_DMDC,
        path: config.routes.integrate_DMDC,
      },
      {
        id: ROUTER_NAME.DATA_INTEGRATION_NCKH,
        path: config.routes.integrate_management_NCKH,
      },
      {
        id: ROUTER_NAME.DATA_INTEGRATION_SUPPORT_TRAINING,
        path: config.routes.integrate_support_training,
      },
      {
        id: ROUTER_NAME.DATA_INTEGRATION_EXAMINATION,
        path: config.routes.integrate_examination,
      },
      {
        id: ROUTER_NAME.DATA_INTEGRATION_EXECUTIVE_DOCUMENT,
        path: config.routes.integrate_executive_documents,
      },
      {
        id: ROUTER_NAME.DATA_INTEGRATION_OFFICE_MANAGER,
        path: config.routes.integrate_office_manager,
      },
    ],
    typeIconWorkspace: TYPES_ICON_WORKSPACE.management,
  },
  {
    id: ROUTER_NAME.NUCLEAR_REGION,
    messageId: 'nuclear_region',
    children: [
      {
        id: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_ORGANIZE_TRAINING,
        path: config.routes.dataAggregationMechanismOrganization,
      },
      {
        id: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_E_LEARNING,
        path: config.routes.dataAggregationMechanismELearning,
      },
      {
        id: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_DMDC,
        path: config.routes.dataAggregationMechanisDMDC,
      },
      {
        id: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_MANAGEMENT_NCKH,
        path: config.routes.dataAggregationMechanisManagement_NCKH,
      },
      {
        id: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_SUPPORT_TRAINING,
        path: config.routes.dataAggregationMechanis_support_training,
      },
      {
        id: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_EXAMINATION,
        path: config.routes.dataAggregationMechanis_examination,
      },
      {
        id: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_EXECUTIVE_DOCUMENT,
        path: config.routes.dataAggregationMechanis_executive_documents,
      },
      {
        id: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_OFFICE_MANAGER,
        path: config.routes.dataAggregationMechanis_office_manager,
      },
    ],
    typeIconWorkspace: TYPES_ICON_WORKSPACE.management,
  },
  {
    id: ROUTER_NAME.AGGREGATE_DATA_MARK,
    messageId: 'aggregate_data_mark',
    typeIconWorkspace: TYPES_ICON_WORKSPACE.integration,
    children: [
      {
        id: ROUTER_NAME.AGGREGATE_DATA_MARK_TRAINING,
        path: config.routes.aggregate_data_mark_training,
      },
      {
        id: ROUTER_NAME.AGGREGATE_DATA_MARK_COURSE_RESEARCH_STATUS,
        path: config.routes.aggregate_data_mark_course_research_status,
      },
    ],
  },
  {
    id: ROUTER_NAME.ANALYTICAL_REPORT,
    messageId: 'sidebar.analytical_report',
    path: `${REACT_APP_DATA_WAREHOUSE_URL}/superset/dashboard/292`,
    typeIconWorkspace: TYPES_ICON_WORKSPACE.listProgress,
  },
  {
    messageId: 'sidebar.data_service',
    typeIconWorkspace: TYPES_ICON_WORKSPACE.listProgress,
    children: [
      {
        id: ROUTER_NAME.LIST_SCIENTIST,
        path: config.routes.list_scientist,
      },
      {
        id: ROUTER_NAME.LIST_SCIENTIFIC_RESEARCH_TOPIC,
        path: config.routes.list_scientific_research_topic,
      },
      {
        id: ROUTER_NAME.LIST_SCIENTIFIC_RESEARCH_AWARD,
        path: config.routes.list_scientific_research_award,
      },
      {
        id: ROUTER_NAME.LIST_PUBLICATION,
        path: config.routes.list_publication,
      },
    ],
  },
  {
    messageId: 'sidebar.user_management_group',
    typeIconWorkspace: TYPES_ICON_WORKSPACE.management,
    children: [
      {
        id: ROUTER_NAME.ROLE,
        path: config.routes.adminRole,
      },
      {
        id: ROUTER_NAME.USERS,
        path: config.routes.userManage,
      },
    ],
  },
  {
    messageId: 'sidebar.list_criterion',
    typeIconWorkspace: TYPES_ICON_WORKSPACE.listProgress,
    children: [
      {
        id: ROUTER_NAME.LIST_CRITERION,
        path: config.routes.list_criterion,
      },
    ],
  },
  {
    messageId: 'sidebar.formula_management',
    typeIconWorkspace: TYPES_ICON_WORKSPACE.management,
    children: [
      {
        id: ROUTER_NAME.FORMULA_MANAGEMENT,
        path: config.routes.formulaManage,
      },
    ],
  },
  {
    messageId: 'sidebar.manage_add_data',
    typeIconWorkspace: TYPES_ICON_WORKSPACE.management,
    children: [
      {
        id: ROUTER_NAME.MANAGE_DATA_COMMON_UNIT,
        path: config.routes.manageDataCommonUnit,
      },
      {
        id: ROUTER_NAME.MANAGE_ACHIEVES_UNIT,
        path: config.routes.manageAchievesUnit,
      },
      {
        id: ROUTER_NAME.MANAGE_LEADERS,
        path: config.routes.manageLeaders,
      },
      {
        id: ROUTER_NAME.MANAGE_TEACHERS,
        path: config.routes.manageTeachers,
      },
    ],
  },
  {
    messageId: 'sidebar.report_list',
    typeIconWorkspace: TYPES_ICON_WORKSPACE.queryData,
    children: [
      {
        id: ROUTER_NAME.SQL_LAB,
        path: `${REACT_APP_DATA_WAREHOUSE_URL}/dashboard/list`,
      },
      {
        id: ROUTER_NAME.SQL_LAB0,
        path: `${REACT_APP_DATA_WAREHOUSE_URL}/chart/list`,
      },
      {
        id: ROUTER_NAME.SQL_LAB1,
        path: `${REACT_APP_DATA_WAREHOUSE_URL}/tablemodelview/list`,
      },
      {
        id: ROUTER_NAME.SQL_LAB2,
        path: config.routes.report_template,
      },
      {
        id: ROUTER_NAME.SQL_LAB3,
        path: config.routes.export_history,
      },
    ],
  },
];
