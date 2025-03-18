import React from 'react';
import config from 'src/config/index';
import { ROUTER_NAME } from 'src/pages/routeConfig';
import { KEY_STATUS_CREATE_JUDICIAL_RECORD } from 'src/pages/judicialRecords/createRecordInformation/utils';
import FormSettingVerdict from 'src/pages/formSetting/FormSettingVerdict';
import FormSettingPolice from 'src/pages/formSetting/FormSettingPolice';
import FormSettingCourt from 'src/pages/formSetting/FormSettingCourt';
import FormSettingProcuracy from 'src/pages/formSetting/FormSettingProcuracy';
import FormSettingExecutionJudgment from 'src/pages/formSetting/FormSettingExecutionJudgment';
import FormSettingDecisionJudiciary from 'src/pages/formSetting/FormSettingDecisionJudiciary';
import FormSettingPage from 'src/pages/formSetting';
import { HelpCenterPage } from 'src/pages/help';
import { UsageGuideViewPage } from 'src/pages/usageGuide/view';
import ViewSyncStatus from 'src/pages/judicialRecords/ViewSyncStatus';
import StreamMSSQL from 'src/pages/streamMSSQL';
import StreamPostgreSQL from 'src/pages/streamPostgreSQL';
import StreamMySQL from 'src/pages/streamMySQL';
import StreamOracle from 'src/pages/streamOracle';
import SourceMSSQL from 'src/pages/sourceMSSQL';
import SourcePostgreSQL from 'src/pages/sourcePostgreSQL';
import SourceMySQL from 'src/pages/sourceMySQL';
import SourceOracle from 'src/pages/sourceOracle';
import AddDataSourceAirflow from '../IframeAirflow/AddDataSourceAirflow';
import ChartSample1 from 'src/pages/Dashboard/ChartSample1';
import ChartSample2 from 'src/pages/Dashboard/ChartSample2';
import ChartSample3 from 'src/pages/Dashboard/ChartSample3';
import ChartSample4 from 'src/pages/Dashboard/ChartSample4';
import ChartSample5 from 'src/pages/Dashboard/ChartSample5';
import ChartSample6 from 'src/pages/Dashboard/ChartSample6';
import ChartSample7 from 'src/pages/Dashboard/ChartSample7';
import ChartSample8 from 'src/pages/Dashboard/ChartSample8';
import ChartSample9 from 'src/pages/Dashboard/ChartSample9';
import ChartSample10 from 'src/pages/Dashboard/ChartSample10';
// import Workspace from 'src/pages/workspace';
import DetailConnectionList from 'src/pages/GeneralIntegrate/DetailConnectionList';
// import WorkspacePage from 'src/pages/workspaceUsecase';
import SearchDestinationByCategory from 'src/pages/SchoolWarehouse/SearchDestination/SearchDestinationByCategory';
import {
  CATEGORY_ADDITIAL_DATA,
  SCHOOLS_WAREHOUSE_TYPE,
} from 'src/shared/constants/DataFixed';
import DetailFormula from 'src/pages/SchoolWarehouse/FormulaManagement/DetailFormula';
import ResearchParticipation from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTrainingReport/ResearchParticipation';
import InternshipActivities from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTrainingReport/InternshipActivities';
import CreditTransfer from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTrainingReport/CreditTransfer';
import ExamExemption from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTrainingReport/ExamExemption';
import AwardsSituation from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/AwardsSituation';
import DisciplinaryActions from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/DisciplinaryActions';
import ScholarshipRecipients from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/ScholarshipRecipients';
import SupportAssistance from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/SupportAssistance';
import FeeWaivers from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/FeeWaivers';
import StudentQuality from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/StudentQuality';
import GradeDeficiency from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/GradeDeficiency';
import AcademicRanking from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/AcademicRanking';
import PerformanceRanking from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/PerformanceRanking';
import HonorTitles from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticOrganizationReport/HonorTitles';
import MeanDeviation from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTestReport/MeanDeviation';
import GradeDistribution from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTestReport/GradeDistribution';
import StudyProgress from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTestReport/StudyProgress';
import MakeupExams from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTestReport/MakeupExams';
import CourseEvaluation from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTestReport/CourseEvaluation';
import ExamRecheck from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTestReport/ExamRecheck';
import ExamComplaints from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticTestReport/ExamComplaints';
import GraduationNumbers from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticGraduationReport/GraduationNumbers';
import GraduationStatus from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticGraduationReport/GraduationStatus';
import CredentialIssuance from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticGraduationReport/CredentialIssuance';
import ResearchTopics from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/ResearchTopics';
import StaffNumbers from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/StaffNumbers';
import BookCount from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/BookCount';
import AuthorStaff from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/AuthorStaff';
import StaffArticles from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/StaffArticles';
import JournalArticles from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/JournalArticles';
import ConferenceReports from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/ConferenceReports';
import PatentsCount from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/PatentsCount';
import StudentResearchers from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/StudentResearchers';
import ResearchAchievements from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/ResearchAchievements';
import ProjectOutcomes from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/ProjectOutcomes';
import ContractList from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/ContractList';
import PublicationResults from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/PublicationResults';
import ScienceStaff from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/ScienceStaff';
import ScienceFunding from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/ScienceFunding';
import TechDevelopment from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/TechDevelopment';
import InternationalCooperation from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/InternationalCooperation';
import SummaryDynamicReport from 'src/pages/SchoolWarehouse/DataMark/SummaryDynamicReport';
import SummaryKPI from 'src/pages/SchoolWarehouse/DataMark/SummaryKPI';
import SummaryApiService from 'src/pages/SchoolWarehouse/DataMark/SummaryApiService';
import ReportTemplate from 'src/pages/SchoolWarehouse/DataMiningApplication/ReportTemplate';
import ExportHistory from 'src/pages/SchoolWarehouse/DataMiningApplication/ExportHistory';
import ListApiDataSource from 'src/pages/SchoolWarehouse/BuildApiDataSource/ListApiDataSource';
import EvaluateTrainingQuality from 'src/pages/SchoolWarehouse/DataAggregation/EvaluateTrainingQuality';
import TrainingCosts from 'src/pages/SchoolWarehouse/DataAggregation/TrainingCosts';
import LecturerData from 'src/pages/SchoolWarehouse/DataAggregation/LecturerData';
import StudentData from 'src/pages/SchoolWarehouse/DataAggregation/StudentData';
import KpiAcademyMetrics from 'src/pages/SchoolWarehouse/DataMark/KPIs/KpiAcademyMetrics';
import KpiTrainingStatus from 'src/pages/SchoolWarehouse/DataMark/KPIs/KpiTrainingStatus';
import KpiStudentPerformance from 'src/pages/SchoolWarehouse/DataMark/KPIs/KpiStudentPerformance';
import KpiFacultyQuality from 'src/pages/SchoolWarehouse/DataMark/KPIs/KpiFacultyQuality';
import KpiResearchActivities from 'src/pages/SchoolWarehouse/DataMark/KPIs/KpiResearchActivities';
import KpiLearningProgress from 'src/pages/SchoolWarehouse/DataMark/KPIs/KpiLearningProgress';
import KpiAcademicResults from 'src/pages/SchoolWarehouse/DataMark/KPIs/KpiAcademicResults';
import ResearchRevenue from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/ResearchRevenue';
import PerformWork from 'src/pages/SchoolWarehouse/DataMark/SummaryStaticReport/StaticResearchReport/PerformWork';
import WorkspaceDashboard from 'src/pages/workspaceDashboard';
import DynamicQualityAssurance from '../SchoolWarehouse/DataMark/DynamicReport/DynamicQualityAssurance';
import DynamicTrainingOrganization from '../SchoolWarehouse/DataMark/DynamicReport/DynamicTrainingOrganization';
import DynamicAcademyOperations from '../SchoolWarehouse/DataMark/DynamicReport/DynamicAcademyOperations';
import DynamicExaminationAssessment from '../SchoolWarehouse/DataMark/DynamicReport/DynamicExaminationAssessment';
import DynamicGraduationCertification from '../SchoolWarehouse/DataMark/DynamicReport/DynamicGraduationCertification';
import DynamicStudentProgress from '../SchoolWarehouse/DataMark/DynamicReport/DynamicStudentProgress';
import DynamicFacultySituation from '../SchoolWarehouse/DataMark/DynamicReport/DynamicFacultySituation';
import DynamicAcademicFinance from '../SchoolWarehouse/DataMark/DynamicReport/DynamicAcademicFinance';
import DynamicScientificResearch from '../SchoolWarehouse/DataMark/DynamicReport/DynamicScientificResearch';
// import FormInformationAcademy from '../ManageAddData/FormCreate/FormInformationAcademy';

const AdminUser = React.lazy(() => import('../Admin/AdminUser'));
const AdminRole = React.lazy(() => import('../Admin/AdminRole'));
const WrapperFormAddingData = React.lazy(() =>
  import('../ManageAddData/FormCreate'),
);
const AdminPermissions = React.lazy(() => import('../Admin/AdminPermissions'));

const OrganizationPage = React.lazy(() => import('../organization'));
const DetailOrganization = React.lazy(() =>
  import('../organization/DetailOrganization'),
);

const DocumentTypePage = React.lazy(() => import('../documentType'));
const RawDocumentPage = React.lazy(() => import('../rawDocument'));
const EditRawDocumentPage = React.lazy(() =>
  import('../rawDocument/EditRawDocument'),
);
const DetailRawDocumentPage = React.lazy(() => import('../rawDocument/detail'));
const PoliceRecordPage = React.lazy(() => import('../records/policeRecords'));
const CourtRecordPage = React.lazy(() => import('../records/courtRecords'));
const JudgmentExecutionRecordPage = React.lazy(() =>
  import('../records/judgmentExecutionRecords'),
);
const JusticeDepartmentRecordPage = React.lazy(() =>
  import('../records/justiceDepartmentRecords'),
);
const ControlInstitutionRecordPage = React.lazy(() =>
  import('../records/controlInstitutionRecords'),
);

const SusetOriganizationPage = React.lazy(() =>
  import('../organization/subsetOriganization'),
);

const CreateJudicialRecord = React.lazy(() =>
  import('../judicialRecords/createRecordInformation'),
);
const JudicialRecordAdd = React.lazy(() =>
  import('../judicialRecords/createRecordInformation/add'),
);
const JudicialRecordEdit = React.lazy(() =>
  import('../judicialRecords/createRecordInformation/edit'),
);
const DetailVerifiedCreateRecordPage = React.lazy(() =>
  import('../judicialRecords/createRecordInformation/verified'),
);

