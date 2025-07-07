import React, { useState } from 'react';
import { 
  Briefcase, 
  Cigarette, 
  Wine, 
  Heart, 
  Utensils, 
  Dumbbell, 
  Moon,
  Plus,
  X,
  Calendar
} from 'lucide-react';

interface SocialHistoryTabProps {
  data: {
    occupation: {
      current: string;
      duration: string;
      exposures: string[];
      previousOccupations: string;
    };
    smoking: {
      status: 'never' | 'current' | 'former';
      type: string[];
      amountPerDay: number;
      startAge: number;
      endAge?: number;
      duration: number;
      packYears?: number;
      quitAttempts?: number;
      quitDesire?: 'none' | 'low' | 'medium' | 'high';
    };
    alcohol: {
      status: 'never' | 'current' | 'former';
      frequency: 'never' | 'occasional' | 'weekly' | 'daily';
      type: string[];
      amountPerWeek: number;
      duration: number;
      lastDrink?: string;
    };
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'separated' | 'other';
    children: number;
    livingArrangement: string;
    education: string;
    diet: {
      type: string;
      restrictions: string[];
      regularMeals: boolean;
      caffeine: boolean;
      caffeineAmount?: string;
    };
    exercise: {
      frequency: 'never' | 'occasional' | 'regular' | 'daily';
      type: string[];
      duration: number;
      intensity: 'light' | 'moderate' | 'vigorous';
    };
    sleep: {
      hoursPerNight: number;
      quality: 'good' | 'fair' | 'poor';
      issues: string[];
    };
    menstrualHistory?: {
      age: number;
      regularity: 'regular' | 'irregular';
      cycle: number;
      flow: 'light' | 'moderate' | 'heavy';
      pain: 'none' | 'mild' | 'moderate' | 'severe';
      lastPeriod: string;
      menopause: boolean;
      menopauseAge?: number;
    };
  };
  onChange: (field: string, value: any) => void;
  patientGender?: string;
}

