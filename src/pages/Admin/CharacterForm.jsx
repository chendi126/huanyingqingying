import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CharacterForm.css';

export default function CharacterForm({ character, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    thumbnail: '',
    image: '',
    description: '',
    videoUrl: '',
    achievements: []
  });

  const [achievementInput, setAchievementInput] = useState('');
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // 初始化表单数据
  useEffect(() => {
    if (character) {
      setFormData(character);
    }
  }, [character]);

  // 验证表单
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '姓名不能为空';
    }
    if (!formData.title.trim()) {
      newErrors.title = '职位不能为空';
    }
    if (!formData.description.trim()) {
      newErrors.description = '介绍不能为空';
    }
    if (!formData.thumbnail.trim()) {
      newErrors.thumbnail = '缩略图URL不能为空';
    }
    if (!formData.image.trim()) {
      newErrors.image = '详情图URL不能为空';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除该字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 处理成就添加
  const handleAddAchievement = () => {
    if (achievementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()]
      }));
      setAchievementInput('');
    }
  };

  // 处理成就删除
  const handleRemoveAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  // 处理提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // 模拟保存延迟
      onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="character-form-container">
      <div className="form-header">
        <h2>{character ? '编辑人物' : '添加新人物'}</h2>
        <Link to="/admin" className="close-btn">✕</Link>
      </div>

      <form onSubmit={handleSubmit} className="character-form">
        {/* 基本信息 */}
        <fieldset>
          <legend>基本信息</legend>
          
          <div className="form-group">
            <label htmlFor="name">姓名 *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="输入人物姓名"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="title">职位/身份 *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="输入职位或身份"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
        </fieldset>

        {/* 媒体信息 */}
        <fieldset>
          <legend>媒体信息</legend>
          
          <div className="form-group">
            <label htmlFor="thumbnail">缩略图URL *</label>
            <input
              id="thumbnail"
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="输入缩略图URL"
              className={errors.thumbnail ? 'error' : ''}
            />
            {errors.thumbnail && <span className="error-message">{errors.thumbnail}</span>}
            {formData.thumbnail && (
              <div className="preview">
                <img src={formData.thumbnail} alt="缩略图预览" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">详情页图片URL *</label>
            <input
              id="image"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="输入详情页图片URL"
              className={errors.image ? 'error' : ''}
            />
            {errors.image && <span className="error-message">{errors.image}</span>}
            {formData.image && (
              <div className="preview">
                <img src={formData.image} alt="详情图预览" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="videoUrl">视频URL</label>
            <input
              id="videoUrl"
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="输入视频URL（本地或外部链接）"
            />
            <small>支持本地视频（/video.mp4）或外部链接（YouTube等）</small>
          </div>
        </fieldset>

        {/* 描述 */}
        <fieldset>
          <legend>介绍</legend>
          
          <div className="form-group">
            <label htmlFor="description">详细介绍 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="输入人物详细介绍（支持多段落，用空行分隔）"
              rows="8"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
            <small>提示：用空行分隔段落，会自动格式化显示</small>
          </div>
        </fieldset>

        {/* 成就 */}
        <fieldset>
          <legend>主要成就</legend>
          
          <div className="form-group">
            <label htmlFor="achievementInput">添加成就</label>
            <div className="achievement-input">
              <input
                id="achievementInput"
                type="text"
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddAchievement();
                  }
                }}
                placeholder="输入成就内容，按Enter添加"
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="btn-add"
              >
                添加
              </button>
            </div>
          </div>

          {formData.achievements.length > 0 && (
            <div className="achievements-list">
              <h4>已添加的成就：</h4>
              <ul>
                {formData.achievements.map((achievement, index) => (
                  <li key={index}>
                    <span>{achievement}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(index)}
                      className="btn-remove"
                    >
                      删除
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </fieldset>

        {/* 操作按钮 */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? '保存中...' : '保存'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={saving}
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}

