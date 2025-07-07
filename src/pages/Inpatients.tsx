import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Plus, Filter, Calendar, Clock, User, Building2, BedDouble, FileText, ArrowRight, ArrowRightLeft, DoorOpen, Stethoscope, Heart, X, CheckCircle, AlertCircle } from 'lucide-react';
import AddInpatientModal from '../components/Inpatients/AddInpatientModal';
import DeleteInpatientModal from '../components/Inpatients/DeleteInpatientModal';
import InpatientDetailsModal from '../components/Inpatients/InpatientDetailsModal';
import DischargeModal from '../components/Inpatients/DischargeModal';
import InpatientCareModal from '../components/Inpatients/InpatientCareModal';
import WardRoundModal from '../components/Inpatients/WardRoundModal';
import AdmissionRequestModal from '../components/Inpatients/AdmissionRequestModal';

type InpatientStatus = 'admitted' | 'critical' | 'stable' | 'improving' | 'discharged' | 'transferred';
type AdmissionStatus = 'pending' | 'approved' | 'rejected';

interface Inpatient {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  admissionDate: string;
  admissionTime: string;
  ward: string;
  room: string;
  bedNumber: string;
  diagnosis: string[];
  doctor: string;
  department: string;
  status: InpatientStatus;
  expectedDischargeDate?: string;
  lengthOfStay: number;
  vitalSigns: {
    temperature: number;
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
  };
  nursingLevel: 'standard' | 'intermediate' | 'intensive';
  dietType: string;
  activityLevel: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    route: string;
    startDate: string;
    endDate?: string;
    status: 'active' | 'discontinued' | 'completed';
  }>;
  allergies?: string[];
  notes?: string;
  lastRound?: {
    date: string;
    time: string;
    doctor: string;
    notes: string;
  };
  careTeam: Array<{
    id: string;
    name: string;
    role: string;
    department: string;
  }>;
  orders: Array<{
    id: string;
    type: 'medication' | 'lab' | 'imaging' | 'procedure' | 'nursing' | 'diet' | 'activity';
    name: string;
    status: 'active' | 'completed' | 'cancelled';
    orderedDate: string;
    orderedBy: string;
    details: string;
  }>;
  progressNotes: Array<{
    id: string;
    date: string;
    time: string;
    author: string;
    content: string;
    type: 'doctor' | 'nurse' | 'other';
  }>;
  treatmentResponse: 'good' | 'fair' | 'poor' | 'unknown';
  complications: string[];
  dischargeStatus?: 'pending' | 'planned' | 'completed';
  dischargeDate?: string;
  dischargeSummary?: string;
  followUpPlan?: string;
}

interface AdmissionRequest {
  id: string;
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  department: string;
  doctor: string;
  diagnosis: string;
  reason: string;
  requestDate: string;
  urgency: 'normal' | 'urgent';
  status: AdmissionStatus;
  rejectionReason?: string;
}

