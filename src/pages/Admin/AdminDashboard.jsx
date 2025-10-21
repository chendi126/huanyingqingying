import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCharacters } from '../../hooks/useCharacters';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { characters, loading, error, deleteCharacter, resetToDefault, exportData, importData, clearError } = useCharacters();
  const [showImportInput, setShowImportInput] = useState(false);
  const [importText, setImportText] = useState('');

  const handleDelete = (id, name) => {
    if (window.confirm(`确定要删除 "${name}" 吗？此操作不可撤销。`)) {
      deleteCharacter(id);
    }
  };

  const handleImport = () => {
    if (importText.trim()) {
      if (importData(importText)) {
        setImportText('');
        setShowImportInput(false);
        alert('✅ 数据导入成功！');
      }
    }
  };

  if (loading) {
    return <div className="admin-loading">加载中...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>📋 人物管理后台</h1>
        <Link to="/" className="btn-back">← 返回首页</Link>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={clearError}>✕</button>
        </div>
      )}

      <div className="admin-toolbar">
        <Link to="/admin/add" className="btn btn-primary">
          ➕ 添加新人物
        </Link>
        
        <div className="toolbar-actions">
          <button onClick={exportData} className="btn btn-secondary">
            📥 导出数据
          </button>
          
          <button 
            onClick={() => setShowImportInput(!showImportInput)}
            className="btn btn-secondary"
          >
            📤 导入数据
          </button>
          
          <button onClick={resetToDefault} className="btn btn-warning">
            🔄 重置为默认
          </button>
        </div>
      </div>

      {showImportInput && (
        <div className="import-panel">
          <h3>导入JSON数据</h3>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="粘贴JSON数据..."
            rows="6"
          />
          <div className="import-actions">
            <button onClick={handleImport} className="btn btn-primary">
              导入
            </button>
            <button 
              onClick={() => {
                setShowImportInput(false);
                setImportText('');
              }}
              className="btn btn-secondary"
            >
              取消
            </button>
          </div>
        </div>
      )}

      <div className="characters-grid">
        {characters.length === 0 ? (
          <div className="empty-state">
            <p>📭 还没有人物数据</p>
            <Link to="/admin/add" className="btn btn-primary">
              添加第一个人物
            </Link>
          </div>
        ) : (
          characters.map(character => (
            <div key={character.id} className="character-card">
              <div className="card-image">
                <img 
                  src={character.thumbnail} 
                  alt={character.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=图片加载失败';
                  }}
                />
              </div>
              
              <div className="card-content">
                <h3>{character.name}</h3>
                <p className="title">{character.title}</p>
                
                <div className="card-meta">
                  <span className="meta-item">
                    📝 {character.description.length} 字
                  </span>
                  <span className="meta-item">
                    🏆 {character.achievements?.length || 0} 项成就
                  </span>
                  {character.videoUrl && (
                    <span className="meta-item">🎬 有视频</span>
                  )}
                </div>

                <div className="card-actions">
                  <Link 
                    to={`/admin/edit/${character.id}`}
                    className="btn btn-small btn-primary"
                  >
                    编辑
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(character.id, character.name)}
                    className="btn btn-small btn-danger"
                  >
                    删除
                  </button>
                  
                  <Link
                    to={`/character/${character.id}`}
                    className="btn btn-small btn-secondary"
                    target="_blank"
                  >
                    预览
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="admin-footer">
        <p>💡 提示：所有数据保存在浏览器本地存储中。建议定期导出备份。</p>
      </div>
    </div>
  );
}