const DetailVerifiedLLTPPage = React.lazy(() =>
  import('../judicialRecords/createRecordInformation/VerifiedLLTPInfo'),
);
const DetailPendingCreateRecordPage = React.lazy(() =>
  import('../judicialRecords/createRecordInformation/pending'),
);

const JudicialRecordVerifyPage = React.lazy(() =>
  import('../judicialRecords/verify'),
);
const DetailVerifyJudicialPage = React.lazy(() =>
  import('../judicialRecords/verify/detail'),
);

const PushConnectApiPage = React.lazy(() =>
  import('../digitizedData/pushConnectApi'),
);
const DetailPushConnectApiPage = React.lazy(() =>
  import('../digitizedData/pushConnectApi/detail'),
);
const ReceiveConnectApiPage = React.lazy(() =>
  import('../digitizedData/receiveConnectApi'),
);
const DetailReceiveConnectApiPage = React.lazy(() =>
  import('../digitizedData/receiveConnectApi/detail'),
);

const ExtractedDigitizedDocumentPage = React.lazy(() =>
  import('../digitizedData/extractedDigitizedDocument'),
);

const UserActionLogPage = React.lazy(() =>
  import('../systemLog/userActionLog'),
);
const AccessLogPage = React.lazy(() => import('../systemLog/accessLog'));
const SettingLogPage = React.lazy(() => import('../systemLog/settings'));
const LoginStatusPage = React.lazy(() => import('../systemLog/loginStatus'));

const NotificationPage = React.lazy(() => import('../notifications'));

const ShareApiListPage = React.lazy(() => import('../shareApiConfig'));
const ShareApiDistrictPage = React.lazy(() =>
  import('../shareApiConfig/district'),
);
const ShareApiDepartmentPage = React.lazy(() =>
  import('../shareApiConfig/department'),
);
const ShareApiProvincePage = React.lazy(() =>
  import('../shareApiConfig/province'),
);
const ShareApiLgspPage = React.lazy(() => import('../shareApiConfig/lgsp'));
const ShareApiCityPage = React.lazy(() => import('../shareApiConfig/city'));
const ShareProvincialInformationPortalPage = React.lazy(() =>
  import('../shareApiConfig/provinceInfoPortal'),
);
const ShareApiProcuracyPage = React.lazy(() =>
  import('../shareApiConfig/procuracy'),
);
const SearchEngine = React.lazy(() => import('../SearchEngine/SearchEngine'));

const ShareApiCourtPage = React.lazy(() => import('../shareApiConfig/court'));
const ShareApiThaPage = React.lazy(() => import('../shareApiConfig/tha'));
const ShareApiPolicePage = React.lazy(() => import('../shareApiConfig/police'));

// const SearchJudicialRecordsPage = React.lazy(() =>
//   import('../backendDataWarehouse/judicialRecords'),
// );
const DetailJudicialRecordBDW = React.lazy(() =>
  import('../backendDataWarehouse/judicialRecords/detail'),
);
const SearchJudicialRecordsByName = React.lazy(() =>
  import('../backendDataWarehouse/judicialRecords/byName'),
);
const SearchJudicialRecordsByIdCard = React.lazy(() =>
  import('../backendDataWarehouse/judicialRecords/byIdCard'),
);

const ListQAPage = React.lazy(() => import('../help/qa'));

const UsageGuideManagePage = React.lazy(() => import('../usageGuide/manage'));
const StreamDataPage = React.lazy(() => import('../streamData'));
const DetailInfoDataPage = React.lazy(() =>
  import('../streamConnection/infoData/detailInfoData'),
);
const DetailHistoryPage = React.lazy(() =>
  import('../streamConnection/infoData/detailInfoData/detailHistory'),
);
const SourceDataPage = React.lazy(() => import('../sourceData'));

const StreamApiPage = React.lazy(() => import('../streamAPI'));
const SourceApiPage = React.lazy(() => import('../sourceAPI'));

const ServiceParamsConfigPage = React.lazy(() =>
  import('../serviceParamsConfig'),
);

const ListWaitingDigital = React.lazy(() =>
  import('../ConfigParameterDissection/ListWaitingDigital'),
);
const ListDigitizedDocumentsWaitingConfirm = React.lazy(() =>
  import('../ConfigParameterDissection/ListDigitizedDocumentsWaitingConfirm'),
);

const SystemMonitoringReport = React.lazy(() =>
  import('../SystemMonitoringReport'),
);

const DataSourceName = React.lazy(() =>
  import('../IframeDataSource/DataSourceName'),
);

const TargetDataSource = React.lazy(() =>
  import('../IframeDataSource/TargetDataSource'),
);

const DataSourceConnect = React.lazy(() =>
  import('../IframeDataSource/DataSourceConnect'),
);

const IframeAirflow = React.lazy(() => import('../IframeAirflow'));

const DatasetsDremio = React.lazy(() =>
  import('../IframeDataLake/DatasetsDremio'),
);

const SQLRunnerDremio = React.lazy(() =>
  import('../IframeDataLake/SQLRunnerDremio'),
);

const JobsDremio = React.lazy(() => import('../IframeDataLake/JobsDremio'));

const IocDisease = React.lazy(() =>
  import('../IframeReportDataMining/IocDisease'),
);

const IocMedical = React.lazy(() =>
  import('../IframeReportDataMining/IocMedical'),
);

const IframeMito = React.lazy(() => import('../IframeMito'));

// search engine
const AddIndexSearchEngine = React.lazy(() =>
  import('../SearchEngine/Components/AddIndexSearchEngine'),
);
const ConfigIndex = React.lazy(() => import('../SearchEngine/ConfigIndex'));
const DataSync = React.lazy(() => import('../SearchEngine/DataSync'));
const TestIndex = React.lazy(() => import('../SearchEngine/TestIndex'));

const MedicalIndustry = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/MedicalIndustry'),
);
const Education = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/Education'),
);
const JudicialBranch = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/JudicialBranch'),
);
const SocialInsurance = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/SocialInsurance'),
);
const Transportation = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/Transportation'),
);
const InvalidsSocialAffairs = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/InvalidsSocialAffairs'),
);
const InformationCommunication = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/InformationCommunication'),
);
const CultureSportsTourism = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/CultureSportsTourism'),
);
const InvestmentPlan = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/InvestmentPlan'),
);
const FinanceTreasury = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/FinanceTreasury'),
);
const Construction = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/Construction'),
);
const InternalAffairs = React.lazy(() =>
  import('../SearchEngine/DepartmentsSearchEngine/InternalAffairs'),
);

const IntegrateDatabasePage = React.lazy(() =>
  import('../IntegrateDatabasePage'),
);

const IntegrateCloudDatabasePage = React.lazy(() =>
  import('../IntegrateCloudDatabasePage'),
);

const FTPConnectionPage = React.lazy(() => import('../FTPConnectionPage'));
const ManageDataVersionMssql = React.lazy(() =>
  import('../ManageDataVersions/ManageDataVersionMssql'),
);

const ManageDataVersionPostgreSQL = React.lazy(() =>
  import('../ManageDataVersions/ManageDataVersionPostgreSQL'),
);
const ManageDataVersionMySQL = React.lazy(() =>
  import('../ManageDataVersions/ManageDataVersionMySQL'),
);
const ManageDataVersionOracle = React.lazy(() =>
  import('../ManageDataVersions/ManageDataVersionOracle'),
);
const ManageDataVersionFile = React.lazy(() =>
  import('../ManageDataVersions/ManageDataVersionFile'),
);
const ManageDataVersionAPI = React.lazy(() =>
  import('../ManageDataVersions/ManageDataVersionAPI'),
);

const IntegrateURLPage = React.lazy(() => import('../IntegrateURLPage'));

const StorageServicesPage = React.lazy(() => import('../StorageServicesPage'));

const ManagementJobs = React.lazy(() =>
  import('../DataWareHouse/ManagementJobs'),
);
const AutomaticDataMSSQL = React.lazy(() =>
  import('../AutomaticDataEnrichment/AutomaticDataMSSQL'),
);
const AutomaticDataPostgreSQL = React.lazy(() =>
  import('../AutomaticDataEnrichment/AutomaticDataPostgreSQL'),
);
const AutomaticDataMySQL = React.lazy(() =>
  import('../AutomaticDataEnrichment/AutomaticDataMySQL'),
);
const AutomaticDataOracle = React.lazy(() =>
  import('../AutomaticDataEnrichment/AutomaticDataOracle'),
);
const AutomaticDataFile = React.lazy(() =>
  import('../AutomaticDataEnrichment/AutomaticDataFile'),
);
const AutomaticDataApi = React.lazy(() =>
  import('../AutomaticDataEnrichment/AutomaticDataApi'),
);

const IntegrateFromExistingFiles = React.lazy(() =>
  import('../IntegrateFromExistingFiles'),
);

const ConfigPermissionOrganization = React.lazy(() =>
  import('../DataSharing/ConfigPermissionOrganization'),
);

const RetrieveDataApi = React.lazy(() =>
  import('../DataSharing/RetrieveDataApi'),
);

const ListCardManagement = React.lazy(() =>
  import('../DataGovernance/ListCardManagement'),
);
const ListCardClassify = React.lazy(() =>
  import('../DataGovernance/ListCardClassify'),
);

const SourceOrganizationTraining = React.lazy(() =>
  import('../SchoolWarehouse/ListSource/SourceOrganizationTraining'),
);
const ProgressOrganizationTraining = React.lazy(() =>
  import('../SchoolWarehouse/ListProgress/ProgressOrganizationTraining'),
);
const CleaningConfig = React.lazy(() =>
  import('../streamConnection/CleaningConfig'),
);
const SourceELearning = React.lazy(() =>
  import('../SchoolWarehouse/ListSource/SourceELearning'),
);
const ProgressELearning = React.lazy(() =>
  import('../SchoolWarehouse/ListProgress/ProgressELearning'),
);
const SourceDMDC = React.lazy(() =>
  import('../SchoolWarehouse/ListSource/SourceDMDC'),
);
const ProgressDMDC = React.lazy(() =>
  import('../SchoolWarehouse/ListProgress/ProgressDMDC'),
);
const SourceManagementNCKH = React.lazy(() =>
  import('../SchoolWarehouse/ListSource/SourceManagementNCKH'),
);
const ProgressManagementNCKH = React.lazy(() =>
  import('../SchoolWarehouse/ListProgress/ProgressManagementNCKH'),
);
const SourceSupportTraining = React.lazy(() =>
  import('../SchoolWarehouse/ListSource/SourceSupportTraining'),
);
const ProgressSupportTraining = React.lazy(() =>
  import('../SchoolWarehouse/ListProgress/ProgressSupportTraining'),
);
const SourceExamination = React.lazy(() =>
  import('../SchoolWarehouse/ListSource/SourceExamination'),
);
const ProgressExamination = React.lazy(() =>
  import('../SchoolWarehouse/ListProgress/ProgressExamination'),
);

