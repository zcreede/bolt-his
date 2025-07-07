import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Save, FileText, User, Calendar, Clock, Stethoscope, Heart, Activity, Brain, Pill, FlaskConical, Clipboard, CheckCircle, AlertTriangle, Download, Print, Share2 } from 'lucide-react';
import RichTextEditor from '../Consultation/RichTextEditor';

type RecordType = 'admission' | 'progress' | 'nursing' | 'operation' | 'discharge';

interface InpatientMedicalRecordProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  patientInfo: {
    id: string;
    name: string;
    age: number;
    gender: string;
    admissionDate: string;
    diagnosis: string[];
    doctor: string;
    department: string;
  };
  recordType?: RecordType;
  initialData?: any;
}

const InpatientMedicalRecord: React.FC<InpatientMedicalRecordProps> = ({
  isOpen,
  onClose,
  onSave,
  patientInfo,
  recordType = 'admission',
  initialData
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'basic' | 'history' | 'examination' | 'diagnosis' | 'treatment' | 'summary'>('basic');
  const [formData, setFormData] = useState({
    // 基本信息
    recordType: recordType,
    recordDate: new Date().toISOString().split('T')[0],
    recordTime: new Date().toLocaleTimeString().slice(0, 5),
    recordDoctor: '当前医生',
    
    // 病史
    chiefComplaint: initialData?.chiefComplaint || '',
    presentIllness: initialData?.presentIllness || '',
    pastHistory: initialData?.pastHistory || '',
    allergyHistory: initialData?.allergyHistory || '',
    personalHistory: initialData?.personalHistory || '',
    familyHistory: initialData?.familyHistory || '',
    
    // 体格检查
    vitalSigns: initialData?.vitalSigns || {
      temperature: 36.5,
      bloodPressure: '120/80',
      heartRate: 75,
      respiratoryRate: 16,
      oxygenSaturation: 98
    },
    generalAppearance: initialData?.generalAppearance || '',
    consciousness: initialData?.consciousness || 'alert',
    skinAndMucosa: initialData?.skinAndMucosa || '',
    head: initialData?.head || '',
    neck: initialData?.neck || '',
    chest: initialData?.chest || '',
    heart: initialData?.heart || '',
    abdomen: initialData?.abdomen || '',
    extremities: initialData?.extremities || '',
    neurologicalExam: initialData?.neurologicalExam || '',
    
    // 诊断
    admissionDiagnosis: initialData?.admissionDiagnosis || patientInfo.diagnosis.join('\n'),
    differentialDiagnosis: initialData?.differentialDiagnosis || '',
    
    // 治疗计划
    treatmentPlan: initialData?.treatmentPlan || '',
    medications: initialData?.medications || [],
    labTests: initialData?.labTests || [],
    imagingStudies: initialData?.imagingStudies || [],
    specialProcedures: initialData?.specialProcedures || [],
    dietaryInstructions: initialData?.dietaryInstructions || '',
    activityInstructions: initialData?.activityInstructions || '',
    nursingInstructions: initialData?.nursingInstructions || '',
    
    // 出院记录特有字段
    dischargeDiagnosis: initialData?.dischargeDiagnosis || '',
    hospitalCourse: initialData?.hospitalCourse || '',
    dischargeCondition: initialData?.dischargeCondition || '',
    dischargeMedications: initialData?.dischargeMedications || [],
    followUpInstructions: initialData?.followUpInstructions || '',
    
    // 手术记录特有字段
    operationName: initialData?.operationName || '',
    operationDate: initialData?.operationDate || '',
    surgeons: initialData?.surgeons || '',
    anesthesia: initialData?.anesthesia || '',
    preOpDiagnosis: initialData?.preOpDiagnosis || '',
    postOpDiagnosis: initialData?.postOpDiagnosis || '',
    operationFindings: initialData?.operationFindings || '',
    operationProcedure: initialData?.operationProcedure || '',
    estimatedBloodLoss: initialData?.estimatedBloodLoss || '',
    specimens: initialData?.specimens || '',
    complications: initialData?.complications || '',
    postOpPlan: initialData?.postOpPlan || ''
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    onSave(formData);
    setHasUnsavedChanges(false);
  };

  const getRecordTypeName = (type: RecordType) => {
    const types = {
      admission: '入院记录',
      progress: '病程记录',
      nursing: '护理记录',
      operation: '手术记录',
      discharge: '出院记录'
    };
    return types[type] || '病历记录';
  };

  const renderBasicInfoTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
          <FileText size={16} className="mr-2 text-primary-600" />
          病历基本信息
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              病历类型
            </label>
            <select
              value={formData.recordType}
              onChange={(e) => handleChange('recordType', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="admission">入院记录</option>
              <option value="progress">病程记录</option>
              <option value="nursing">护理记录</option>
              <option value="operation">手术记录</option>
              <option value="discharge">出院记录</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              记录医生
            </label>
            <input
              type="text"
              value={formData.recordDoctor}
              onChange={(e) => handleChange('recordDoctor', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              记录日期
            </label>
            <input
              type="date"
              value={formData.recordDate}
              onChange={(e) => handleChange('recordDate', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              记录时间
            </label>
            <input
              type="time"
              value={formData.recordTime}
              onChange={(e) => handleChange('recordTime', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
          <User size={16} className="mr-2 text-primary-600" />
          患者基本信息
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              患者姓名
            </label>
            <p className="text-sm font-medium">{patientInfo.name}</p>
          </div>
          
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              患者ID
            </label>
            <p className="text-sm font-medium">{patientInfo.id}</p>
          </div>
          
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              年龄
            </label>
            <p className="text-sm font-medium">{patientInfo.age}岁</p>
          </div>
          
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              性别
            </label>
            <p className="text-sm font-medium">{patientInfo.gender}</p>
          </div>
          
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              入院日期
            </label>
            <p className="text-sm font-medium">{patientInfo.admissionDate}</p>
          </div>
          
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              科室/医生
            </label>
            <p className="text-sm font-medium">{patientInfo.department} / {patientInfo.doctor}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
          <Clipboard size={16} className="mr-2 text-primary-600" />
          主诉
        </h3>
        
        <textarea
          value={formData.chiefComplaint}
          onChange={(e) => handleChange('chiefComplaint', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="请输入患者主诉..."
        />
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">现病史</h3>
        <RichTextEditor
          value={formData.presentIllness}
          onChange={(value) => handleChange('presentIllness', value)}
          placeholder="请详细描述患者本次发病的时间、诱因、主要症状、病情发展过程、诊治经过等..."
          height="200px"
        />
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">既往史</h3>
        <RichTextEditor
          value={formData.pastHistory}
          onChange={(value) => handleChange('pastHistory', value)}
          placeholder="请记录患者既往疾病史、手术史、外伤史、输血史、过敏史等..."
          height="150px"
        />
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">过敏史</h3>
        <textarea
          value={formData.allergyHistory}
          onChange={(e) => handleChange('allergyHistory', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="请记录患者的过敏史，包括药物过敏、食物过敏等..."
        />
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">个人史</h3>
        <textarea
          value={formData.personalHistory}
          onChange={(e) => handleChange('personalHistory', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="请记录患者的个人生活史，包括婚育史、月经史、生活习惯等..."
        />
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">家族史</h3>
        <textarea
          value={formData.familyHistory}
          onChange={(e) => handleChange('familyHistory', e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="请记录患者家族中的遗传性疾病、传染性疾病等相关病史..."
        />
      </div>
    </div>
  );

  const renderExaminationTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
          <Activity size={16} className="mr-2 text-red-600" />
          生命体征
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              体温 (°C)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.vitalSigns.temperature}
              onChange={(e) => handleNestedChange('vitalSigns', 'temperature', parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              血压 (mmHg)
            </label>
            <input
              type="text"
              value={formData.vitalSigns.bloodPressure}
              onChange={(e) => handleNestedChange('vitalSigns', 'bloodPressure', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="如：120/80"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              心率 (次/分)
            </label>
            <input
              type="number"
              value={formData.vitalSigns.heartRate}
              onChange={(e) => handleNestedChange('vitalSigns', 'heartRate', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              呼吸 (次/分)
            </label>
            <input
              type="number"
              value={formData.vitalSigns.respiratoryRate}
              onChange={(e) => handleNestedChange('vitalSigns', 'respiratoryRate', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              血氧饱和度 (%)
            </label>
            <input
              type="number"
              value={formData.vitalSigns.oxygenSaturation}
              onChange={(e) => handleNestedChange('vitalSigns', 'oxygenSaturation', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">一般情况</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              一般外观
            </label>
            <textarea
              value={formData.generalAppearance}
              onChange={(e) => handleChange('generalAppearance', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="描述患者的一般外观、营养状态、发育状态等..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              意识状态
            </label>
            <select
              value={formData.consciousness}
              onChange={(e) => handleChange('consciousness', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="alert">清醒</option>
              <option value="lethargic">嗜睡</option>
              <option value="obtunded">迟钝</option>
              <option value="stuporous">昏睡</option>
              <option value="comatose">昏迷</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              皮肤和粘膜
            </label>
            <textarea
              value={formData.skinAndMucosa}
              onChange={(e) => handleChange('skinAndMucosa', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="描述皮肤颜色、湿度、弹性、粘膜情况等..."
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">系统检查</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              头部
            </label>
            <textarea
              value={formData.head}
              onChange={(e) => handleChange('head', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="描述头部检查情况..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              颈部
            </label>
            <textarea
              value={formData.neck}
              onChange={(e) => handleChange('neck', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="描述颈部检查情况..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              胸部
            </label>
            <textarea
              value={formData.chest}
              onChange={(e) => handleChange('chest', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="描述胸部检查情况，包括肺部听诊等..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              心脏
            </label>
            <textarea
              value={formData.heart}
              onChange={(e) => handleChange('heart', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="描述心脏检查情况，包括心率、心律、心音等..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              腹部
            </label>
            <textarea
              value={formData.abdomen}
              onChange={(e) => handleChange('abdomen', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="描述腹部检查情况，包括触诊、叩诊、听诊等..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              四肢
            </label>
            <textarea
              value={formData.extremities}
              onChange={(e) => handleChange('extremities', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="描述四肢检查情况，包括活动度、肌力、水肿等..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              神经系统
            </label>
            <textarea
              value={formData.neurologicalExam}
              onChange={(e) => handleChange('neurologicalExam', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="描述神经系统检查情况，包括意识、反射、感觉、运动等..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiagnosisTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">入院诊断</h3>
        <textarea
          value={formData.admissionDiagnosis}
          onChange={(e) => handleChange('admissionDiagnosis', e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="请输入入院诊断..."
        />
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">鉴别诊断</h3>
        <textarea
          value={formData.differentialDiagnosis}
          onChange={(e) => handleChange('differentialDiagnosis', e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          placeholder="请输入需要鉴别的诊断..."
        />
      </div>
      
      {formData.recordType === 'discharge' && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-md font-semibold text-gray-800 mb-4">出院诊断</h3>
          <textarea
            value={formData.dischargeDiagnosis}
            onChange={(e) => handleChange('dischargeDiagnosis', e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="请输入出院诊断..."
          />
        </div>
      )}
      
      {formData.recordType === 'operation' && (
        <>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-md font-semibold text-gray-800 mb-4">术前诊断</h3>
            <textarea
              value={formData.preOpDiagnosis}
              onChange={(e) => handleChange('preOpDiagnosis', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="请输入术前诊断..."
            />
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-md font-semibold text-gray-800 mb-4">术后诊断</h3>
            <textarea
              value={formData.postOpDiagnosis}
              onChange={(e) => handleChange('postOpDiagnosis', e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="请输入术后诊断..."
            />
          </div>
        </>
      )}
    </div>
  );

  const renderTreatmentTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">治疗计划</h3>
        <RichTextEditor
          value={formData.treatmentPlan}
          onChange={(value) => handleChange('treatmentPlan', value)}
          placeholder="请详细描述患者的治疗计划..."
          height="200px"
        />
      </div>
      
      {formData.recordType === 'operation' && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-md font-semibold text-gray-800 mb-4">手术信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手术名称
              </label>
              <input
                type="text"
                value={formData.operationName}
                onChange={(e) => handleChange('operationName', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手术日期
              </label>
              <input
                type="date"
                value={formData.operationDate}
                onChange={(e) => handleChange('operationDate', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手术医师
              </label>
              <input
                type="text"
                value={formData.surgeons}
                onChange={(e) => handleChange('surgeons', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                麻醉方式
              </label>
              <input
                type="text"
                value={formData.anesthesia}
                onChange={(e) => handleChange('anesthesia', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手术所见
              </label>
              <textarea
                value={formData.operationFindings}
                onChange={(e) => handleChange('operationFindings', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="描述手术中的发现..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手术经过
              </label>
              <textarea
                value={formData.operationProcedure}
                onChange={(e) => handleChange('operationProcedure', e.target.value)}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="详细描述手术过程..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  估计失血量
                </label>
                <input
                  type="text"
                  value={formData.estimatedBloodLoss}
                  onChange={(e) => handleChange('estimatedBloodLoss', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="如：100ml"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  手术标本
                </label>
                <input
                  type="text"
                  value={formData.specimens}
                  onChange={(e) => handleChange('specimens', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手术并发症
              </label>
              <textarea
                value={formData.complications}
                onChange={(e) => handleChange('complications', e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="描述手术中出现的并发症，如无则填"无"..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                术后计划
              </label>
              <textarea
                value={formData.postOpPlan}
                onChange={(e) => handleChange('postOpPlan', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="描述术后治疗和护理计划..."
              />
            </div>
          </div>
        </div>
      )}
      
      {formData.recordType === 'discharge' && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-md font-semibold text-gray-800 mb-4">住院经过</h3>
          <RichTextEditor
            value={formData.hospitalCourse}
            onChange={(value) => handleChange('hospitalCourse', value)}
            placeholder="请详细描述患者住院期间的病情变化、治疗经过和效果..."
            height="200px"
          />
        </div>
      )}
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
          <Pill size={16} className="mr-2 text-green-600" />
          用药医嘱
        </h3>
        
        <div className="space-y-4">
          {formData.medications.map((medication, index) => (
            <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
              <div>
                <div className="font-medium text-gray-800">{medication.name}</div>
                <div className="text-sm text-gray-600">
                  {medication.dosage} • {medication.frequency} • {medication.route} • {medication.duration}
                </div>
              </div>
              <button
                onClick={() => {
                  const newMedications = [...formData.medications];
                  newMedications.splice(index, 1);
                  handleChange('medications', newMedications);
                }}
                className="text-red-600 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          
          <button
            onClick={() => {
              handleChange('medications', [
                ...formData.medications,
                { name: '', dosage: '', frequency: '', route: '', duration: '' }
              ]);
            }}
            className="w-full py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50"
          >
            + 添加用药
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4 flex items-center">
          <FlaskConical size={16} className="mr-2 text-purple-600" />
          检查检验
        </h3>
        
        <div className="space-y-4">
          {formData.labTests.map((test, index) => (
            <div key={index} className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div>
                <div className="font-medium text-gray-800">{test.name}</div>
                <div className="text-sm text-gray-600">
                  {test.date} • {test.status}
                </div>
              </div>
              <button
                onClick={() => {
                  const newTests = [...formData.labTests];
                  newTests.splice(index, 1);
                  handleChange('labTests', newTests);
                }}
                className="text-red-600 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          
          <button
            onClick={() => {
              handleChange('labTests', [
                ...formData.labTests,
                { name: '', date: new Date().toISOString().split('T')[0], status: 'pending' }
              ]);
            }}
            className="w-full py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50"
          >
            + 添加检查检验
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">其他医嘱</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              饮食医嘱
            </label>
            <textarea
              value={formData.dietaryInstructions}
              onChange={(e) => handleChange('dietaryInstructions', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="请输入饮食医嘱..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              活动医嘱
            </label>
            <textarea
              value={formData.activityInstructions}
              onChange={(e) => handleChange('activityInstructions', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="请输入活动医嘱..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              护理医嘱
            </label>
            <textarea
              value={formData.nursingInstructions}
              onChange={(e) => handleChange('nursingInstructions', e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="请输入护理医嘱..."
            />
          </div>
        </div>
      </div>
      
      {formData.recordType === 'discharge' && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-md font-semibold text-gray-800 mb-4">出院情况</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                出院情况
              </label>
              <select
                value={formData.dischargeCondition}
                onChange={(e) => handleChange('dischargeCondition', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="">选择出院情况</option>
                <option value="cured">治愈</option>
                <option value="improved">好转</option>
                <option value="unchanged">未愈</option>
                <option value="worse">恶化</option>
                <option value="death">死亡</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                出院用药
              </label>
              <div className="space-y-2">
                {formData.dischargeMedications.map((medication, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                    <div>
                      <div className="font-medium text-gray-800">{medication.name}</div>
                      <div className="text-sm text-gray-600">
                        {medication.dosage} • {medication.frequency} • {medication.route} • {medication.duration}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newMedications = [...formData.dischargeMedications];
                        newMedications.splice(index, 1);
                        handleChange('dischargeMedications', newMedications);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={() => {
                    handleChange('dischargeMedications', [
                      ...formData.dischargeMedications,
                      { name: '', dosage: '', frequency: '', route: '', duration: '' }
                    ]);
                  }}
                  className="w-full py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50"
                >
                  + 添加出院用药
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                随访计划
              </label>
              <textarea
                value={formData.followUpInstructions}
                onChange={(e) => handleChange('followUpInstructions', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="请输入随访计划，包括随访时间、方式、内容等..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSummaryTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-md font-semibold text-gray-800 mb-4">病历摘要</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">基本信息</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-gray-500">姓名：</span>{patientInfo.name}</div>
              <div><span className="text-gray-500">ID：</span>{patientInfo.id}</div>
              <div><span className="text-gray-500">年龄：</span>{patientInfo.age}岁</div>
              <div><span className="text-gray-500">性别：</span>{patientInfo.gender}</div>
              <div><span className="text-gray-500">入院日期：</span>{patientInfo.admissionDate}</div>
              <div><span className="text-gray-500">科室/医生：</span>{patientInfo.department} / {patientInfo.doctor}</div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">主诉</h4>
            <p className="text-sm">{formData.chiefComplaint || '未记录'}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">诊断</h4>
            <div className="whitespace-pre-line text-sm">{formData.admissionDiagnosis || '未记录'}</div>
          </div>
          
          {formData.recordType === 'discharge' && (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">出院诊断</h4>
                <div className="whitespace-pre-line text-sm">{formData.dischargeDiagnosis || '未记录'}</div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">住院经过</h4>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: formData.hospitalCourse || '未记录' }} />
              </div>
            </>
          )}
          
          {formData.recordType === 'operation' && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">手术信息</h4>
              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                <div><span className="text-gray-500">手术名称：</span>{formData.operationName || '未记录'}</div>
                <div><span className="text-gray-500">手术日期：</span>{formData.operationDate || '未记录'}</div>
                <div><span className="text-gray-500">手术医师：</span>{formData.surgeons || '未记录'}</div>
                <div><span className="text-gray-500">麻醉方式：</span>{formData.anesthesia || '未记录'}</div>
              </div>
              <div className="text-sm"><span className="text-gray-500">手术经过：</span></div>
              <div className="whitespace-pre-line text-sm mt-1">{formData.operationProcedure || '未记录'}</div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">治疗计划</h4>
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: formData.treatmentPlan || '未记录' }} />
          </div>
          
          {formData.medications.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">用药医嘱</h4>
              <div className="space-y-2">
                {formData.medications.map((medication, index) => (
                  <div key={index} className="text-sm">
                    {medication.name} {medication.dosage} {medication.frequency} {medication.route} {medication.duration}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {getRecordTypeName(formData.recordType as RecordType)}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              患者：{patientInfo.name} • {patientInfo.age}岁 • {patientInfo.gender}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
                hasUnsavedChanges 
                  ? 'text-white bg-primary-600 hover:bg-primary-700' 
                  : 'text-gray-400 bg-gray-200 cursor-not-allowed'
              }`}
            >
              <Save size={16} className="mr-1" />
              保存
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'basic'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText size={16} className="inline mr-2" />
            基本信息
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'history'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={16} className="inline mr-2" />
            病史
          </button>
          <button
            onClick={() => setActiveTab('examination')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'examination'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Stethoscope size={16} className="inline mr-2" />
            体格检查
          </button>
          <button
            onClick={() => setActiveTab('diagnosis')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'diagnosis'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <AlertTriangle size={16} className="inline mr-2" />
            诊断
          </button>
          <button
            onClick={() => setActiveTab('treatment')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'treatment'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Pill size={16} className="inline mr-2" />
            治疗计划
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'summary'
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CheckCircle size={16} className="inline mr-2" />
            摘要
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === 'basic' && renderBasicInfoTab()}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'examination' && renderExaminationTab()}
          {activeTab === 'diagnosis' && renderDiagnosisTab()}
          {activeTab === 'treatment' && renderTreatmentTab()}
          {activeTab === 'summary' && renderSummaryTab()}
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 flex items-center">
              <Print size={16} className="mr-1" />
              打印
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 flex items-center">
              <Download size={16} className="mr-1" />
              导出
            </button>
            <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 flex items-center">
              <Share2 size={16} className="mr-1" />
              分享
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            最后更新: {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InpatientMedicalRecord;