const SocialHistoryTab: React.FC<SocialHistoryTabProps> = ({ 
  data, 
  onChange,
  patientGender = 'male'
}) => {
  const [newExposure, setNewExposure] = useState('');
  const [newDietRestriction, setNewDietRestriction] = useState('');
  const [newExerciseType, setNewExerciseType] = useState('');
  const [newSleepIssue, setNewSleepIssue] = useState('');
  const [newSmokingType, setNewSmokingType] = useState('');
  const [newAlcoholType, setNewAlcoholType] = useState('');

  // 常见职业暴露
  const commonExposures = [
    '粉尘', '化学品', '噪音', '辐射', '高温', '低温', '重金属', '有机溶剂'
  ];

  // 常见饮食限制
  const commonDietRestrictions = [
    '低盐', '低脂', '低糖', '素食', '无麸质', '无乳糖', '无坚果'
  ];

  // 常见运动类型
  const commonExerciseTypes = [
    '步行', '跑步', '游泳', '骑车', '健身', '瑜伽', '太极', '球类运动'
  ];

  // 常见睡眠问题
  const commonSleepIssues = [
    '入睡困难', '早醒', '睡眠中断', '打鼾', '睡眠呼吸暂停', '白天嗜睡', '噩梦'
  ];

  // 常见烟草类型
  const commonSmokingTypes = [
    '卷烟', '雪茄', '电子烟', '水烟', '烟斗'
  ];

  // 常见酒精类型
  const commonAlcoholTypes = [
    '啤酒', '红酒', '白酒', '洋酒'
  ];

  // 处理职业暴露添加
  const handleAddExposure = () => {
    if (newExposure && !data.occupation.exposures.includes(newExposure)) {
      onChange('occupation', {
        ...data.occupation,
        exposures: [...data.occupation.exposures, newExposure]
      });
      setNewExposure('');
    }
  };

  // 处理饮食限制添加
  const handleAddDietRestriction = () => {
    if (newDietRestriction && !data.diet.restrictions.includes(newDietRestriction)) {
      onChange('diet', {
        ...data.diet,
        restrictions: [...data.diet.restrictions, newDietRestriction]
      });
      setNewDietRestriction('');
    }
  };

  // 处理运动类型添加
  const handleAddExerciseType = () => {
    if (newExerciseType && !data.exercise.type.includes(newExerciseType)) {
      onChange('exercise', {
        ...data.exercise,
        type: [...data.exercise.type, newExerciseType]
      });
      setNewExerciseType('');
    }
  };

  // 处理睡眠问题添加
  const handleAddSleepIssue = () => {
    if (newSleepIssue && !data.sleep.issues.includes(newSleepIssue)) {
      onChange('sleep', {
        ...data.sleep,
        issues: [...data.sleep.issues, newSleepIssue]
      });
      setNewSleepIssue('');
    }
  };

  // 处理烟草类型添加
  const handleAddSmokingType = () => {
    if (newSmokingType && !data.smoking.type.includes(newSmokingType)) {
      onChange('smoking', {
        ...data.smoking,
        type: [...data.smoking.type, newSmokingType]
      });
      setNewSmokingType('');
    }
  };

  // 处理酒精类型添加
  const handleAddAlcoholType = () => {
    if (newAlcoholType && !data.alcohol.type.includes(newAlcoholType)) {
      onChange('alcohol', {
        ...data.alcohol,
        type: [...data.alcohol.type, newAlcoholType]
      });
      setNewAlcoholType('');
    }
  };

  // 计算包年
  const calculatePackYears = () => {
    if (data.smoking.status !== 'never' && data.smoking.amountPerDay > 0 && data.smoking.duration > 0) {
      const packYears = (data.smoking.amountPerDay / 20) * data.smoking.duration;
      onChange('smoking', {
        ...data.smoking,
        packYears: Math.round(packYears * 10) / 10
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 职业史 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Briefcase size={18} className="text-blue-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">职业史</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              当前职业
            </label>
            <input
              type="text"
              value={data.occupation.current}
              onChange={(e) => onChange('occupation', { ...data.occupation, current: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="如：教师、工人、医生等"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              从事时间
            </label>
            <input
              type="text"
              value={data.occupation.duration}
              onChange={(e) => onChange('occupation', { ...data.occupation, duration: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="如：5年、10个月等"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            职业暴露
          </label>
          
          <div className="mb-2">
            <div className="text-xs text-gray-500 mb-1">常见职业暴露（点击添加）：</div>
            <div className="flex flex-wrap gap-1">
              {commonExposures.map(exposure => (
                <button
                  key={exposure}
                  onClick={() => {
                    if (!data.occupation.exposures.includes(exposure)) {
                      onChange('occupation', {
                        ...data.occupation,
                        exposures: [...data.occupation.exposures, exposure]
                      });
                    }
                  }}
                  disabled={data.occupation.exposures.includes(exposure)}
                  className={`px-2 py-1 text-xs rounded-full border ${
                    data.occupation.exposures.includes(exposure)
                      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer'
                  }`}
                >
                  {exposure}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newExposure}
              onChange={(e) => setNewExposure(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddExposure()}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="输入其他职业暴露..."
            />
            <button
              onClick={handleAddExposure}
              className="px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
            >
              添加
            </button>
          </div>
          
          {data.occupation.exposures.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {data.occupation.exposures.map((exposure, index) => (
                <div key={index} className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {exposure}
                  <button
                    onClick={() => onChange('occupation', {
                      ...data.occupation,
                      exposures: data.occupation.exposures.filter((_, i) => i !== index)
                    })}
                    className="ml-1 text-blue-700 hover:text-blue-900"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            既往职业
          </label>
          <textarea
            value={data.occupation.previousOccupations}
            onChange={(e) => onChange('occupation', { ...data.occupation, previousOccupations: e.target.value })}
            rows={2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="请描述既往从事过的职业..."
          />
        </div>
      </div>

      {/* 吸烟史 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Cigarette size={18} className="text-orange-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">吸烟史</h3>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            吸烟状态
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.smoking.status === 'never'}
                onChange={() => onChange('smoking', { ...data.smoking, status: 'never' })}
                className="mr-2 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">从不吸烟</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.smoking.status === 'current'}
                onChange={() => onChange('smoking', { ...data.smoking, status: 'current' })}
                className="mr-2 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">现在吸烟</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.smoking.status === 'former'}
                onChange={() => onChange('smoking', { ...data.smoking, status: 'former' })}
                className="mr-2 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">曾经吸烟</span>
            </label>
          </div>
        </div>

        {data.smoking.status !== 'never' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                烟草类型
              </label>
              
              <div className="mb-2">
                <div className="text-xs text-gray-500 mb-1">常见烟草类型（点击添加）：</div>
                <div className="flex flex-wrap gap-1">
                  {commonSmokingTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        if (!data.smoking.type.includes(type)) {
                          onChange('smoking', {
                            ...data.smoking,
                            type: [...data.smoking.type, type]
                          });
                        }
                      }}
                      disabled={data.smoking.type.includes(type)}
                      className={`px-2 py-1 text-xs rounded-full border ${
                        data.smoking.type.includes(type)
                          ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100 cursor-pointer'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newSmokingType}
                  onChange={(e) => setNewSmokingType(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSmokingType()}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="输入其他烟草类型..."
                />
                <button
                  onClick={handleAddSmokingType}
                  className="px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
                >
                  添加
                </button>
              </div>
              
              {data.smoking.type.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {data.smoking.type.map((type, index) => (
                    <div key={index} className="flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                      {type}
                      <button
                        onClick={() => onChange('smoking', {
                          ...data.smoking,
                          type: data.smoking.type.filter((_, i) => i !== index)
                        })}
                        className="ml-1 text-orange-700 hover:text-orange-900"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  每日吸烟量（支）
                </label>
                <input
                  type="number"
                  min="0"
                  value={data.smoking.amountPerDay}
                  onChange={(e) => onChange('smoking', { 
                    ...data.smoking, 
                    amountPerDay: parseInt(e.target.value) || 0 
                  })}
                  onBlur={calculatePackYears}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  开始年龄
                </label>
                <input
                  type="number"
                  min="0"
                  value={data.smoking.startAge}
                  onChange={(e) => onChange('smoking', { 
                    ...data.smoking, 
                    startAge: parseInt(e.target.value) || 0 
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  吸烟年限
                </label>
                <input
                  type="number"
                  min="0"
                  value={data.smoking.duration}
                  onChange={(e) => onChange('smoking', { 
                    ...data.smoking, 
                    duration: parseInt(e.target.value) || 0 
                  })}
                  onBlur={calculatePackYears}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            {data.smoking.status === 'former' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  戒烟年龄
                </label>
                <input
                  type="number"
                  min="0"
                  value={data.smoking.endAge || ''}
                  onChange={(e) => onChange('smoking', { 
                    ...data.smoking, 
                    endAge: parseInt(e.target.value) || undefined 
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            )}

            {data.smoking.packYears !== undefined && (
              <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="text-sm font-medium text-orange-800">
                  吸烟包年: {data.smoking.packYears} 包年
                </div>
                <div className="text-xs text-orange-700 mt-1">
                  包年 = (每日吸烟支数 / 20) × 吸烟年限
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 饮酒史 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Wine size={18} className="text-red-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">饮酒史</h3>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            饮酒状态
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.alcohol.status === 'never'}
                onChange={() => onChange('alcohol', { ...data.alcohol, status: 'never' })}
                className="mr-2 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">从不饮酒</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.alcohol.status === 'current'}
                onChange={() => onChange('alcohol', { ...data.alcohol, status: 'current' })}
                className="mr-2 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">现在饮酒</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={data.alcohol.status === 'former'}
                onChange={() => onChange('alcohol', { ...data.alcohol, status: 'former' })}
                className="mr-2 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">曾经饮酒</span>
            </label>
          </div>
        </div>

        {data.alcohol.status !== 'never' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                饮酒频率
              </label>
              <select
                value={data.alcohol.frequency}
                onChange={(e) => onChange('alcohol', { 
                  ...data.alcohol, 
                  frequency: e.target.value as 'never' | 'occasional' | 'weekly' | 'daily'
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="never">从不</option>
                <option value="occasional">偶尔（每月少于1次）</option>
                <option value="weekly">每周（每周1-6次）</option>
                <option value="daily">每天</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                酒精类型
              </label>
              
              <div className="mb-2">
                <div className="text-xs text-gray-500 mb-1">常见酒精类型（点击添加）：</div>
                <div className="flex flex-wrap gap-1">
                  {commonAlcoholTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        if (!data.alcohol.type.includes(type)) {
                          onChange('alcohol', {
                            ...data.alcohol,
                            type: [...data.alcohol.type, type]
                          });
                        }
                      }}
                      disabled={data.alcohol.type.includes(type)}
                      className={`px-2 py-1 text-xs rounded-full border ${
                        data.alcohol.type.includes(type)
                          ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newAlcoholType}
                  onChange={(e) => setNewAlcoholType(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddAlcoholType()}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="输入其他酒精类型..."
                />
                <button
                  onClick={handleAddAlcoholType}
                  className="px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
                >
                  添加
                </button>
              </div>
              
              {data.alcohol.type.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {data.alcohol.type.map((type, index) => (
                    <div key={index} className="flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      {type}
                      <button
                        onClick={() => onChange('alcohol', {
                          ...data.alcohol,
                          type: data.alcohol.type.filter((_, i) => i !== index)
                        })}
                        className="ml-1 text-red-700 hover:text-red-900"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  每周饮酒量（次）
                </label>
                <input
                  type="number"
                  min="0"
                  value={data.alcohol.amountPerWeek}
                  onChange={(e) => onChange('alcohol', { 
                    ...data.alcohol, 
                    amountPerWeek: parseInt(e.target.value) || 0 
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  饮酒年限
                </label>
                <input
                  type="number"
                  min="0"
                  value={data.alcohol.duration}
                  onChange={(e) => onChange('alcohol', { 
                    ...data.alcohol, 
                    duration: parseInt(e.target.value) || 0 
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            {data.alcohol.status === 'former' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  最后一次饮酒时间
                </label>
                <input
                  type="date"
                  value={data.alcohol.lastDrink || ''}
                  onChange={(e) => onChange('alcohol', { 
                    ...data.alcohol, 
                    lastDrink: e.target.value 
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* 婚育史 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Heart size={18} className="text-pink-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">婚育史</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              婚姻状况
            </label>
            <select
              value={data.maritalStatus}
              onChange={(e) => onChange('maritalStatus', e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="single">未婚</option>
              <option value="married">已婚</option>
              <option value="divorced">离婚</option>
              <option value="widowed">丧偶</option>
              <option value="separated">分居</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              子女数量
            </label>
            <input
              type="number"
              min="0"
              value={data.children}
              onChange={(e) => onChange('children', parseInt(e.target.value) || 0)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              居住情况
            </label>
            <input
              type="text"
              value={data.livingArrangement}
              onChange={(e) => onChange('livingArrangement', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="如：与配偶同住、独居等"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              教育程度
            </label>
            <select
              value={data.education}
              onChange={(e) => onChange('education', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="">请选择</option>
              <option value="小学">小学</option>
              <option value="初中">初中</option>
              <option value="高中">高中</option>
              <option value="大专">大专</option>
              <option value="本科">本科</option>
              <option value="研究生">研究生</option>
              <option value="博士">博士</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>
      </div>

      {/* 月经史（仅女性） */}
      {patientGender === 'female' && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <Calendar size={18} className="text-pink-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">月经史</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                初潮年龄
              </label>
              <input
                type="number"
                min="0"
                value={data.menstrualHistory?.age || ''}
                onChange={(e) => onChange('menstrualHistory', { 
                  ...data.menstrualHistory || {},
                  age: parseInt(e.target.value) || 0 
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                规律性
              </label>
              <select
                value={data.menstrualHistory?.regularity || 'regular'}
                onChange={(e) => onChange('menstrualHistory', { 
                  ...data.menstrualHistory || {},
                  regularity: e.target.value as 'regular' | 'irregular'
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="regular">规律</option>
                <option value="irregular">不规律</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                周期（天）
              </label>
              <input
                type="number"
                min="0"
                value={data.menstrualHistory?.cycle || ''}
                onChange={(e) => onChange('menstrualHistory', { 
                  ...data.menstrualHistory || {},
                  cycle: parseInt(e.target.value) || 0 
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                经量
              </label>
              <select
                value={data.menstrualHistory?.flow || 'moderate'}
                onChange={(e) => onChange('menstrualHistory', { 
                  ...data.menstrualHistory || {},
                  flow: e.target.value as 'light' | 'moderate' | 'heavy'
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="light">少</option>
                <option value="moderate">中等</option>
                <option value="heavy">多</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                痛经程度
              </label>
              <select
                value={data.menstrualHistory?.pain || 'none'}
                onChange={(e) => onChange('menstrualHistory', { 
                  ...data.menstrualHistory || {},
                  pain: e.target.value as 'none' | 'mild' | 'moderate' | 'severe'
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              >
                <option value="none">无</option>
                <option value="mild">轻度</option>
                <option value="moderate">中度</option>
                <option value="severe">重度</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                末次月经
              </label>
              <input
                type="date"
                value={data.menstrualHistory?.lastPeriod || ''}
                onChange={(e) => onChange('menstrualHistory', { 
                  ...data.menstrualHistory || {},
                  lastPeriod: e.target.value 
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.menstrualHistory?.menopause || false}
                onChange={(e) => onChange('menstrualHistory', { 
                  ...data.menstrualHistory || {},
                  menopause: e.target.checked 
                })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
              />
              <span className="text-sm">已绝经</span>
            </label>
          </div>

          {data.menstrualHistory?.menopause && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                绝经年龄
              </label>
              <input
                type="number"
                min="0"
                value={data.menstrualHistory?.menopauseAge || ''}
                onChange={(e) => onChange('menstrualHistory', { 
                  ...data.menstrualHistory || {},
                  menopauseAge: parseInt(e.target.value) || undefined 
                })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          )}
        </div>
      )}

      {/* 饮食习惯 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Utensils size={18} className="text-green-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">饮食习惯</h3>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            饮食类型
          </label>
          <select
            value={data.diet.type}
            onChange={(e) => onChange('diet', { ...data.diet, type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="">请选择</option>
            <option value="普通饮食">普通饮食</option>
            <option value="素食">素食</option>
            <option value="低盐饮食">低盐饮食</option>
            <option value="低脂饮食">低脂饮食</option>
            <option value="低糖饮食">低糖饮食</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            饮食限制
          </label>
          
          <div className="mb-2">
            <div className="text-xs text-gray-500 mb-1">常见饮食限制（点击添加）：</div>
            <div className="flex flex-wrap gap-1">
              {commonDietRestrictions.map(restriction => (
                <button
                  key={restriction}
                  onClick={() => {
                    if (!data.diet.restrictions.includes(restriction)) {
                      onChange('diet', {
                        ...data.diet,
                        restrictions: [...data.diet.restrictions, restriction]
                      });
                    }
                  }}
                  disabled={data.diet.restrictions.includes(restriction)}
                  className={`px-2 py-1 text-xs rounded-full border ${
                    data.diet.restrictions.includes(restriction)
                      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer'
                  }`}
                >
                  {restriction}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newDietRestriction}
              onChange={(e) => setNewDietRestriction(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddDietRestriction()}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="输入其他饮食限制..."
            />
            <button
              onClick={handleAddDietRestriction}
              className="px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
            >
              添加
            </button>
          </div>
          
          {data.diet.restrictions.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {data.diet.restrictions.map((restriction, index) => (
                <div key={index} className="flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  {restriction}
                  <button
                    onClick={() => onChange('diet', {
                      ...data.diet,
                      restrictions: data.diet.restrictions.filter((_, i) => i !== index)
                    })}
                    className="ml-1 text-green-700 hover:text-green-900"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.diet.regularMeals}
              onChange={(e) => onChange('diet', { ...data.diet, regularMeals: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
            />
            <span className="text-sm">规律进餐</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={data.diet.caffeine}
              onChange={(e) => onChange('diet', { ...data.diet, caffeine: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 mr-2"
            />
            <span className="text-sm">摄入咖啡因</span>
          </label>
        </div>

        {data.diet.caffeine && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              咖啡因摄入量
            </label>
            <input
              type="text"
              value={data.diet.caffeineAmount || ''}
              onChange={(e) => onChange('diet', { ...data.diet, caffeineAmount: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="如：每天2杯咖啡"
            />
          </div>
        )}
      </div>

      {/* 运动习惯 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Dumbbell size={18} className="text-blue-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">运动习惯</h3>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            运动频率
          </label>
          <select
            value={data.exercise.frequency}
            onChange={(e) => onChange('exercise', { 
              ...data.exercise, 
              frequency: e.target.value as 'never' | 'occasional' | 'regular' | 'daily'
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
          >
            <option value="never">从不</option>
            <option value="occasional">偶尔（每月少于4次）</option>
            <option value="regular">规律（每周1-4次）</option>
            <option value="daily">每天</option>
          </select>
        </div>

        {data.exercise.frequency !== 'never' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                运动类型
              </label>
              
              <div className="mb-2">
                <div className="text-xs text-gray-500 mb-1">常见运动类型（点击添加）：</div>
                <div className="flex flex-wrap gap-1">
                  {commonExerciseTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        if (!data.exercise.type.includes(type)) {
                          onChange('exercise', {
                            ...data.exercise,
                            type: [...data.exercise.type, type]
                          });
                        }
                      }}
                      disabled={data.exercise.type.includes(type)}
                      className={`px-2 py-1 text-xs rounded-full border ${
                        data.exercise.type.includes(type)
                          ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newExerciseType}
                  onChange={(e) => setNewExerciseType(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddExerciseType()}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="输入其他运动类型..."
                />
                <button
                  onClick={handleAddExerciseType}
                  className="px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
                >
                  添加
                </button>
              </div>
              
              {data.exercise.type.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {data.exercise.type.map((type, index) => (
                    <div key={index} className="flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {type}
                      <button
                        onClick={() => onChange('exercise', {
                          ...data.exercise,
                          type: data.exercise.type.filter((_, i) => i !== index)
                        })}
                        className="ml-1 text-blue-700 hover:text-blue-900"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  每次运动时长（分钟）
                </label>
                <input
                  type="number"
                  min="0"
                  value={data.exercise.duration}
                  onChange={(e) => onChange('exercise', { 
                    ...data.exercise, 
                    duration: parseInt(e.target.value) || 0 
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  运动强度
                </label>
                <select
                  value={data.exercise.intensity}
                  onChange={(e) => onChange('exercise', { 
                    ...data.exercise, 
                    intensity: e.target.value as 'light' | 'moderate' | 'vigorous'
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="light">轻度（散步、慢骑车）</option>
                  <option value="moderate">中度（快走、慢跑）</option>
                  <option value="vigorous">剧烈（跑步、游泳）</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 睡眠习惯 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <Moon size={18} className="text-indigo-600 mr-2" />
          <h3 className="text-lg font-medium text-gray-800">睡眠习惯</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              每晚睡眠时间（小时）
            </label>
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={data.sleep.hoursPerNight}
              onChange={(e) => onChange('sleep', { 
                ...data.sleep, 
                hoursPerNight: parseFloat(e.target.value) || 0 
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              睡眠质量
            </label>
            <select
              value={data.sleep.quality}
              onChange={(e) => onChange('sleep', { 
                ...data.sleep, 
                quality: e.target.value as 'good' | 'fair' | 'poor'
              })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="good">良好</option>
              <option value="fair">一般</option>
              <option value="poor">较差</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            睡眠问题
          </label>
          
          <div className="mb-2">
            <div className="text-xs text-gray-500 mb-1">常见睡眠问题（点击添加）：</div>
            <div className="flex flex-wrap gap-1">
              {commonSleepIssues.map(issue => (
                <button
                  key={issue}
                  onClick={() => {
                    if (!data.sleep.issues.includes(issue)) {
                      onChange('sleep', {
                        ...data.sleep,
                        issues: [...data.sleep.issues, issue]
                      });
                    }
                  }}
                  disabled={data.sleep.issues.includes(issue)}
                  className={`px-2 py-1 text-xs rounded-full border ${
                    data.sleep.issues.includes(issue)
                      ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 cursor-pointer'
                  }`}
                >
                  {issue}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={newSleepIssue}
              onChange={(e) => setNewSleepIssue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSleepIssue()}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500"
              placeholder="输入其他睡眠问题..."
            />
            <button
              onClick={handleAddSleepIssue}
              className="px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
            >
              添加
            </button>
          </div>
          
          {data.sleep.issues.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {data.sleep.issues.map((issue, index) => (
                <div key={index} className="flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                  {issue}
                  <button
                    onClick={() => onChange('sleep', {
                      ...data.sleep,
                      issues: data.sleep.issues.filter((_, i) => i !== index)
                    })}
                    className="ml-1 text-indigo-700 hover:text-indigo-900"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialHistoryTab;