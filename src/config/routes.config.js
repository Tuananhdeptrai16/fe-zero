const routes = {
  region: '/region',
  project: '/project',
  detailProject: '/project',
  historyProject: '/history-project',
  approveProject: '/approve-project',
  investor: '/investor',
  profile: '/my-profile',
  profileByTab: (tab) => `/my-profile?tab=${tab}`,

  configuration_warehouse: '/configuration_warehouse',

  reportInventoryEvidence: '/report-inventory-evidence',
  warehouseImportExportHistory: '/warehouse-import-export-history',
  //End Quan li kho tang vat
  projectList: '/project/list',
  reportEditProject: '/report-edit-project',
  projectChange: '/project/change',
  detailProjectChange: '/project/change',
  editHistoryProject: '/project/change/edit',
  detailOriginProject: '/project/detail',

  ambassadorList: '/ambassador/list',

  order: '/order',
  orderMomo: '/order-momo',

  userManage: '/user-manage/accounts',
  contactManage: '/user-manage/contacts',
  formulaManage: '/formula-management',
  formulaManageAdd: '/formula-management/add',
  formulaManageDetail: (id) => `/formula-management/detail/${id}`,

  reportList: '/report-manage/list',
  detailReport: '/report-manage/list',
  addReportList: '/report-manage/list/add',
  reportPackage: '/report-manage/package',
  reportContent: '/report-manage/content',

  reportDownload: '/report-download-management',

  businessPartner: '/business-partner',

  qa: '/qa/list',
  qa_category: '/qa/category/list',
  news: '/news',
  adminRole: '/admin/role',
  adminPermission: '/admin/permission',

  organization: '/organization',
  detailOrganization: '/detail-organization/:id',
  subsetOrganization: '/subset-organization',
  department: '/department',
  citizen_list: '/citizen/list',

  organizationDetail: '/organization/detail-organization/:id',

  verdict: '/verdict',

  documentType: '/document/document-type',
  rawDocument: '/document/raw-document',
  documentJudgment: '/document/document-judgment',
  detailRawDocument: (id) => `/document/raw-document/detail/${id}`,

  judicialListRecord: '/judicial/list-record',
  judicialCreateRecord: '/judicial/create-record',
  judicialCreateRecordAdd: '/judicial/create-record/add',
  judicialRecordEdit: (id) => `/judicial/create-record/edit/${id}`,
  detailJudicialRecord: (status, id) =>
    `/judicial/create-record/${status}/${id}`,
  judicialRecordVerify: '/judicial/verify-record',
  judicialRecordVerifyDetail: '/judicial/verify-record/:id',
  judicialViewSyncStatus: (id) => `/judicial/view-sync-status/${id}`,

  //Record management
  recordManagement: '/record-management',
  policeRecord: '/record-management/police-record',
  courtRecord: '/record-management/court-record',
  justiceDepartmentRecord: '/record-management/justice-lgsp-record',
  judgmentExecutionRecord: '/record-management/judgment-execution-record',
  controlInstituteRecord: '/record-management/control-institute-record',

  // Quản lý dữ liệu chờ số hóa
  digitizedData: '/digitized-data',
  pushConnectApi: '/digitized-data/push-connect-api',
  pushConnectApiDetail: (id) => `/digitized-data/push-connect-api/${id}`,
  pushDataToDigitizationPlatform:
    '/digitized-data/push-data-to-digitized-platform',
  receiveConnectApi: '/digitized-data/receive-connect-api',
  receiveConnectApiDetail: (id) => `/digitized-data/receive-connect-api/${id}`,
  receiveDataToDigitizationPlatform:
    '/digitized-data/receive-data-to-digitized-platform',
  extractedDigitizedDocument: '/digitized-data/extracted-digitized-document',

  //Quản lý nguồn dữ liệu
  listConnectionMSSQL: '/management-data-source/list-connection-mssql',
  listSourceMSSQL: '/management-data-source/list-source-mssql',

  searchOrganization: '/dataset-intermediate-organization',
  searchELearning: '/dataset-intermediate-e_learning',
  searchDMDC: '/dataset-intermediate-dmdc',
  searchNCKH: '/dataset-intermediate-nckh',
  searchSupport: '/dataset-intermediate-support',
  searchExamination: '/dataset-intermediate-examination',
  searchDocument: '/dataset-intermediate-document',
  searchOffice: '/dataset-intermediate-office',

  manageDataVersionsMSSQL: '/management-data-source/manage-data-versions-mssql',
  automaticDataEnrichmentMSSQL:
    '/management-data-source/automatic-data-enrichment-mssql',

  dataSourcesIframe: '/data-source',
  targetDataSource: '/target-data-source',
  dataSourceConnect: '/data-source-connect',

  airflowConfig: '/in-depth-stream-config',
  airflowAddData: '/airflow-add-data',
  airflowScheduleJob: '/schedule-job',
  airflowManageJob: '/manage-job',

  dremio_dataset: '/dremio-dataset',
  dremio_sql_runner: '/dremio-sql-runner',
  dremio_jobs: '/dremio-jobs',
  integrate_from_existing_files: '/integrate-from-existing-files',
  update_connection_information_database:
    '/update-connection-information-database',
  integrate_data_from_non_paginated_URLs:
    '/integrate_data_from_non_paginated_URLs',
  integrate_data_from_URL_pagination: '/integrate_data_from_URL_pagination',

  import_data_from_cloud_storage_services:
    '/import_data_from_cloud_storage_services',
  integrate_data_from_cloud_databases: '/integrate-data-from-cloud-database',
  integrate_data_using_FTP_connection: '/integrate-data-using-FTP-connection',
  mitoNormalizeEnrichData: '/normalize-enrich-data',
  integrate_data_from_existing_files: '/integrate-data-from-existing-files',

  listConnectionPostgreSQL:
    '/management-data-source/list-connection-postgresql',
  listSourcePostgreSQL: '/management-data-source/list-source-postgresql',
  manageDataVersionsPostgreSQL:
    '/management-data-source/manage-data-versions-postgresql',
  automaticDataEnrichmentPostgreSQL:
    '/management-data-source/automatic-data-enrichment-postgresql',

  listConnectionMySQL: '/management-data-source/list-connection-mysql',
  listSourceMySQL: '/management-data-source/list-source-mysql',
  manageDataVersionsMySQL: '/management-data-source/manage-data-version-mysql',
  automaticDataEnrichmentMySQL:
    '/management-data-source/automatic-data-enrichment-mysql',
  listSourceDetails: (id) => `/destination/${id}`,

  listConnectionOracle: '/management-data-source/list-connection-oracle',
  listSourceOracle: '/management-data-source/list-source-oracle',
  manageDataVersionsOracle:
    '/management-data-source/manage-data-version-oracle',
  automaticDataEnrichmentOracle:
    '/management-data-source/automatic-data-enrichment-oracle',

  listConnectionFile: '/management-data-source/list-connection-file',
  listSourceFile: '/management-data-source/list-source-file',
  manageDataVersionFile: '/management-data-source/manage-data-version-file',
  automaticDataEnrichmentFile:
    '/management-data-source/automatic-data-enrichment-file',

  listConnectionAPI: '/management-data-source/list-connection-api',
  listSourceAPI: '/management-data-source/list-source-api',
  manageDataVersionApi: '/management-data-source/manage-data-version-api',
  automaticDataEnrichmentApi:
    '/management-data-source/automatic-data-enrichment-api',

  configDataProcess: '/management-data-source/config-data-process',
  listSourceData: '/management-data-source/list-source-data',
  configApiProcess: '/management-data-source/config-api-process',
  listSourceApi: '/management-data-source/list-source-api',
  detailInfoData: (pageName, id) => `/${pageName}/detail-info-data/${id}`,
  detailHistoryData: (pageName, id) => `/${pageName}/detail-info-history/${id}`,
  configClear: (pageName, id) => `/${pageName}/config-clear/${id}`,
  configClearView: `/list_progress_organization-training/config-clear`,
  detailSourceData: (id) => `/detail-source-data/${id}`,
  detailConnectionList: (id) => `/detail-connection-list/${id}`,
  systemSetting: '/system-setting',
  formSetting: '/form-setting-all',
  formSettingVerdict: '/form-setting-verdict',
  formSettingPolice: '/form-setting-police',
  formSettingCourt: '/form-setting-court',
  formSettingProcuracy: '/form-setting-procuracy',
  formSettingExecutionJudgment: '/form-setting-execution-judgment',
  formSettingDecisionJudiciary: '/form-setting-decision-judiciary',
  listWaitingDigital: '/list-waiting-digital',
  listDocumentWaitingConfirm: '/list-document-waiting-confirm',
  serviceParamsConfig: '/service-params-config',

  userActionLog: '/system-log/user-action-log',
  accessLog: '/system-log/access-log',
  settingLog: '/system-log/setting-log',
  loginStatus: '/system-log/login-status',

  manageDataCommonUnit: '/information-academy',
  createDataCommonUnit: '/information-academy/create',
  editDataCommonUnit: (id) => `/information-academy/edit/${id}`,
  manageAchievesUnit: '/accomplishments-academy',
  manageLeaders: '/list-leader-academy',
  createLeaders: '/list-leader-academy/create',
  editLeaders: (id) => `/list-leader-academy/edit/${id}`,
  manageTeachers: '/information-personnel-academy',
  createTeachers: '/information-personnel-academy/create',
  editTeachers: (id) => `/information-personnel-academy/edit/${id}`,

  notifications: '/notifications',

  helpCenter: '/help',
  listQA: '/help/qa',

  usageGuideManage: '/usage-guide/manage',
  usageGuideView: '/usage-guide/view',

  shareApiConfig: '/share-api-config/all',
  shareApiDistrict: '/share-api-config/district',
  shareApiProvince: '/share-api-config/province',
  shareApiDepartment: '/share-api-config/department',
  shareApiLgsp: '/share-api-config/lgsp',
  shareApiCity: '/share-api-config/city',
  shareApiProvinceInformation: '/share-api-config/province-information-portal',
  shareApiProcurement: '/share-api-config/procurement',
  shareApiCourt: '/share-api-config/court',
  shareApiTha: '/share-api-config/tha',
  shareApiExeJudgment: '/share-api-config/execution-judgment',
  shareApiPolice: '/share-api-config/police',

  searchJudicialRecords: '/backend-data-warehouse/judicial-records',
  searchJudicialRecordsByIdCard:
    '/backend-data-warehouse/judicial-records/by-id-card',
  searchJudicialRecordsByName:
    '/backend-data-warehouse/judicial-records/by-name',
  detailJudicialRecordBDW: (id) =>
    `/backend-data-warehouse/judicial-records/${id}`,

  workspace: '/workspace',

  systemMonitoringReport: '/system_monitoring_report',
  ioc_pandemic: '/ioc-pandemic',
  ioc_medical: '/ioc-medical',

  search_index_list: '/search-index-list',
  search_index_list_medical: '/search-index-list-medical',
  search_index_list_education: '/search-index-list-education',
  search_index_list_judicial: '/search-index-list-judicial',
  search_index_list_social_insurance: '/search-index-list-social-insurance',
  search_index_list_transportation: '/search-index-list-transportation',
  search_index_list_invalids_social_affairs:
    '/search-index-list-invalids-social-affairs',
  search_index_list_information_communication:
    '/search-index-list-information-communication',
  search_index_list_culture_sports_tourism:
    '/search-index-list-culture-sports-tourism',
  search_index_list_investment_plan: '/search-index-list-investment-plan',
  search_index_list_finance_treasury: '/search-index-list-finance-treasury',
  search_index_list_construction_industry:
    '/search-index-list-construction-industry',
  search_index_list_internal_affairs: '/search-index-list-internal-affairs',
  search_engine_index_add: '/search-engine-index-add',
  config_index: (id) => `/config-index/${id}`,
  sync_data_search_engine: (id) => `/sync-data-search/${id}`,
  test_search_index: (id) => `/test-search-index/${id}`,

  config_query_organization: '/config-permissions-organization',
  retrieve_data_api: '/retrieve-data-api',

  data_governance_card_management: '/list-card-management',
  data_governance_card_classification: '/list-card-classification',

  // schools warehouse
  listSourceOrganizationTraining: '/list-source-organization',
  list_progress_organization_training: '/list-connection-organization',

  listSourceELearning: '/list-source-e_learning',
  list_progress_ELearning: '/list-connection-e_learning',

  listSourceDMDC: '/list-source-dmdc',
  list_progress_DMDC: '/list-connection-dmdc',

  listSourceManagerNCKH: '/list-source-nckh',
  list_progress_ManagerNCKH: '/list-connection-nckh',

  listSourceSupportTraining: '/list-source-support',
  list_progress_SupportTraining: '/list-connection-support',

  listSourceExamination: '/list-source-examination',
  list_progress_Examination: '/list-connection-examination',

  listSourceExecutiveDocuments: '/list-source-document',
  list_progress_ExecutiveDocuments: '/list-connection-document',

  listSourceOfficeManager: '/list-source-office',
  list_progress_OfficeManager: '/list-connection-office',

  integrateOrganizationTraining: '/list-intermediate-organization',
  integrate_E_learning: '/list-intermediate-e_learning',
  integrate_DMDC: '/list-intermediate-dmdc',
  integrate_management_NCKH: '/list-intermediate-nckh',
  integrate_support_training: '/list-intermediate-support',
  integrate_examination: '/list-intermediate-examination',
  integrate_executive_documents: '/list-intermediate-document',
  integrate_office_manager: '/list-intermediate-office',

  aggregate_data_mark_training: '/job-dtm-educational',
  aggregate_data_mark_training_add: '/job-dtm-educational/add-job',
  detail_data_mark_training: (id) => `/job-dtm-educational/detail-job/${id}`,

  aggregate_data_mark_course_research_status: '/job-dtm-science',
  aggregate_data_mark_course_research_status_add: '/job-dtm-science/add-job',
  detail_data_mark_course_research_status: (id) =>
    `/job-dtm-science/detail-job/${id}`,

  aggregate_data_mark_static: '/job-dtm-static',
  aggregate_data_mark_static_add: '/job-dtm-static/add-job',
  detail_data_mark_static: (id) => `/job-dtm-static/detail-job/${id}`,

  nuclear_region: '/nuclear_region',

  dataAggregationMechanismOrganization: '/job-nuclear-organization',
  look_up_collected_results_organization: '/dataset-nuclear-organization',
  detailJobOrganization: (id) => `/job-nuclear-organization/detail-job/${id}`,
  addJobOrganization: `/job-nuclear-organization/addJob`,

  dataAggregationMechanismELearning: '/job-nuclear-e_learning',
  look_up_collected_results_eLearning: '/dataset-nuclear-e_learning',
  detailJobELearning: (id) => `/job-nuclear-e_learning/detail-job/${id}`,
  addJobELearning: `/job-nuclear-e_learning/addJob`,

  dataAggregationMechanisDMDC: '/job-nuclear-dmdc',
  look_up_collected_results_DMDC: '/dataset-nuclear-dmdc',
  detailJobDMDC: (id) => `/job-nuclear-dmdc/detail-job/${id}`,
  addJobDMDC: `/job-nuclear-dmdc/addJob`,

  dataAggregationMechanisManagement_NCKH: '/job-nuclear-nckh',
  look_up_collected_results_management_NCKH: '/dataset-nuclear-nckh',
  detailJobNCKH: (id) => `/job-nuclear-nckh/detail-job/${id}`,
  addJobNCKH: `/job-nuclear-nckh/addJob`,

  dataAggregationMechanis_support_training: '/job-nuclear-support',
  look_up_collected_results_support_training: '/dataset-nuclear-support',
  detailJobSupport: (id) => `/job-nuclear-support/detail-job/${id}`,
  addJobSupport: `/job-nuclear-support/addJob`,

  dataAggregationMechanis_examination: '/job-nuclear-examination',
  look_up_collected_results_examination: '/dataset-nuclear-examination',
  detailJobExamination: (id) => `/job-nuclear-examination/detail-job/${id}`,
  addJobExamination: `/job-nuclear-examination/addJob`,

  dataAggregationMechanis_executive_documents: '/job-nuclear-document',
  look_up_collected_results_executive_documents: '/dataset-nuclear-document',
  detailJobDocument: (id) => `/job-nuclear-document/detail-job/${id}`,
  addJobDocument: `/job-nuclear-document/addJob`,

  dataAggregationMechanis_office_manager: '/job-nuclear-office',
  look_up_collected_results_office_manager: '/dataset-nuclear-office',
  detailJobOffice: (id) => `/job-nuclear-office/detail-job/${id}`,
  addJobOffice: `/job-nuclear-office/addJob`,

  //Dich vu du lieu
  list_scientist: '/list-scientist',
  list_scientific_research_topic: '/list-science-topic',
  list_scientific_research_award: '/list-prize',
  list_publication: '/list-publications',

  //Tra cứu chỉ tiêu
  list_criterion: '/list-criterion',

  //Thiết lập vùng dữ liệu chủ đề
  summary_static_report: '/summary-static-report',
  summary_dynamic_report: '/summary-dynamic-report',
  summary_dynamic_report_add_job: '/summary-dynamic-report/add-job',
  detail_data_mark_report_dynamic: (id) =>
    `/summary-dynamic-report/detail-job/${id}`,

  summary_kpi: '/summary-kpi',
  summary_api_service: '/summary-api-service',

  report_static_job: '/report-static-job-add',
  detail_report_static_job: (id) => `/report-static-job/detail-job/${id}`,

  //Thiết lập tổng hợp báo cáo động
  dynamic_quality_assurance: '/dynamic-quality-assurance',
  dynamic_quality_assurance_add_job: '/dynamic-quality-assurance/add-job',
  detail_dynamic_quality_assurance: (id) =>
    `/dynamic-quality-assurance/detail-job/${id}`,

  dynamic_training_organization: '/dynamic-training-organization',
  dynamic_training_organization_add_job:
    '/dynamic-training-organization/add-job',
  detail_dynamic_training_organization: (id) =>
    `/dynamic-training-organization/detail-job/${id}`,

  dynamic_academy_operations: '/dynamic-academy-operations',
  dynamic_academy_operations_add_job: '/dynamic-academy-operations/add-job',
  detail_dynamic_academy_operations: (id) =>
    `/dynamic-academy-operations/detail-job/${id}`,

  dynamic_examination_assessment: '/dynamic-examination-assessment',
  dynamic_examination_assessment_add_job:
    '/dynamic-examination-assessment/add-job',
  detail_dynamic_examination_assessment: (id) =>
    `/dynamic-examination-assessment/detail-job/${id}`,

  dynamic_graduation_certification: '/dynamic-graduation-certification',
  dynamic_graduation_certification_add_job:
    '/dynamic-graduation-certification/add-job',
  detail_dynamic_graduation_certification: (id) =>
    `/dynamic-graduation-certification/detail-job/${id}`,

  dynamic_student_progress: '/dynamic-student-progress',
  dynamic_student_progress_add_job: '/dynamic-student-progress/add-job',
  detail_dynamic_student_progress: (id) =>
    `/dynamic-student-progress/detail-job/${id}`,

  dynamic_faculty_situation: '/dynamic-faculty-situation',
  dynamic_faculty_situation_add_job: '/dynamic-faculty-situation/add-job',
  detail_dynamic_faculty_situation: (id) =>
    `/dynamic-faculty-situation/detail-job/${id}`,

  dynamic_academic_finance: '/dynamic-academic-finance',
  dynamic_academic_finance_add_job: '/dynamic-academic-finance/add-job',
  detail_dynamic_academic_finance: (id) =>
    `/dynamic-academic-finance/detail-job/${id}`,

  dynamic_scientific_research: '/dynamic-scientific-research',
  dynamic_scientific_research_add_job: '/dynamic-scientific-research/add-job',
  detail_dynamic_scientific_research: (id) =>
    `/dynamic-scientific-research/detail-job/${id}`,

  //Báo cáo tĩnh tình hình đào tạo
  static_training_report: '/static-training-report',

  enrollment_statistics: '/enrollment-statistics',
  enrollment_statistics_add_job: '/enrollment-statistics/add-job',
  detail_enrollment_statistics: (id) =>
    `/enrollment-statistics/detail-job/${id}`,

  international_students: '/international-students',
  international_students_add_job: '/international-students/add-job',
  detail_international_students: (id) =>
    `/international-students/detail-job/${id}`,

  research_participation: '/research-participation',
  research_participation_add_job: '/research-participation/add-job',
  detail_research_participation: (id) =>
    `/research-participation/detail-job/${id}`,

  internship_activities: '/internship-activities',
  internship_activities_add_job: '/internship-activities/add-job',
  detail_internship_activities: (id) =>
    `/internship-activities/detail-job/${id}`,

  credit_transfer: '/credit-transfer',
  credit_transfer_add_job: '/credit-transfer/add-job',
  detail_credit_transfer: (id) => `/credit-transfer/detail-job/${id}`,

  exam_exemption: '/exam-exemption',
  exam_exemption_add_job: '/exam-exemption/add-job',
  detail_exam_exemption: (id) => `/exam-exemption/detail-job/${id}`,

  //Báo cáo tĩnh tổ chức học tập
  static_organization_report: '/static-organization-report',

  awards_situation: '/awards-situation',
  awards_situation_add_job: '/awards-situation/add-job',
  detail_awards_situation: (id) => `/awards-situation/detail-job/${id}`,

  disciplinary_actions: '/disciplinary-actions',
  disciplinary_actions_add_job: '/disciplinary-actions/add-job',
  detail_disciplinary_actions: (id) => `/disciplinary-actions/detail-job/${id}`,

  scholarship_recipients: '/scholarship-recipients',
  scholarship_recipients_add_job: '/scholarship-recipients/add-job',
  detail_scholarship_recipients: (id) =>
    `/scholarship-recipients/detail-job/${id}`,

  support_assistance: '/support-assistance',
  support_assistance_add_job: '/support-assistance/add-job',
  detail_support_assistance: (id) => `/support-assistance/detail-job/${id}`,

  fee_waivers: '/fee-waivers',
  fee_waivers_add_job: '/fee-waivers/add-job',
  detail_fee_waivers: (id) => `/fee-waivers/detail-job/${id}`,

  grade_deficiency: '/grade-deficiency',
  grade_deficiency_add_job: '/grade-deficiency/add-job',
  detail_grade_deficiency: (id) => `/grade-deficiency/detail-job/${id}`,

  student_quality: '/student-quality',
  student_quality_add_job: '/student-quality/add-job',
  detail_student_quality: (id) => `/student-quality/detail-job/${id}`,

  academic_ranking: '/academic-ranking',
  academic_ranking_add_job: '/academic-ranking/add-job',
  detail_academic_ranking: (id) => `/academic-ranking/detail-job/${id}`,

  performance_ranking: '/performance-ranking',
  performance_ranking_add_job: '/performance-ranking/add-job',
  detail_performance_ranking: (id) => `/performance-ranking/detail-job/${id}`,

  honor_titles: '/honor-titles',
  honor_titles_add_job: '/honor-titles/add-job',
  detail_honor_titles: (id) => `/honor-titles/detail-job/${id}`,

  //Báo cáo tĩnh khảo thí
  static_test_report: '/static-test-report',

  mean_deviation: '/mean-deviation',
  mean_deviation_add_job: '/mean-deviation/add-job',
  detail_mean_deviation: (id) => `/mean-deviation/detail-job/${id}`,

  grade_distribution: '/grade-distribution',
  grade_distribution_add_job: '/grade-distribution/add-job',
  detail_grade_distribution: (id) => `/grade-distribution/detail-job/${id}`,

  study_progress: '/study-progress',
  study_progress_add_job: '/study-progress/add-job',
  detail_study_progress: (id) => `/study-progress/detail-job/${id}`,

  makeup_exams: '/makeup-exams',
  makeup_exams_add_job: '/makeup-exams/add-job',
  detail_makeup_exams: (id) => `/makeup-exams/detail-job/${id}`,

  course_evaluation: '/course-evaluation',
  course_evaluation_add_job: '/course-evaluation/add-job',
  detail_course_evaluation: (id) => `/course-evaluation/detail-job/${id}`,

  exam_recheck: '/exam-recheck',
  exam_recheck_add_job: '/exam-recheck/add-job',
  detail_exam_recheck: (id) => `/exam-recheck/detail-job/${id}`,

  exam_complaints: '/exam-complaints',
  exam_complaints_add_job: '/exam-complaints/add-job',
  detail_exam_complaints: (id) => `/exam-complaints/detail-job/${id}`,

  //Báo cáo tĩnh tốt nghiệp và văn bằng
  static_graduation_report: '/static-graduation-report',

  graduation_numbers: '/graduation-numbers',
  graduation_numbers_add_job: '/graduation-numbers/add-job',
  detail_graduation_numbers: (id) => `/graduation-numbers/detail-job/${id}`,

  graduation_status: '/graduation-status',
  graduation_status_add_job: '/graduation-status/add-job',
  detail_graduation_status: (id) => `/graduation-status/detail-job/${id}`,

  credential_issuance: '/credential-issuance',
  credential_issuance_add_job: '/credential-issuance/add-job',
  detail_credential_issuance: (id) => `/credential-issuance/detail-job/${id}`,

  //Báo cáo tĩnh tình hình nghiên cứu khoa học
  static_research_report: '/static-research-report',

  research_topics: '/research-topics',
  research_topics_add_job: '/research-topics/add-job',
  detail_research_topics: (id) => `/research-topics/detail-job/${id}`,

  staff_numbers: '/staff-numbers',
  staff_numbers_add_job: '/staff-numbers/add-job',
  detail_staff_numbers: (id) => `/staff-numbers/detail-job/${id}`,

  book_count: '/book-count',
  book_count_add_job: '/book-count/add-job',
  detail_book_count: (id) => `/book-count/detail-job/${id}`,

  author_staff: '/author-staff',
  author_staff_add_job: '/author-staff/add-job',
  detail_author_staff: (id) => `/author-staff/detail-job/${id}`,

  staff_articles: '/staff-articles',
  staff_articles_add_job: '/staff-articles/add-job',
  detail_staff_articles: (id) => `/staff-articles/detail-job/${id}`,

  journal_articles: '/journal-articles',
  journal_articles_add_job: '/journal-articles/add-job',
  detail_journal_articles: (id) => `/journal-articles/detail-job/${id}`,

  conference_reports: '/conference-reports',
  conference_reports_add_job: '/conference-reports/add_job',
  detail_conference_reports: (id) => `/conference-reports/detail-job/${id}`,

  patents_count: '/patents-count',
  patents_count_add_job: '/patents-count/add-job',
  detail_patents_count: (id) => `/patents-count/detail-job/${id}`,

  student_researcher: '/student-researcher',
  student_researcher_add_job: '/student-researcher/add-job',
  detail_student_researcher: (id) => `/student-researcher/detail-job/${id}`,

  research_achievements: '/research-achievements',
  research_achievements_add_job: '/research-achievements/add-job',
  detail_research_achievements: (id) =>
    `/research-achievements/detail-job/${id}`,

  project_outcomes: '/project-outcomes',
  project_outcomes_add_job: '/project-outcomes/add-job',
  detail_project_outcomes: (id) => `/project-outcomes/detail-job/${id}`,

  contract_list: '/contract-list',
  contract_list_add_job: '/contract-list/add-job',
  detail_contract_list: (id) => `/contract-list/detail-job/${id}`,

  publication_results: '/publication-results',
  publication_results_add_job: '/publication-results/add-job',
  detail_publication_results: (id) => `/publication-results/detail-job/${id}`,

  science_staff: '/science-staff',
  science_staff_add_job: '/science-staff/add-job',
  detail_science_staff: (id) => `/science-staff/detail-job/${id}`,

  science_funding: '/science-funding',
  science_funding_add_job: '/science-funding/add-job',
  detail_science_funding: (id) => `/science-funding/detail-job/${id}`,

  tech_development: '/tech-development',
  tech_development_add_job: '/tech-development/add-job',
  detail_tech_development: (id) => `/tech-development/detail-job/${id}`,

  international_cooperation: '/international-cooperation',
  international_cooperation_add_job: '/international-cooperation/add-job',
  detail_international_cooperation: (id) =>
    `/international-cooperation/detail-job/${id}`,

  research_revenue: '/research-revenue',
  research_revenue_add_job: '/research-revenue/add-job',
  detail_research_revenue: (id) => `/research-revenue/detail-job/${id}`,

  perform_work: '/perform-work',
  perform_work_add_job: '/perform-work/add-job',
  detail_perform_work: (id) => `/perform-work/detail-job/${id}`,

  //Quản lý mẫu báo cáo
  report_template: '/report-template',
  export_history: '/export-history',

  //Thiết lập tổng hợp KPIs
  kpis_academy_metrics: '/kpis-academy-metrics',
  kpis_training_status: '/kpis-training-status',
  kpis_student_performance: '/kpis-student-performance',
  kpis_faculty_quality: '/kpis-faculty-quality',
  kpis_research_activities: '/kpis-research-activities',
  kpis_learning_progress: '/kpis-learning-progress',
  kpis_academic_results: '/kpis-academic-results',

  // thiết lập tổng hợp dịch vụ api
  evaluate_training_quality: '/evaluate-training-quality',
  training_costs: '/training-costs',
  lecturer_data: '/lecturer-data',
  student_data: '/student-data',

  build_api_data_source: '/build-api-data-source',
};

export default routes;