const SourceExecutiveDocuments = React.lazy(() =>
  import('../SchoolWarehouse/ListSource/SourceExecutiveDocuments'),
);
const ProgressExecutiveDocuments = React.lazy(() =>
  import('../SchoolWarehouse/ListProgress/ProgressExecutiveDocuments'),
);
const SourceOfficeManager = React.lazy(() =>
  import('../SchoolWarehouse/ListSource/SourceOfficeManager'),
);
const ProgressOfficeManager = React.lazy(() =>
  import('../SchoolWarehouse/ListProgress/ProgressOfficeManager'),
);
const IntegrateOrganizationTraining = React.lazy(() =>
  import('../SchoolWarehouse/Destination/IntegrateOrganizationTraining'),
);
const IntegrateELearning = React.lazy(() =>
  import('../SchoolWarehouse/Destination/IntegrateELearning'),
);
const IntegrateDMDC = React.lazy(() =>
  import('../SchoolWarehouse/Destination/IntegrateDMDC'),
);
const IntegrateManagementNCKH = React.lazy(() =>
  import('../SchoolWarehouse/Destination/IntegrateManagementNCKH'),
);
const IntegrateSupportTraining = React.lazy(() =>
  import('../SchoolWarehouse/Destination/IntegrateSupportTraining'),
);
const IntegrateExamination = React.lazy(() =>
  import('../SchoolWarehouse/Destination/IntegrateExamination'),
);
const IntegrateExecutiveDocuments = React.lazy(() =>
  import('../SchoolWarehouse/Destination/IntegrateExecutiveDocuments'),
);
const IntegrateOfficeManager = React.lazy(() =>
  import('../SchoolWarehouse/Destination/IntegrateOfficeManager'),
);

const AggregateOrganization = React.lazy(() =>
  import('../SchoolWarehouse/NuclearRegion/Organization/AggregateOrganization'),
);

const DetailsJob = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism/DetailsJob'
  ),
);
const LookUpCollectedResultsOrganization = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/Organization/LookUpCollectedResultsOrganization'
  ),
);

const AggregateELearning = React.lazy(() =>
  import('../SchoolWarehouse/NuclearRegion/E_learning/AggregateELearning'),
);
const LookUpCollectedResultsELearning = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/E_learning/LookUpCollectedResultsELearning'
  ),
);
const AggregateDMDC = React.lazy(() =>
  import('../SchoolWarehouse/NuclearRegion/DMDC/AggregateDMDC'),
);
const LookUpCollectedResultsDMDC = React.lazy(() =>
  import('../SchoolWarehouse/NuclearRegion/DMDC/LookUpCollectedResultsDMDC'),
);
const AggregateManagementNCKH = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/ManagementNCKH/AggregateManagementNCKH'
  ),
);
const LookUpCollectedResultsManagementNCKH = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/ManagementNCKH/LookUpCollectedResultsManagementNCKH'
  ),
);
const AggregateManagementSupportTraining = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/SupportTraining/AggregateSupportTraining'
  ),
);
const LookUpCollectedResultsSupportTraining = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/SupportTraining/LookUpCollectedResultsSupportTraining'
  ),
);
const AggregateExamination = React.lazy(() =>
  import('../SchoolWarehouse/NuclearRegion/Examination/AggregateExamination'),
);
const LookUpCollectedResultsExamination = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/Examination/LookUpCollectedResultsExamination'
  ),
);
const AggregateExecutiveDocuments = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/ExecutiveDocuments/AggregateExecutiveDocuments'
  ),
);
const LookUpCollectedResultsExecutiveDocuments = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/ExecutiveDocuments/LookUpCollectedResultsExecutiveDocuments'
  ),
);
const AggregateOfficeManager = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/OfficeManager/AggregateOfficeManager'
  ),
);
const LookUpCollectedResultsOfficeManager = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/OfficeManager/LookUpCollectedResultsOfficeManager'
  ),
);

const ListScientist = React.lazy(() => import('../DataService/ListScientist'));
const ListScientificTopic = React.lazy(() =>
  import('../DataService/ListScientificTopic'),
);

const ListScientificAward = React.lazy(() =>
  import('../DataService/ListScientificAward'),
);

const ListPublication = React.lazy(() =>
  import('../DataService/ListPublication'),
);

const FormulaManagement = React.lazy(() =>
  import('../SchoolWarehouse/FormulaManagement/FormulaManagement'),
);

const AddJob = React.lazy(() =>
  import(
    '../SchoolWarehouse/NuclearRegion/Components/DataAggregationMechanism/AddJob'
  ),
);

const DataMarkTraining = React.lazy(() =>
  import('../SchoolWarehouse/DataMark/DataMarkTraining'),
);
const CourseResearchStatus = React.lazy(() =>
  import('../SchoolWarehouse/DataMark/CourseResearchStatus'),
);

// Quan ly nhap bo sung du lieu

const InforCommon = React.lazy(() => import('../ManageAddData/InforCommon'));
const AchievesUnit = React.lazy(() => import('../ManageAddData/AchivesUnit'));
const ManageLeaders = React.lazy(() =>
  import('../ManageAddData/ManageLeaders'),
);
const ManageTeachers = React.lazy(() =>
  import('../ManageAddData/ManageTeachers'),
);

//Danh sách Chỉ tiêu
const CriterionList = React.lazy(() =>
  import('../SchoolWarehouse/CriterionList/CriterionList'),
);

//Báo cáo tĩnh tình hình đào tạo
const EnrollmentStatistics = React.lazy(() =>
  import(
    '../SchoolWarehouse/DataMark/SummaryStaticReport/StaticTrainingReport/EnrollmentStatistics'
  ),
);

const InternationalStudents = React.lazy(() =>
  import(
    '../SchoolWarehouse/DataMark/SummaryStaticReport/StaticTrainingReport/InternationalStudents'
  ),
);

// name must be match with id in routerConfig.js
export const samplePagesConfigs = [
  {
    path: config.routes.workspace,
    // element: <WorkspacePage />,
    element: <WorkspaceDashboard />,
    name: ROUTER_NAME.USERS,
  },
  //User management
  {
    path: config.routes.userManage,
    element: <AdminUser />,
    name: ROUTER_NAME.USERS,
  },
  {
    path: config.routes.adminRole,
    element: <AdminRole />,
    name: ROUTER_NAME.ROLE,
  },
  {
    path: config.routes.adminPermission,
    element: <AdminPermissions />,
    name: ROUTER_NAME.PERMISSION,
  },
  {
    path: config.routes.organization,
    element: <OrganizationPage />,
    name: ROUTER_NAME.ORGANIZATION,
  },
  {
    path: config.routes.organizationDetail,
    element: <DetailOrganization />,
    name: ROUTER_NAME.ORGANIZATION,
  },
  {
    path: config.routes.department,
    element: <SusetOriganizationPage />,
    name: ROUTER_NAME.DEPARTMENT,
  },
  {
    path: `${config.routes.subsetOrganization}/:id`,
    element: <SusetOriganizationPage />,
    name: ROUTER_NAME.ORGANIZATION,
  },

  {
    path: config.routes.documentType,
    element: <DocumentTypePage />,
    name: ROUTER_NAME.DOCUMENT_TYPE,
  },
  {
    path: config.routes.formSetting,
    element: <FormSettingPage />,
    name: [ROUTER_NAME.FORM_SETTING_ALL, ROUTER_NAME.CONFIG_INTEGRATE],
  },
  {
    path: config.routes.formSettingVerdict,
    element: <FormSettingVerdict />,
    name: ROUTER_NAME.FORM_SETTING_VERDICT,
  },
  {
    path: config.routes.formSettingPolice,
    element: <FormSettingPolice />,
    name: ROUTER_NAME.FORM_SETTING_POLICE,
  },
  {
    path: config.routes.formSettingCourt,
    element: <FormSettingCourt />,
    name: ROUTER_NAME.FORM_SETTING_COURT,
  },
  {
    path: config.routes.formSettingProcuracy,
    element: <FormSettingProcuracy />,
    name: ROUTER_NAME.FORM_SETTING_PROCURACY,
  },
  {
    path: config.routes.formSettingExecutionJudgment,
    element: <FormSettingExecutionJudgment />,
    name: ROUTER_NAME.FORM_SETTING_EXECUTION_JUDGMENT,
  },
  {
    path: config.routes.formSettingDecisionJudiciary,
    element: <FormSettingDecisionJudiciary />,
    name: ROUTER_NAME.FORM_SETTING_DECISION_JUDICIARY,
  },

  {
    path: config.routes.listWaitingDigital,
    element: <ListWaitingDigital />,
    name: ROUTER_NAME.FORM_SETTING_DECISION_JUDICIARY,
  },
  {
    path: config.routes.listDocumentWaitingConfirm,
    element: <ListDigitizedDocumentsWaitingConfirm />,
    name: ROUTER_NAME.FORM_SETTING_DECISION_JUDICIARY,
  },
  {
    path: config.routes.serviceParamsConfig,
    element: <ServiceParamsConfigPage />,
    name: [ROUTER_NAME.FORM_SETTING_ALL, ROUTER_NAME.SERVICE_PARAMS_CONFIG],
  },

  {
    path: config.routes.rawDocument,
    element: <RawDocumentPage />,
    name: ROUTER_NAME.RAW_DOCUMENT,
  },
  {
    path: `${config.routes.rawDocument}/:id`,
    element: <EditRawDocumentPage />,
    name: [
      ROUTER_NAME.RAW_DOCUMENT,
      ROUTER_NAME.RAW_DOCUMENT_POLICE,
      ROUTER_NAME.RAW_DOCUMENT_COURT,
      ROUTER_NAME.RAW_DOCUMENT_JUSTICE_LGSP,
      ROUTER_NAME.RAW_DOCUMENT_JUDGMENT_EXECUTION,
      ROUTER_NAME.RAW_DOCUMENT_CONTROL_INSTITUTE,
      ROUTER_NAME.WAITING_DIGITIZE_DOCUMENT,
    ],
  },
  {
    path: config.routes.detailRawDocument(':id'),
    element: <DetailRawDocumentPage />,
    name: [
      ROUTER_NAME.RAW_DOCUMENT,
      ROUTER_NAME.RAW_DOCUMENT_POLICE,
      ROUTER_NAME.RAW_DOCUMENT_COURT,
      ROUTER_NAME.RAW_DOCUMENT_JUSTICE_LGSP,
      ROUTER_NAME.RAW_DOCUMENT_JUDGMENT_EXECUTION,
      ROUTER_NAME.RAW_DOCUMENT_CONTROL_INSTITUTE,
      ROUTER_NAME.WAITING_DIGITIZE_DOCUMENT,
    ],
  },
  {
    path: config.routes.policeRecord,
    element: <PoliceRecordPage />,
    name: ROUTER_NAME.RAW_DOCUMENT_POLICE,
  },
  {
    path: config.routes.courtRecord,
    element: <CourtRecordPage />,
    name: ROUTER_NAME.RAW_DOCUMENT_COURT,
  },
  {
    path: config.routes.justiceDepartmentRecord,
    element: <JusticeDepartmentRecordPage />,
    name: ROUTER_NAME.RAW_DOCUMENT_JUSTICE_LGSP,
  },
  {
    path: config.routes.judgmentExecutionRecord,
    element: <JudgmentExecutionRecordPage />,
    name: ROUTER_NAME.RAW_DOCUMENT_JUDGMENT_EXECUTION,
  },
  {
    path: config.routes.controlInstituteRecord,
    element: <ControlInstitutionRecordPage />,
    name: ROUTER_NAME.RAW_DOCUMENT_CONTROL_INSTITUTE,
  },
  {
    path: config.routes.judicialListRecord,
    element: <CreateJudicialRecord />,
    name: [
      ROUTER_NAME.JUDICIAL_CREATE_RECORDS,
      ROUTER_NAME.LIST_JUDICIAL_RECORD,
    ],
  },
  {
    path: config.routes.judicialCreateRecord,
    element: <CreateJudicialRecord />,
    name: [
      ROUTER_NAME.JUDICIAL_CREATE_RECORDS,
      ROUTER_NAME.LIST_JUDICIAL_RECORD,
    ],
  },
  // thong tin LTTP
  {
    path: config.routes.detailJudicialRecord(
      KEY_STATUS_CREATE_JUDICIAL_RECORD.VERIFIED,
      ':id',
    ),
    element: <DetailVerifiedLLTPPage />,
  },

  // xem trang thai dong bo LTTP
  {
    path: config.routes.judicialViewSyncStatus(':id'),
    element: <ViewSyncStatus />,
  },

  {
    path: config.routes.detailJudicialRecord(
      KEY_STATUS_CREATE_JUDICIAL_RECORD.MINISTRY,
      ':id',
    ),
    element: <DetailVerifiedCreateRecordPage />,
  },
  {
    path: config.routes.detailJudicialRecord(
      KEY_STATUS_CREATE_JUDICIAL_RECORD.WAITING,
      ':id',
    ),
    element: <DetailPendingCreateRecordPage />,
  },
  {
    path: config.routes.judicialCreateRecordAdd,
    element: <JudicialRecordAdd />,
    name: ROUTER_NAME.JUDICIAL_CREATE_RECORDS,
  },
  {
    path: config.routes.judicialRecordEdit(':id'),
    element: <JudicialRecordEdit />,
    name: ROUTER_NAME.JUDICIAL_CREATE_RECORDS,
  },
  {
    path: config.routes.judicialRecordVerify,
    element: <JudicialRecordVerifyPage />,
    name: ROUTER_NAME.JUDICIAL_VERIFY_RECORD,
  },
  {
    path: config.routes.judicialRecordVerifyDetail,
    element: <DetailVerifyJudicialPage />,
  },

  {
    path: config.routes.pushConnectApi,
    element: <PushConnectApiPage />,
    name: ROUTER_NAME.MANAGE_API_PUSH,
  },
  {
    path: config.routes.pushConnectApiDetail(':id'),
    element: <DetailPushConnectApiPage />,
  },
  {
    path: config.routes.receiveConnectApi,
    element: <ReceiveConnectApiPage />,
    name: ROUTER_NAME.RECEIVE_CONNECT_API,
  },
  {
    path: config.routes.receiveConnectApiDetail(':id'),
    element: <DetailReceiveConnectApiPage />,
  },

  {
    path: config.routes.extractedDigitizedDocument,
    element: <ExtractedDigitizedDocumentPage />,
    name: ROUTER_NAME.EXTRACTED_DIGITIZED_DOCUMENT,
  },

  {
    path: config.routes.userActionLog,
    element: <UserActionLogPage />,
    name: ROUTER_NAME.USER_ACTION_LOG,
  },
  {
    path: config.routes.accessLog,
    element: <AccessLogPage />,
    name: ROUTER_NAME.USER_ACCESS_LOG,
  },
  {
    path: config.routes.settingLog,
    element: <SettingLogPage />,
    name: ROUTER_NAME.SETTING_LOG,
  },
  {
    path: config.routes.loginStatus,
    element: <LoginStatusPage />,
    name: ROUTER_NAME.LOGIN_STATUS_LOG,
  },

  {
    path: config.routes.helpCenter,
    element: <HelpCenterPage />,
  },
  {
    path: config.routes.listQA,
    element: <ListQAPage />,
    name: ROUTER_NAME.HELP_QA,
  },

  {
    path: config.routes.usageGuideView,
    element: <UsageGuideViewPage />,
  },
  {
    path: config.routes.usageGuideManage,
    element: <UsageGuideManagePage />,
    name: ROUTER_NAME.USAGE_GUIDE_MANAGE,
  },

  {
    path: config.routes.notifications,
    element: <NotificationPage />,
  },

  {
    path: config.routes.shareApiConfig,
    element: <ShareApiListPage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_ALL,
  },
  {
    path: config.routes.shareApiDistrict,
    element: <ShareApiDistrictPage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_DISTRICT,
  },
  {
    path: config.routes.shareApiDepartment,
    element: <ShareApiDepartmentPage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_DEPARTMENT,
  },
  {
    path: config.routes.shareApiProvince,
    element: <ShareApiProvincePage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_PROVINCE,
  },
  {
    path: config.routes.shareApiLgsp,
    element: <ShareApiLgspPage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_LGSP,
  },
  {
    path: config.routes.shareApiCity,
    element: <ShareApiCityPage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_CITY,
  },
  {
    path: config.routes.shareApiProvinceInformation,
    element: <ShareProvincialInformationPortalPage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_PROVINCE_INFORMATION_PORTAL,
  },
  {
    path: config.routes.shareApiProcurement,
    element: <ShareApiProcuracyPage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_PROCUREMENT,
  },
  {
    path: config.routes.shareApiCourt,
    element: <ShareApiCourtPage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_COURT,
  },
  {
    path: config.routes.shareApiTha,
    element: <ShareApiThaPage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_THA,
  },
  {
    path: config.routes.shareApiPolice,
    element: <ShareApiPolicePage />,
    name: ROUTER_NAME.SHARE_API_CONFIG_POLICE,
  },

  {
    path: config.routes.listSourceMSSQL,
    element: <SourceMSSQL />,
    name: ROUTER_NAME.LIST_SOURCE_MSSQL,
  },
  //
  {
    path: config.routes.searchOrganization,
    element: (
      <SearchDestinationByCategory
        category={SCHOOLS_WAREHOUSE_TYPE.ORGANIZATION}
      />
    ),
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_ORGANIZATION,
  },
  {
    path: config.routes.searchELearning,
    element: (
      <SearchDestinationByCategory
        category={SCHOOLS_WAREHOUSE_TYPE.E_LEARNING}
      />
    ),
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_E_LEARNING,
  },
  {
    path: config.routes.searchDMDC,
    element: (
      <SearchDestinationByCategory category={SCHOOLS_WAREHOUSE_TYPE.DMDC} />
    ),
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_DMDC,
  },
  {
    path: config.routes.searchNCKH,
    element: (
      <SearchDestinationByCategory category={SCHOOLS_WAREHOUSE_TYPE.NCKH} />
    ),
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_NCKH,
  },
  {
    path: config.routes.searchSupport,
    element: (
      <SearchDestinationByCategory category={SCHOOLS_WAREHOUSE_TYPE.SUPPORT} />
    ),
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_SUPPORT_TRAINING,
  },
  {
    path: config.routes.searchExamination,
    element: (
      <SearchDestinationByCategory
        category={SCHOOLS_WAREHOUSE_TYPE.EXAMINATION}
      />
    ),
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_EXAMINATION,
  },
  {
    path: config.routes.searchDocument,
    element: (
      <SearchDestinationByCategory category={SCHOOLS_WAREHOUSE_TYPE.DOCUMENT} />
    ),
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_EXECUTIVE_DOCUMENT,
  },
  {
    path: config.routes.searchOffice,
    element: (
      <SearchDestinationByCategory category={SCHOOLS_WAREHOUSE_TYPE.OFFICE} />
    ),
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_OFFICE_MANAGER,
  },

  {
    path: config.routes.listConnectionMSSQL,
    element: <StreamMSSQL />,
    name: ROUTER_NAME.LIST_CONNECTION_MSSQL,
  },
  {
    path: config.routes.manageDataVersionsMSSQL,
    element: <ManageDataVersionMssql />,
    name: ROUTER_NAME.MANAGE_DATA_VERSION_MSSQL,
  },
  {
    path: config.routes.automaticDataEnrichmentMSSQL,
    element: <AutomaticDataMSSQL />,
    name: ROUTER_NAME.AUTOMATIC_DATA_ENRICHMENT_MSSQL,
  },

  {
    path: config.routes.listSourcePostgreSQL,
    element: <SourcePostgreSQL />,
    name: ROUTER_NAME.LIST_SOURCE_POSTGRESQL,
  },
  {
    path: config.routes.listConnectionPostgreSQL,
    element: <StreamPostgreSQL />,
    name: ROUTER_NAME.LIST_CONNECTION_POSTGRESQL,
  },
  {
    path: config.routes.listSourceDetails(':id'),
    element: <DetailConnectionList />,
    name: ROUTER_NAME.LIST_CONNECTION_POSTGRESQL,
  },
  {
    path: config.routes.manageDataVersionsPostgreSQL,
    element: <ManageDataVersionPostgreSQL />,
    name: ROUTER_NAME.MANAGE_DATA_POSTGRESQL,
  },
  {
    path: config.routes.automaticDataEnrichmentPostgreSQL,
    element: <AutomaticDataPostgreSQL />,
    name: ROUTER_NAME.AUTOMATIC_DATA_ENRICHMENT_POSTGRESQL,
  },

  {
    path: config.routes.listSourceMySQL,
    element: <SourceMySQL />,
    name: ROUTER_NAME.LIST_SOURCE_MYSQL,
  },
  {
    path: config.routes.listConnectionMySQL,
    element: <StreamMySQL />,
    name: ROUTER_NAME.LIST_CONNECTION_MYSQL,
  },
  {
    path: config.routes.manageDataVersionsMySQL,
    element: <ManageDataVersionMySQL />,
    name: ROUTER_NAME.MANAGE_DATA_MYSQL,
  },
  {
    path: config.routes.automaticDataEnrichmentMySQL,
    element: <AutomaticDataMySQL />,
    name: ROUTER_NAME.AUTOMATIC_DATA_ENRICHMENT_MYSQL,
  },

  {
    path: config.routes.listSourceOracle,
    element: <SourceOracle />,
    name: ROUTER_NAME.LIST_SOURCE_ORACLE,
  },
  {
    path: config.routes.listConnectionOracle,
    element: <StreamOracle />,
    name: ROUTER_NAME.LIST_CONNECTION_ORACLE,
  },
  {
    path: config.routes.manageDataVersionsOracle,
    element: <ManageDataVersionOracle />,
    name: ROUTER_NAME.MANAGE_DATA_ORACLE,
  },
  {
    path: config.routes.automaticDataEnrichmentOracle,
    element: <AutomaticDataOracle />,
    name: ROUTER_NAME.AUTOMATIC_DATA_ENRICHMENT_ORACLE,
  },

  {
    path: config.routes.listSourceFile,
    element: <SourceDataPage />,
    name: ROUTER_NAME.LIST_SOURCE_FILE,
  },
  {
    path: config.routes.listConnectionFile,
    element: <StreamDataPage />,
    name: ROUTER_NAME.LIST_CONNECTION_FILE,
  },
  {
    path: config.routes.manageDataVersionFile,
    element: <ManageDataVersionFile />,
    name: ROUTER_NAME.MANAGE_DATA_FILE,
  },
  {
    path: config.routes.automaticDataEnrichmentFile,
    element: <AutomaticDataFile />,
    name: ROUTER_NAME.AUTOMATIC_DATA_ENRICHMENT_FILE,
  },

  {
    path: config.routes.listSourceAPI,
    element: <SourceApiPage />,
    name: ROUTER_NAME.LIST_SOURCE_API,
  },
  {
    path: config.routes.listConnectionAPI,
    element: <StreamApiPage />,
    name: ROUTER_NAME.LIST_CONNECTION_API,
  },
  {
    path: config.routes.manageDataVersionApi,
    element: <ManageDataVersionAPI />,
    name: ROUTER_NAME.MANAGE_DATA_API,
  },
  {
    path: config.routes.automaticDataEnrichmentApi,
    element: <AutomaticDataApi />,
    name: ROUTER_NAME.AUTOMATIC_DATA_ENRICHMENT_API,
  },

  {
    path: config.routes.detailInfoData(':pageName', ':id'),
    element: <DetailInfoDataPage />,
  },
  {
    path: config.routes.detailHistoryData(':pageName', ':id'),
    element: <DetailHistoryPage />,
  },
  {
    path: config.routes.configClear(':pageName', ':id'),
    element: <CleaningConfig />,
  },
  {
    path: config.routes.configClearView,
    element: <CleaningConfig />,
  },
  {
    path: config.routes.searchJudicialRecordsByName,
    element: <SearchJudicialRecordsByName />,
    name: [ROUTER_NAME.JUDICIAL_RECORDS, ROUTER_NAME.CARD_ISSURE_BY_USER],
  },
  {
    path: config.routes.searchJudicialRecordsByIdCard,
    element: <SearchJudicialRecordsByIdCard />,
    name: [ROUTER_NAME.JUDICIAL_RECORDS],
  },
  {
    path: config.routes.detailJudicialRecordBDW(':id'),
    element: <DetailJudicialRecordBDW />,
  },
  // bao cao va khai thac du lieu
  {
    path: config.routes.systemMonitoringReport,
    element: <SystemMonitoringReport />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.ioc_pandemic,
    element: <IocDisease />,
    name: ROUTER_NAME.ORGANIZATION,
  },
  {
    path: config.routes.ioc_medical,
    element: <IocMedical />,
    name: ROUTER_NAME.RECEIVE_CONNECT_API,
  },

  {
    path: '/dashboard-1',
    element: <ChartSample1 />,
    name: 'sample-1',
  },
  {
    path: '/dashboard-2',
    element: <ChartSample2 />,
    name: 'sample-2',
  },
  {
    path: '/dashboard-3',
    element: <ChartSample3 />,
    name: 'sample-3',
  },
  {
    path: '/dashboard-4',
    element: <ChartSample4 />,
    name: ROUTER_NAME.DASHBOARD_4,
  },
  {
    path: '/dashboard-5',
    element: <ChartSample5 />,
    name: ROUTER_NAME.DASHBOARD_5,
  },
  {
    path: '/dashboard-6',
    element: <ChartSample6 />,
    name: ROUTER_NAME.DASHBOARD_6,
  },
  {
    path: '/dashboard-7',
    element: <ChartSample7 />,
    name: ROUTER_NAME.DASHBOARD_7,
  },
  {
    path: '/dashboard-8',
    element: <ChartSample8 />,
    name: ROUTER_NAME.DASHBOARD_8,
  },
  {
    path: '/dashboard-9',
    element: <ChartSample9 />,
    name: ROUTER_NAME.DASHBOARD_9,
  },
  {
    path: '/dashboard-10',
    element: <ChartSample10 />,
    name: ROUTER_NAME.DASHBOARD_10,
  },

  // nguon du lieu iframe
  {
    path: config.routes.dataSourcesIframe,
    element: <DataSourceName />,
    name: ROUTER_NAME.DATA_FILE,
  },
  {
    path: config.routes.targetDataSource,
    element: <TargetDataSource />,
    name: ROUTER_NAME.LIST_SOURCE_DATA,
  },
  {
    path: config.routes.dataSourceConnect,
    element: <DataSourceConnect />,
    name: ROUTER_NAME.CONFIG_DATA_PROCESS,
  },

  // airflow - cau hinh luong chuyen sau
  {
    path: config.routes.airflowConfig,
    element: <IframeAirflow />,
    name: ROUTER_NAME.DATA_FILE,
  },
  {
    path: config.routes.airflowAddData,
    element: <AddDataSourceAirflow />,
  },
  {
    path: config.routes.airflowManageJob,
    element: <ManagementJobs />,
    name: ROUTER_NAME.AIRFLOW_MANAGE_JOBS,
  },

  // dremio
  {
    path: config.routes.dremio_dataset,
    element: <DatasetsDremio />,
    name: ROUTER_NAME.DATA_SOURCE_CONNECT,
  },
  {
    path: config.routes.dremio_sql_runner,
    element: <SQLRunnerDremio />,
    name: ROUTER_NAME.CONFIG_INTEGRATE,
  },
  {
    path: config.routes.dremio_jobs,
    element: <JobsDremio />,
    name: ROUTER_NAME.DATA_FILE,
  },
  {
    path: config.routes.integrate_from_existing_files,
    element: <IntegrateDatabasePage />,
    name: ROUTER_NAME.INTEGRATE_FROM_EXISTING_FILES,
  },
  {
    path: config.routes.integrate_data_from_cloud_databases,
    element: <IntegrateCloudDatabasePage />,
    name: ROUTER_NAME.INTEGRATE_DATA_FROM_CLOUD_DATABASES,
  },
  {
    path: config.routes.integrate_data_using_FTP_connection,
    element: <FTPConnectionPage />,
    name: ROUTER_NAME.INTEGRATE_DATA_USING_FTP_CONNECTION,
  },

  {
    path: config.routes.integrate_data_from_non_paginated_URLs,
    element: <IntegrateURLPage />,
    name: ROUTER_NAME.INTEGRATE_DATA_FROM_NON_PAGINATED_URL,
  },
  {
    path: config.routes.import_data_from_cloud_storage_services,
    element: <StorageServicesPage />,
    name: ROUTER_NAME.IMPORT_DATA_FROM_CLOUD_STORAGE_SERVICES,
  },

  // mito
  {
    path: config.routes.mitoNormalizeEnrichData,
    element: <IframeMito />,
    name: ROUTER_NAME.RECEIVE_CONNECT_API,
  },

  // search engine
  // y te
  {
    path: config.routes.search_index_list_medical,
    element: <MedicalIndustry />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  // giao duc
  {
    path: config.routes.search_index_list_education,
    element: <Education />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  // tu phap
  {
    path: config.routes.search_index_list_judicial,
    element: <JudicialBranch />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  // bao hiem xa hoi
  {
    path: config.routes.search_index_list_social_insurance,
    element: <SocialInsurance />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  // giao thong van tai
  {
    path: config.routes.search_index_list_transportation,
    element: <Transportation />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  //thuong binh xa hoi
  {
    path: config.routes.search_index_list_invalids_social_affairs,
    element: <InvalidsSocialAffairs />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  //thong tin truyen thong
  {
    path: config.routes.search_index_list_information_communication,
    element: <InformationCommunication />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  //van hoa the thao du lich
  {
    path: config.routes.search_index_list_culture_sports_tourism,
    element: <CultureSportsTourism />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  //ke hoach dau tu
  {
    path: config.routes.search_index_list_investment_plan,
    element: <InvestmentPlan />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  //tai chinh kho bac
  {
    path: config.routes.search_index_list_finance_treasury,
    element: <FinanceTreasury />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  //xay dung
  {
    path: config.routes.search_index_list_construction_industry,
    element: <Construction />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  //noi vu
  {
    path: config.routes.search_index_list_internal_affairs,
    element: <InternalAffairs />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.search_engine_index_add,
    element: <AddIndexSearchEngine />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.config_index(':id'),
    element: <ConfigIndex />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.sync_data_search_engine(':id'),
    element: <DataSync />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.test_search_index(':id'),
    element: <TestIndex />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },

  // search engine
  {
    path: config.routes.search_index_list,
    element: <SearchEngine />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.search_engine_index_add,
    element: <AddIndexSearchEngine />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.config_index(':id'),
    element: <ConfigIndex />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.sync_data_search_engine(':id'),
    element: <DataSync />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.test_search_index(':id'),
    element: <TestIndex />,
    name: ROUTER_NAME.REPORT_SYSTEM,
  },
  {
    path: config.routes.integrate_data_from_existing_files,
    element: <IntegrateFromExistingFiles />,
    name: ROUTER_NAME.IMPORT_DATA_INTEGRATE_FROM_EXISTING_FILES,
  },

  //KÊNH CHIA SẺ DỮ LIỆU
  {
    path: config.routes.config_query_organization,
    element: <ConfigPermissionOrganization />,
    name: ROUTER_NAME.DATA_SHARING,
  },
  {
    path: config.routes.retrieve_data_api,
    element: <RetrieveDataApi />,
    name: ROUTER_NAME.RETRIEVE_DATA_API,
  },

  // data governance
  {
    path: config.routes.data_governance_card_management,
    element: <ListCardManagement />,
    name: ROUTER_NAME.DATA_GOVERNANCE_MANAGEMENT_CARD,
  },
  {
    path: config.routes.data_governance_card_classification,
    element: <ListCardClassify />,
    name: ROUTER_NAME.DATA_GOVERNANCE_CARD_CLASSIFY,
  },

  // schools warehouse
  {
    path: config.routes.listSourceOrganizationTraining,
    element: <SourceOrganizationTraining />,
    name: ROUTER_NAME.LIST_SOURCE_DATA_ORGANIZATION,
  },
  {
    path: config.routes.list_progress_organization_training,
    element: <ProgressOrganizationTraining />,
    name: ROUTER_NAME.LIST_PROGRESS_ORGANIZATION,
  },

  {
    path: config.routes.listSourceELearning,
    element: <SourceELearning />,
    name: ROUTER_NAME.LIST_SOURCE_DATA_E_LEARNING,
  },
  {
    path: config.routes.list_progress_ELearning,
    element: <ProgressELearning />,
    name: ROUTER_NAME.LIST_PROGRESS_E_LEARNING,
  },

  {
    path: config.routes.listSourceDMDC,
    element: <SourceDMDC />,
    name: ROUTER_NAME.LIST_SOURCE_DATA_E_LEARNING,
  },
  {
    path: config.routes.list_progress_DMDC,
    element: <ProgressDMDC />,
    name: ROUTER_NAME.LIST_PROGRESS_E_LEARNING,
  },

  {
    path: config.routes.listSourceManagerNCKH,
    element: <SourceManagementNCKH />,
    name: ROUTER_NAME.LIST_SOURCE_DATA_MANAGEMENT_NCKH,
  },
  {
    path: config.routes.list_progress_ManagerNCKH,
    element: <ProgressManagementNCKH />,
    name: ROUTER_NAME.LIST_PROGRESS_MANAGEMENT_NCKH,
  },

  {
    path: config.routes.listSourceSupportTraining,
    element: <SourceSupportTraining />,
    name: ROUTER_NAME.LIST_SOURCE_DATA_SUPPORT_TRAINING,
  },
  {
    path: config.routes.list_progress_SupportTraining,
    element: <ProgressSupportTraining />,
    name: ROUTER_NAME.LIST_PROGRESS_SUPPORT_TRAINING,
  },

  {
    path: config.routes.listSourceExamination,
    element: <SourceExamination />,
    name: ROUTER_NAME.LIST_SOURCE_DATA_EXAMINATION,
  },
  {
    path: config.routes.list_progress_Examination,
    element: <ProgressExamination />,
    name: ROUTER_NAME.LIST_PROGRESS_EXAMINATION,
  },

  {
    path: config.routes.listSourceExecutiveDocuments,
    element: <SourceExecutiveDocuments />,
    name: ROUTER_NAME.LIST_SOURCE_DATA_EXECUTIVE_DOCUMENT,
  },
  {
    path: config.routes.list_progress_ExecutiveDocuments,
    element: <ProgressExecutiveDocuments />,
    name: ROUTER_NAME.LIST_PROGRESS_EXECUTIVE_DOCUMENT,
  },

  {
    path: config.routes.listSourceOfficeManager,
    element: <SourceOfficeManager />,
    name: ROUTER_NAME.LIST_SOURCE_DATA_OFFICE_MANAGER,
  },
  {
    path: config.routes.list_progress_OfficeManager,
    element: <ProgressOfficeManager />,
    name: ROUTER_NAME.LIST_PROGRESS_OFFICE_MANAGER,
  },

  {
    path: config.routes.integrateOrganizationTraining,
    element: <IntegrateOrganizationTraining />,
    name: ROUTER_NAME.DATA_INTEGRATION_ORGANIZATION,
  },

  {
    path: config.routes.nuclear_region,
    element: <h3>Chào mừng bạn đến với vùng hạt nhân</h3>,
    name: ROUTER_NAME.DATA_INTEGRATION_ORGANIZATION,
  },

  {
    path: config.routes.integrate_E_learning,
    element: <IntegrateELearning />,
    name: ROUTER_NAME.DATA_INTEGRATION_E_LEARNING,
  },
  {
    path: config.routes.integrate_DMDC,
    element: <IntegrateDMDC />,
    name: ROUTER_NAME.DATA_INTEGRATION_E_DMDC,
  },
  {
    path: config.routes.integrate_management_NCKH,
    element: <IntegrateManagementNCKH />,
    name: ROUTER_NAME.DATA_INTEGRATION_NCKH,
  },
  {
    path: config.routes.integrate_support_training,
    element: <IntegrateSupportTraining />,
    name: ROUTER_NAME.DATA_INTEGRATION_SUPPORT_TRAINING,
  },
  {
    path: config.routes.integrate_examination,
    element: <IntegrateExamination />,
    name: ROUTER_NAME.DATA_INTEGRATION_EXAMINATION,
  },
  {
    path: config.routes.integrate_executive_documents,
    element: <IntegrateExecutiveDocuments />,
    name: ROUTER_NAME.DATA_INTEGRATION_EXECUTIVE_DOCUMENT,
  },
  {
    path: config.routes.integrate_office_manager,
    element: <IntegrateOfficeManager />,
    name: ROUTER_NAME.DATA_INTEGRATION_OFFICE_MANAGER,
  },
  {
    path: config.routes.dataAggregationMechanismOrganization,
    element: <AggregateOrganization />,
    name: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_ORGANIZE_TRAINING,
  },
  {
    path: config.routes.detailJobOrganization(':id'),
    element: <DetailsJob />,
  },
  {
    path: config.routes.detailJobELearning(':id'),
    element: <DetailsJob />,
  },
  {
    path: config.routes.detailJobDMDC(':id'),
    element: <DetailsJob />,
  },
  {
    path: config.routes.detailJobNCKH(':id'),
    element: <DetailsJob />,
  },
  {
    path: config.routes.detailJobSupport(':id'),
    element: <DetailsJob />,
  },
  {
    path: config.routes.detailJobExamination(':id'),
    element: <DetailsJob />,
  },
  {
    path: config.routes.detailJobDocument(':id'),
    element: <DetailsJob />,
  },
  {
    path: config.routes.detailJobOffice(':id'),
    element: <DetailsJob />,
  },
  {
    path: config.routes.addJobOrganization,
    element: <AddJob />,
  },
  {
    path: config.routes.addJobELearning,
    element: <AddJob />,
  },
  {
    path: config.routes.addJobDMDC,
    element: <AddJob />,
  },
  {
    path: config.routes.addJobNCKH,
    element: <AddJob />,
  },
  {
    path: config.routes.addJobSupport,
    element: <AddJob />,
  },
  {
    path: config.routes.addJobExamination,
    element: <AddJob />,
  },
  {
    path: config.routes.addJobDocument,
    element: <AddJob />,
  },
  {
    path: config.routes.addJobOffice,
    element: <AddJob />,
  },

  {
    path: config.routes.aggregate_data_mark_training,
    element: <DataMarkTraining />,
    name: ROUTER_NAME.AGGREGATE_DATA_MARK_TRAINING,
  },
  {
    path: config.routes.aggregate_data_mark_training_add,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_data_mark_training(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.aggregate_data_mark_course_research_status,
    element: <CourseResearchStatus />,
    name: ROUTER_NAME.AGGREGATE_DATA_MARK_COURSE_RESEARCH_STATUS,
  },
  {
    path: config.routes.aggregate_data_mark_course_research_status_add,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_data_mark_course_research_status(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.aggregate_data_mark_static,
    element: <CourseResearchStatus />,
    name: ROUTER_NAME.AGGREGATE_DATA_MARK_STATIC,
  },
  {
    path: config.routes.aggregate_data_mark_static,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_data_mark_static(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.report_static_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_report_static_job(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.look_up_collected_results_organization,
    element: <LookUpCollectedResultsOrganization />,
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_ORGANIZATION,
  },
  {
    path: config.routes.dataAggregationMechanismELearning,
    element: <AggregateELearning />,
    name: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_E_LEARNING,
  },
  {
    path: config.routes.look_up_collected_results_eLearning,
    element: <LookUpCollectedResultsELearning />,
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_E_LEARNING,
  },

  {
    path: config.routes.dataAggregationMechanisDMDC,
    element: <AggregateDMDC />,
    name: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_DMDC,
  },
  {
    path: config.routes.look_up_collected_results_DMDC,
    element: <LookUpCollectedResultsDMDC />,
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_DMDC,
  },

  {
    path: config.routes.dataAggregationMechanisManagement_NCKH,
    element: <AggregateManagementNCKH />,
    name: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_MANAGEMENT_NCKH,
  },
  {
    path: config.routes.look_up_collected_results_management_NCKH,
    element: <LookUpCollectedResultsManagementNCKH />,
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_NCKH,
  },

  {
    path: config.routes.dataAggregationMechanis_support_training,
    element: <AggregateManagementSupportTraining />,
    name: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_SUPPORT_TRAINING,
  },
  {
    path: config.routes.look_up_collected_results_support_training,
    element: <LookUpCollectedResultsSupportTraining />,
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_SUPPORT_TRAINING,
  },

  {
    path: config.routes.dataAggregationMechanis_examination,
    element: <AggregateExamination />,
    name: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_EXAMINATION,
  },
  {
    path: config.routes.look_up_collected_results_examination,
    element: <LookUpCollectedResultsExamination />,
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_EXAMINATION,
  },

  {
    path: config.routes.dataAggregationMechanis_executive_documents,
    element: <AggregateExecutiveDocuments />,
    name: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_EXECUTIVE_DOCUMENT,
  },
  {
    path: config.routes.look_up_collected_results_executive_documents,
    element: <LookUpCollectedResultsExecutiveDocuments />,
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_EXECUTIVE_DOCUMENT,
  },

  {
    path: config.routes.dataAggregationMechanis_office_manager,
    element: <AggregateOfficeManager />,
    name: ROUTER_NAME.DATA_AGGREGATION_MECHANISM_OFFICE_MANAGER,
  },
  {
    path: config.routes.look_up_collected_results_office_manager,
    element: <LookUpCollectedResultsOfficeManager />,
    name: ROUTER_NAME.LOOK_UP_COLLECTED_RESULTS_OFFICE_MANAGER,
  },
  {
    path: config.routes.manageDataCommonUnit,
    element: <InforCommon />,
    name: ROUTER_NAME.MANAGE_DATA_COMMON_UNIT,
  },
  {
    path: config.routes.createDataCommonUnit,
    element: (
      <WrapperFormAddingData
        title={'table.action.add'}
        category={CATEGORY_ADDITIAL_DATA.INFOR}
      />
    ),
    name: ROUTER_NAME.MANAGE_DATA_COMMON_UNIT,
  },
  {
    path: config.routes.editDataCommonUnit(':id'),
    element: (
      <WrapperFormAddingData
        title={'table.action.edit'}
        category={CATEGORY_ADDITIAL_DATA.INFOR}
      />
    ),
    name: ROUTER_NAME.MANAGE_DATA_COMMON_UNIT,
  },
  {
    path: config.routes.manageAchievesUnit,
    element: <AchievesUnit />,
    name: ROUTER_NAME.MANAGE_ACHIEVES_UNIT,
  },
  {
    path: config.routes.manageLeaders,
    element: <ManageLeaders />,
    name: ROUTER_NAME.MANAGE_LEADERS,
  },
  {
    path: config.routes.createLeaders,
    element: (
      <WrapperFormAddingData
        title={'table.action.add'}
        category={CATEGORY_ADDITIAL_DATA.LEADERS}
      />
    ),
    name: ROUTER_NAME.MANAGE_DATA_COMMON_UNIT,
  },
  {
    path: config.routes.editLeaders(':id'),
    element: (
      <WrapperFormAddingData
        title={'table.action.edit'}
        category={CATEGORY_ADDITIAL_DATA.LEADERS}
      />
    ),
    name: ROUTER_NAME.MANAGE_DATA_COMMON_UNIT,
  },
  {
    path: config.routes.manageTeachers,
    element: <ManageTeachers />,
    name: ROUTER_NAME.MANAGE_TEACHERS,
  },
  {
    path: config.routes.createTeachers,
    element: (
      <WrapperFormAddingData
        title={'table.action.add'}
        category={CATEGORY_ADDITIAL_DATA.TEACHERS}
      />
    ),
    name: ROUTER_NAME.MANAGE_DATA_COMMON_UNIT,
  },
  {
    path: config.routes.editTeachers(':id'),
    element: (
      <WrapperFormAddingData
        title={'table.action.edit'}
        category={CATEGORY_ADDITIAL_DATA.TEACHERS}
      />
    ),
    name: ROUTER_NAME.MANAGE_DATA_COMMON_UNIT,
  },
  //Dich vu du lieu
  {
    path: config.routes.list_scientist,
    element: <ListScientist />,
    name: ROUTER_NAME.LIST_SCIENTIST,
  },
  {
    path: config.routes.list_scientific_research_topic,
    element: <ListScientificTopic />,
    name: ROUTER_NAME.LIST_SCIENTIFIC_RESEARCH_TOPIC,
  },
  {
    path: config.routes.list_scientific_research_award,
    element: <ListScientificAward />,
    name: ROUTER_NAME.LIST_SCIENTIFIC_RESEARCH_AWARD,
  },
  {
    path: config.routes.list_publication,
    element: <ListPublication />,
    name: ROUTER_NAME.LIST_PUBLICATION,
  },

  //Quản lý công thức
  {
    path: config.routes.formulaManage,
    element: <FormulaManagement />,
    name: ROUTER_NAME.FORMULA_MANAGEMENT,
  },
  {
    path: config.routes.formulaManageAdd,
    element: <AddJob onlySelectQuery />,
  },
  {
    path: config.routes.formulaManageDetail(':id'),
    element: <DetailFormula onlySelectQuery />,
  },

  //Danh sách chỉ tiêu
  {
    path: config.routes.list_criterion,
    element: <CriterionList />,
    name: ROUTER_NAME.LIST_LOOKUP_TARGET,
  },

  //Thiết lập vùng dữ liệu chủ đề
  {
    path: config.routes.summary_dynamic_report,
    element: <SummaryDynamicReport />,
    name: ROUTER_NAME.SUMMARY_DYNAMIC_REPORT,
  },
  {
    path: config.routes.summary_dynamic_report_add_job,
    element: <AddJob />,
  },

  {
    path: config.routes.detail_data_mark_report_dynamic(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.summary_kpi,
    element: <SummaryKPI />,
    name: ROUTER_NAME.SUMMARY_KPI,
  },
  {
    path: config.routes.summary_api_service,
    element: <SummaryApiService />,
    name: ROUTER_NAME.SUMMARY_API_SERVICE,
  },
  // Báo cáo động
  {
    path: config.routes.dynamic_quality_assurance,
    element: <DynamicQualityAssurance />,
    name: ROUTER_NAME.DYNAMIC_QUALITY_ASSURANCE,
  },
  {
    path: config.routes.dynamic_quality_assurance_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_dynamic_quality_assurance(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.dynamic_training_organization,
    element: <DynamicTrainingOrganization />,
    name: ROUTER_NAME.DYNAMIC_TRAINING_ORGANIZATION,
  },
  {
    path: config.routes.dynamic_training_organization_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_dynamic_training_organization(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.dynamic_academy_operations,
    element: <DynamicAcademyOperations />,
    name: ROUTER_NAME.DYNAMIC_ACADEMY_OPERATIONS,
  },
  {
    path: config.routes.dynamic_academy_operations_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_dynamic_academy_operations(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.dynamic_examination_assessment,
    element: <DynamicExaminationAssessment />,
    name: ROUTER_NAME.DYNAMIC_EXAMINATION_ASSESSMENT,
  },
  {
    path: config.routes.dynamic_examination_assessment_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_dynamic_examination_assessment(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.dynamic_graduation_certification,
    element: <DynamicGraduationCertification />,
    name: ROUTER_NAME.DYNAMIC_GRADUATION_CERTIFICATION,
  },
  {
    path: config.routes.dynamic_graduation_certification_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_dynamic_graduation_certification(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.dynamic_student_progress,
    element: <DynamicStudentProgress />,
    name: ROUTER_NAME.DYNAMIC_STUDENT_PROGRESS,
  },
  {
    path: config.routes.dynamic_student_progress_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_dynamic_student_progress(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.dynamic_faculty_situation,
    element: <DynamicFacultySituation />,
    name: ROUTER_NAME.DYNAMIC_FACULTY_SITUATION,
  },
  {
    path: config.routes.dynamic_faculty_situation_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_dynamic_faculty_situation(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.dynamic_academic_finance,
    element: <DynamicAcademicFinance />,
    name: ROUTER_NAME.DYNAMIC_ACADEMIC_FINANCE,
  },
  {
    path: config.routes.dynamic_academic_finance_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_dynamic_academic_finance(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.dynamic_scientific_research,
    element: <DynamicScientificResearch />,
    name: ROUTER_NAME.DYNAMIC_SCIENTIFIC_RESEARCH,
  },
  {
    path: config.routes.dynamic_scientific_research_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_dynamic_scientific_research(':id'),
    element: <DetailsJob />,
  },

  //Báo cáo tĩnh tình hình đào tạo
  {
    path: config.routes.enrollment_statistics,
    element: <EnrollmentStatistics />,
    name: ROUTER_NAME.ENROLLMENT_STATISTICS,
  },
  {
    path: config.routes.enrollment_statistics_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_enrollment_statistics(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.international_students,
    element: <InternationalStudents />,
    name: ROUTER_NAME.INTERNATIONAL_STUDENTS,
  },
  {
    path: config.routes.international_students_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_international_students(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.research_participation,
    element: <ResearchParticipation />,
    name: ROUTER_NAME.RESEARCH_PARTICIPATION,
  },
  {
    path: config.routes.research_participation_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_research_participation(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.internship_activities,
    element: <InternshipActivities />,
    name: ROUTER_NAME.INTERNSHIP_ACTIVITIES,
  },
  {
    path: config.routes.internship_activities_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_internship_activities(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.credit_transfer,
    element: <CreditTransfer />,
    name: ROUTER_NAME.CREDIT_TRANSFER,
  },
  {
    path: config.routes.credit_transfer_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_credit_transfer(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.exam_exemption,
    element: <ExamExemption />,
    name: ROUTER_NAME.EXAM_EXEMPTION,
  },
  {
    path: config.routes.exam_exemption_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_exam_exemption(':id'),
    element: <DetailsJob />,
  },

  //Báo cáo tĩnh tổ chức học tập
  {
    path: config.routes.awards_situation,
    element: <AwardsSituation />,
    name: ROUTER_NAME.AWARDS_SITUATION,
  },
  {
    path: config.routes.awards_situation_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_awards_situation(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.disciplinary_actions,
    element: <DisciplinaryActions />,
    name: ROUTER_NAME.DISCIPLINARY_ACTIONS,
  },
  {
    path: config.routes.disciplinary_actions_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_disciplinary_actions(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.scholarship_recipients,
    element: <ScholarshipRecipients />,
    name: ROUTER_NAME.SCHOLARSHIP_RECIPIENTS,
  },
  {
    path: config.routes.scholarship_recipients_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_scholarship_recipients(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.support_assistance,
    element: <SupportAssistance />,
    name: ROUTER_NAME.SUPPORT_ASSISTANCE,
  },
  {
    path: config.routes.support_assistance_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_support_assistance(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.fee_waivers,
    element: <FeeWaivers />,
    name: ROUTER_NAME.FEE_WAIVERS,
  },
  {
    path: config.routes.fee_waivers_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_fee_waivers(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.grade_deficiency,
    element: <GradeDeficiency />,
    name: ROUTER_NAME.GRADE_DEFICIENCY,
  },
  {
    path: config.routes.grade_deficiency_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_grade_deficiency(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.student_quality,
    element: <StudentQuality />,
    name: ROUTER_NAME.STUDENT_QUALITY,
  },
  {
    path: config.routes.student_quality_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_student_quality(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.academic_ranking,
    element: <AcademicRanking />,
    name: ROUTER_NAME.ACADEMIC_RANKING,
  },
  {
    path: config.routes.academic_ranking_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_academic_ranking(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.performance_ranking,
    element: <PerformanceRanking />,
    name: ROUTER_NAME.PERFORMANCE_RANKING,
  },
  {
    path: config.routes.performance_ranking_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_performance_ranking(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.performance_ranking,
    element: <PerformanceRanking />,
    name: ROUTER_NAME.PERFORMANCE_RANKING,
  },
  {
    path: config.routes.performance_ranking_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_performance_ranking(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.honor_titles,
    element: <HonorTitles />,
    name: ROUTER_NAME.HONOR_TITLES,
  },
  {
    path: config.routes.honor_titles_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_honor_titles(':id'),
    element: <DetailsJob />,
  },

  //Báo cáo tĩnh khảo thí
  {
    path: config.routes.mean_deviation,
    element: <MeanDeviation />,
    name: ROUTER_NAME.MEAN_DEVIATION,
  },
  {
    path: config.routes.mean_deviation_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_mean_deviation(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.grade_distribution,
    element: <GradeDistribution />,
    name: ROUTER_NAME.GRADE_DISTRIBUTION,
  },
  {
    path: config.routes.grade_distribution_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_grade_distribution(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.study_progress,
    element: <StudyProgress />,
    name: ROUTER_NAME.STUDY_PROGRESS,
  },
  {
    path: config.routes.study_progress_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_study_progress(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.makeup_exams,
    element: <MakeupExams />,
    name: ROUTER_NAME.MAKEUP_EXAMS,
  },
  {
    path: config.routes.makeup_exams_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_makeup_exams(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.course_evaluation,
    element: <CourseEvaluation />,
    name: ROUTER_NAME.COURSE_EVALUATION,
  },
  {
    path: config.routes.course_evaluation_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_course_evaluation(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.exam_recheck,
    element: <ExamRecheck />,
    name: ROUTER_NAME.EXAM_RECHECK,
  },
  {
    path: config.routes.exam_recheck_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_exam_recheck(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.exam_complaints,
    element: <ExamComplaints />,
    name: ROUTER_NAME.EXAM_COMPLAINTS,
  },
  {
    path: config.routes.exam_complaints_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_exam_complaints(':id'),
    element: <DetailsJob />,
  },

  //Báo cáo tĩnh tốt nghiệp và văn bằng
  {
    path: config.routes.graduation_numbers,
    element: <GraduationNumbers />,
    name: ROUTER_NAME.GRADUATION_NUMBERS,
  },
  {
    path: config.routes.graduation_numbers_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_graduation_numbers(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.graduation_status,
    element: <GraduationStatus />,
    name: ROUTER_NAME.GRADUATION_STATUS,
  },
  {
    path: config.routes.graduation_status_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_graduation_status(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.credential_issuance,
    element: <CredentialIssuance />,
    name: ROUTER_NAME.CREDENTIAL_ISSUANCE,
  },
  {
    path: config.routes.credential_issuance_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_credential_issuance(':id'),
    element: <DetailsJob />,
  },

  //Báo cáo tĩnh tình hình nghiên cứu khoa học
  {
    path: config.routes.research_topics,
    element: <ResearchTopics />,
    name: ROUTER_NAME.RESEARCH_TOPICS,
  },
  {
    path: config.routes.research_topics_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_research_topics(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.staff_numbers,
    element: <StaffNumbers />,
    name: ROUTER_NAME.STAFF_NUMBERS,
  },
  {
    path: config.routes.staff_numbers_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_staff_numbers(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.book_count,
    element: <BookCount />,
    name: ROUTER_NAME.BOOK_COUNT,
  },
  {
    path: config.routes.book_count_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_book_count(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.author_staff,
    element: <AuthorStaff />,
    name: ROUTER_NAME.AUTHOR_STAFF,
  },
  {
    path: config.routes.author_staff_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_author_staff(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.staff_articles,
    element: <StaffArticles />,
    name: ROUTER_NAME.STAFF_ARTICLES,
  },
  {
    path: config.routes.staff_articles_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_staff_articles(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.journal_articles,
    element: <JournalArticles />,
    name: ROUTER_NAME.JOURNAL_ARTICLES,
  },
  {
    path: config.routes.journal_articles_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_journal_articles(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.conference_reports,
    element: <ConferenceReports />,
    name: ROUTER_NAME.CONFERENCE_REPORTS,
  },
  {
    path: config.routes.conference_reports_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_conference_reports(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.patents_count,
    element: <PatentsCount />,
    name: ROUTER_NAME.PATENTS_COUNT,
  },
  {
    path: config.routes.patents_count_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_patents_count(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.student_researcher,
    element: <StudentResearchers />,
    name: ROUTER_NAME.STUDENT_RESEARCHER,
  },
  {
    path: config.routes.student_researcher_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_student_researcher(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.research_achievements,
    element: <ResearchAchievements />,
    name: ROUTER_NAME.RESEARCH_ACHIEVEMENTS,
  },
  {
    path: config.routes.research_achievements_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_research_achievements(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.project_outcomes,
    element: <ProjectOutcomes />,
    name: ROUTER_NAME.PROJECT_OUTCOMES,
  },
  {
    path: config.routes.project_outcomes_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_project_outcomes(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.contract_list,
    element: <ContractList />,
    name: ROUTER_NAME.CONTRACT_LIST,
  },
  {
    path: config.routes.contract_list_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_contract_list(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.publication_results,
    element: <PublicationResults />,
    name: ROUTER_NAME.PUBLICATION_RESULTS,
  },
  {
    path: config.routes.publication_results_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_publication_results(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.science_staff,
    element: <ScienceStaff />,
    name: ROUTER_NAME.SCIENCE_STAFF,
  },
  {
    path: config.routes.science_staff_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_science_staff(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.science_funding,
    element: <ScienceFunding />,
    name: ROUTER_NAME.SCIENCE_FUNDING,
  },
  {
    path: config.routes.science_funding_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_science_funding(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.tech_development,
    element: <TechDevelopment />,
    name: ROUTER_NAME.TECH_DEVELOPMENT,
  },
  {
    path: config.routes.tech_development_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_tech_development(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.international_cooperation,
    element: <InternationalCooperation />,
    name: ROUTER_NAME.INTERNATIONAL_COOPERATION,
  },
  {
    path: config.routes.international_cooperation_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_international_cooperation(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.research_revenue,
    element: <ResearchRevenue />,
    name: ROUTER_NAME.RESEARCH_REVENUE,
  },
  {
    path: config.routes.research_revenue_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_research_revenue(':id'),
    element: <DetailsJob />,
  },

  {
    path: config.routes.perform_work,
    element: <PerformWork />,
    name: ROUTER_NAME.PERFORM_WORK,
  },
  {
    path: config.routes.perform_work_add_job,
    element: <AddJob />,
  },
  {
    path: config.routes.detail_perform_work(':id'),
    element: <DetailsJob />,
  },

  //Quản lý mẫu báo cáo tĩnh
  {
    path: config.routes.report_template,
    element: <ReportTemplate />,
    name: ROUTER_NAME.SQL_LAB2,
  },

  //Lịch sử xuất báo cáo tĩnh
  {
    path: config.routes.export_history,
    element: <ExportHistory />,
    name: ROUTER_NAME.SQL_LAB3,
  },
  {
    path: config.routes.build_api_data_source,
    element: <ListApiDataSource />,
    name: ROUTER_NAME.BUILD_API_DATA_SOURCE,
  },

  //Thiết lập tổng hợp KPIs
  {
    path: config.routes.kpis_academy_metrics,
    element: <KpiAcademyMetrics />,
    name: ROUTER_NAME.KPIS_ACADEMY_METRICS,
  },
  {
    path: config.routes.kpis_training_status,
    element: <KpiTrainingStatus />,
    name: ROUTER_NAME.KPIS_TRAINING_STATUS,
  },
  {
    path: config.routes.kpis_student_performance,
    element: <KpiStudentPerformance />,
    name: ROUTER_NAME.KPIS_STUDENT_PERFORMANCE,
  },
  {
    path: config.routes.kpis_faculty_quality,
    element: <KpiFacultyQuality />,
    name: ROUTER_NAME.KPIS_FACULTY_QUALITY,
  },
  {
    path: config.routes.kpis_research_activities,
    element: <KpiResearchActivities />,
    name: ROUTER_NAME.KPIS_RESEARCH_ACTIVITIES,
  },
  {
    path: config.routes.kpis_learning_progress,
    element: <KpiLearningProgress />,
    name: ROUTER_NAME.KPIS_LEARNING_PROGRESS,
  },
  {
    path: config.routes.kpis_academic_results,
    element: <KpiAcademicResults />,
    name: ROUTER_NAME.KPIS_ACADEMIC_RESULTS,
  },

  // Thiết lập tổng hợp dữ liệu API
  {
    path: config.routes.evaluate_training_quality,
    element: <EvaluateTrainingQuality />,
    name: ROUTER_NAME.EVALUATE_TRAINING_QUALITY,
  },
  {
    path: config.routes.training_costs,
    element: <TrainingCosts />,
    name: ROUTER_NAME.TRAINING_COSTS,
  },
  {
    path: config.routes.lecturer_data,
    element: <LecturerData />,
    name: ROUTER_NAME.LECTURER_DATA,
  },
  {
    path: config.routes.student_data,
    element: <StudentData />,
    name: ROUTER_NAME.STUDENT_DATA,
  },
];