const Inpatients: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<InpatientStatus | 'all'>('all');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDischargeModal, setShowDischargeModal] = useState(false);
  const [showCareModal, setShowCareModal] = useState(false);
  const [showRoundModal, setShowRoundModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAdmissionRequestModal, setShowAdmissionRequestModal] = useState(false);
  const [selectedInpatient, setSelectedInpatient] = useState<Inpatient | null>(null);
  const [selectedAdmissionRequest, setSelectedAdmissionRequest] = useState<AdmissionRequest | null>(null);
  const [activeTab, setActiveTab] = useState<'inpatients' | 'admissionRequests'>('inpatients');

  // 示例数据 - 实际应该从API获取
  const inpatients: Inpatient[] = [
    {
      id: "IP-001",
      patientId: "P-12345",
      patientName: "张三",
      age: 45,
      gender: "男",
      admissionDate: "2025-05-20",
      admissionTime: "14:30",
      ward: "内科病区A",
      room: "301",
      bedNumber: "301-A",
      diagnosis: ["原发性高血压", "2型糖尿病"],
      doctor: "李医生",
      department: "内科",
      status: "admitted",
      expectedDischargeDate: "2025-05-27",
      lengthOfStay: 2,
      vitalSigns: {
        temperature: 36.8,
        bloodPressure: "130/85",
        heartRate: 75,
        respiratoryRate: 16,
        oxygenSaturation: 98
      },
      nursingLevel: "standard",
      dietType: "低盐饮食",
      activityLevel: "适度活动",
      medications: [
        {
          name: "氨氯地平片",
          dosage: "5mg",
          frequency: "每日一次",
          route: "口服",
          startDate: "2025-05-20",
          status: "active"
        }
      ],
      allergies: ["青霉素"],
      careTeam: [
        {
          id: "D-001",
          name: "李医生",
          role: "主治医师",
          department: "内科"
        },
        {
          id: "N-001",
          name: "王护士",
          role: "责任护士",
          department: "内科"
        }
      ],
      orders: [
        {
          id: "O-001",
          type: "medication",
          name: "氨氯地平片 5mg 口服 每日一次",
          status: "active",
          orderedDate: "2025-05-20",
          orderedBy: "李医生",
          details: "早餐后服用"
        },
        {
          id: "O-002",
          type: "lab",
          name: "血常规检查",
          status: "completed",
          orderedDate: "2025-05-20",
          orderedBy: "李医生",
          details: "明天上午空腹"
        }
      ],
      progressNotes: [
        {
          id: "PN-001",
          date: "2025-05-20",
          time: "16:00",
          author: "李医生",
          content: "患者入院时血压130/85mmHg，无明显不适。继续口服降压药物。",
          type: "doctor"
        }
      ],
      treatmentResponse: "good",
      complications: []
    },
    {
      id: "IP-002",
      patientId: "P-12346",
      patientName: "李四",
      age: 32,
      gender: "女",
      admissionDate: "2025-05-19",
      admissionTime: "10:15",
      ward: "外科病区B",
      room: "205",
      bedNumber: "205-B",
      diagnosis: ["急性阑尾炎", "术后恢复"],
      doctor: "张医生",
      department: "外科",
      status: "improving",
      expectedDischargeDate: "2025-05-25",
      lengthOfStay: 3,
      vitalSigns: {
        temperature: 37.2,
        bloodPressure: "120/80",
        heartRate: 80,
        respiratoryRate: 18,
        oxygenSaturation: 97
      },
      nursingLevel: "intermediate",
      dietType: "流质饮食",
      activityLevel: "卧床休息，可下床如厕",
      medications: [
        {
          name: "头孢曲松",
          dosage: "2g",
          frequency: "每12小时一次",
          route: "静脉滴注",
          startDate: "2025-05-19",
          status: "active"
        },
        {
          name: "布洛芬",
          dosage: "400mg",
          frequency: "需要时",
          route: "口服",
          startDate: "2025-05-19",
          status: "active"
        }
      ],
      careTeam: [
        {
          id: "D-002",
          name: "张医生",
          role: "主治医师",
          department: "外科"
        },
        {
          id: "N-002",
          name: "刘护士",
          role: "责任护士",
          department: "外科"
        }
      ],
      orders: [
        {
          id: "O-003",
          type: "medication",
          name: "头孢曲松 2g 静脉滴注 每12小时一次",
          status: "active",
          orderedDate: "2025-05-19",
          orderedBy: "张医生",
          details: "术后抗感染"
        },
        {
          id: "O-004",
          type: "nursing",
          name: "伤口护理",
          status: "active",
          orderedDate: "2025-05-19",
          orderedBy: "张医生",
          details: "每日更换敷料一次"
        }
      ],
      progressNotes: [
        {
          id: "PN-002",
          date: "2025-05-20",
          time: "09:00",
          author: "张医生",
          content: "患者术后第一天，伤口愈合良好，无渗出，无感染征象。",
          type: "doctor"
        },
        {
          id: "PN-003",
          date: "2025-05-20",
          time: "14:00",
          author: "刘护士",
          content: "已更换敷料，伤口干燥清洁。患者生命体征平稳。",
          type: "nurse"
        }
      ],
      treatmentResponse: "good",
      complications: []
    }
  ];

  // 示例数据 - 住院申请
  const admissionRequests: AdmissionRequest[] = [
    {
      id: "ADM-001",
      patientName: "王五",
      patientId: "P-12347",
      age: 58,
      gender: "男",
      department: "心内科",
      doctor: "赵医生",
      diagnosis: "不稳定型心绞痛",
      reason: "患者近期心绞痛发作频繁，需住院进一步检查和治疗",
      requestDate: "2025-05-22",
      urgency: "urgent",
      status: "pending"
    },
    {
      id: "ADM-002",
      patientName: "赵六",
      patientId: "P-12348",
      age: 42,
      gender: "女",
      department: "神经内科",
      doctor: "钱医生",
      diagnosis: "脑梗死",
      reason: "患者出现右侧肢体无力，CT显示左侧大脑中动脉区域梗死",
      requestDate: "2025-05-22",
      urgency: "normal",
      status: "pending"
    }
  ];

  // 可用床位
  const availableBeds = [
    { id: 'B003', number: '302-A', ward: '内科病区A', type: '普通床位' },
    { id: 'B004', number: '302-B', ward: '内科病区A', type: '普通床位' },
    { id: 'B005', number: '205-C', ward: '外科病区B', type: '普通床位' }
  ];

  const getStatusColor = (status: InpatientStatus) => {
    switch (status) {
      case 'admitted': return 'bg-blue-100 text-blue-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'stable': return 'bg-green-100 text-green-800';
      case 'improving': return 'bg-teal-100 text-teal-800';
      case 'discharged': return 'bg-gray-100 text-gray-800';
      case 'transferred': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: InpatientStatus) => {
    const labels = {
      admitted: '已入院',
      critical: '危重',
      stable: '稳定',
      improving: '好转中',
      discharged: '已出院',
      transferred: '已转科'
    };
    return labels[status] || '未知';
  };

  const getAdmissionStatusColor = (status: AdmissionStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAdmissionStatusLabel = (status: AdmissionStatus) => {
    const labels = {
      pending: '待审核',
      approved: '已批准',
      rejected: '已拒绝'
    };
    return labels[status] || '未知';
  };

  const getUrgencyColor = (urgency: 'normal' | 'urgent') => {
    return urgency === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  const filteredInpatients = inpatients.filter(inpatient => {
    const matchesSearch = inpatient.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inpatient.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inpatient.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || inpatient.status === selectedStatus;
    const matchesDepartment = !selectedDepartment || inpatient.department === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const filteredAdmissionRequests = admissionRequests.filter(request => {
    const matchesSearch = request.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = !selectedDepartment || request.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddInpatient = (data: any) => {
    console.log('添加住院患者:', data);
    setShowAddModal(false);
  };

  const handleDischarge = (data: any) => {
    console.log('办理出院:', data);
    setShowDischargeModal(false);
    setSelectedInpatient(null);
  };

  const handleCareUpdate = (data: any) => {
    console.log('更新护理计划:', data);
    setShowCareModal(false);
    setSelectedInpatient(null);
  };

  const handleRoundSubmit = (data: any) => {
    console.log('提交查房记录:', data);
    setShowRoundModal(false);
    setSelectedInpatient(null);
  };

  const handleDeleteInpatient = () => {
    console.log('删除住院记录:', selectedInpatient?.id);
    setShowDeleteModal(false);
    setSelectedInpatient(null);
  };

  const handleApproveAdmission = (bedNumber: string) => {
    console.log('批准入院申请:', selectedAdmissionRequest?.id, '分配床位:', bedNumber);
    setShowAdmissionRequestModal(false);
    setSelectedAdmissionRequest(null);
  };

  const handleRejectAdmission = (reason: string) => {
    console.log('拒绝入院申请:', selectedAdmissionRequest?.id, '原因:', reason);
    setShowAdmissionRequestModal(false);
    setSelectedAdmissionRequest(null);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{t('inpatients.title')}</h1>
          <p className="text-gray-600">{t('inpatients.subtitle')}</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            {t('inpatients.new')}
          </button>
        </div>
      </div>

      {/* 标签页切换 */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('inpatients')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'inpatients'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BedDouble size={16} className="inline mr-2" />
            住院患者管理
          </button>
          <button
            onClick={() => setActiveTab('admissionRequests')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'admissionRequests'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText size={16} className="inline mr-2" />
            住院申请审核
            {admissionRequests.filter(req => req.status === 'pending').length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                {admissionRequests.filter(req => req.status === 'pending').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={activeTab === 'inpatients' ? t('inpatients.search') : "搜索住院申请..."}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {activeTab === 'inpatients' && (
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as InpatientStatus | 'all')}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="all">所有状态</option>
              <option value="admitted">已入院</option>
              <option value="critical">危重</option>
              <option value="stable">稳定</option>
              <option value="improving">好转中</option>
              <option value="discharged">已出院</option>
              <option value="transferred">已转科</option>
            </select>
          )}
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="">所有科室</option>
            <option value="内科">内科</option>
            <option value="外科">外科</option>
            <option value="儿科">儿科</option>
            <option value="妇科">妇科</option>
          </select>
          
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <Filter size={16} className="mr-2" />
            {t('common.filter')}
          </button>
        </div>
      </div>

      {/* 住院患者列表 */}
      {activeTab === 'inpatients' && (
        <>
          {filteredInpatients.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        患者信息
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        住院信息
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        诊断
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInpatients.map((inpatient) => (
                      <tr key={inpatient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <User size={20} className="text-primary-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{inpatient.patientName}</div>
                              <div className="text-sm text-gray-500">
                                {inpatient.age}岁 • {inpatient.gender} • ID: {inpatient.patientId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {inpatient.ward} {inpatient.bedNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {inpatient.department} • {inpatient.doctor}
                          </div>
                          <div className="text-sm text-gray-500">
                            入院: {inpatient.admissionDate} • 住院: {inpatient.lengthOfStay}天
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {inpatient.diagnosis.join('、')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(inpatient.status)}`}>
                            {getStatusLabel(inpatient.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => {
                                setSelectedInpatient(inpatient);
                                setShowDetailsModal(true);
                              }}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              查看
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedInpatient(inpatient);
                                setShowRoundModal(true);
                              }}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              查房
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedInpatient(inpatient);
                                setShowCareModal(true);
                              }}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              护理
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedInpatient(inpatient);
                                setShowDischargeModal(true);
                              }}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              出院
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <BedDouble size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{t('inpatients.noResults')}</h3>
              <p className="text-gray-500 mb-4">
                {t('inpatients.noResultsDesc')}
              </p>
              <button 
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('all');
                  setSelectedDepartment('');
                }}
              >
                {t('common.clear')}
              </button>
            </div>
          )}
        </>
      )}

      {/* 住院申请列表 */}
      {activeTab === 'admissionRequests' && (
        <>
          {filteredAdmissionRequests.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        患者信息
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        申请信息
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        诊断
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状态
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAdmissionRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <User size={20} className="text-primary-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{request.patientName}</div>
                              <div className="text-sm text-gray-500">
                                {request.age}岁 • {request.gender} • ID: {request.patientId}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {request.department} • {request.doctor}
                          </div>
                          <div className="text-sm text-gray-500">
                            申请日期: {request.requestDate}
                          </div>
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              getUrgencyColor(request.urgency)
                            }`}>
                              {request.urgency === 'urgent' ? '紧急' : '常规'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {request.diagnosis}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                            原因: {request.reason}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAdmissionStatusColor(request.status)}`}>
                            {getAdmissionStatusLabel(request.status)}
                          </span>
                          {request.status === 'rejected' && request.rejectionReason && (
                            <div className="text-xs text-red-500 mt-1">
                              {request.rejectionReason}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {
                                  setSelectedAdmissionRequest(request);
                                  setShowAdmissionRequestModal(true);
                                }}
                                className="text-primary-600 hover:text-primary-900"
                              >
                                审核
                              </button>
                            </div>
                          )}
                          {request.status !== 'pending' && (
                            <div className="text-gray-400">
                              已处理
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <FileText size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">暂无住院申请</h3>
              <p className="text-gray-500 mb-4">
                当前没有待处理的住院申请
              </p>
            </div>
          )}
        </>
      )}

      {/* 模态框 */}
      <AddInpatientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddInpatient}
      />

      {selectedInpatient && (
        <>
          <InpatientDetailsModal
            isOpen={showDetailsModal}
            onClose={() => {
              setShowDetailsModal(false);
              setSelectedInpatient(null);
            }}
            patient={selectedInpatient}
          />

          <DischargeModal
            isOpen={showDischargeModal}
            onClose={() => {
              setShowDischargeModal(false);
              setSelectedInpatient(null);
            }}
            onSubmit={handleDischarge}
            patient={selectedInpatient}
          />

          <InpatientCareModal
            isOpen={showCareModal}
            onClose={() => {
              setShowCareModal(false);
              setSelectedInpatient(null);
            }}
            onSubmit={handleCareUpdate}
            patient={selectedInpatient}
          />

          <WardRoundModal
            isOpen={showRoundModal}
            onClose={() => {
              setShowRoundModal(false);
              setSelectedInpatient(null);
            }}
            onSubmit={handleRoundSubmit}
            patient={selectedInpatient}
            previousRounds={[
              {
                id: "WR-001",
                date: "2025-05-21",
                time: "09:00",
                doctor: "李医生",
                vitalSigns: {
                  temperature: 36.7,
                  bloodPressure: "125/80",
                  heartRate: 72,
                  respiratoryRate: 16
                },
                condition: "患者一般状况良好，无明显不适",
                progress: "血压控制良好，继续观察",
                treatment: "继续原有治疗方案",
                urgencyLevel: "normal"
              }
            ]}
          />

          <DeleteInpatientModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedInpatient(null);
            }}
            onConfirm={handleDeleteInpatient}
            patientName={selectedInpatient.patientName}
          />
        </>
      )}

      {selectedAdmissionRequest && (
        <AdmissionRequestModal
          isOpen={showAdmissionRequestModal}
          onClose={() => {
            setShowAdmissionRequestModal(false);
            setSelectedAdmissionRequest(null);
          }}
          onApprove={handleApproveAdmission}
          onReject={handleRejectAdmission}
          request={selectedAdmissionRequest}
          availableBeds={availableBeds}
        />
      )}
    </div>
  );
};

export default Inpatients;