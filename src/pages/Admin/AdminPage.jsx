import { useParams, useNavigate } from 'react-router-dom';
import { useCharacters } from '../../hooks/useCharacters';
import CharacterForm from './CharacterForm';

export default function AdminPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { characters, addCharacter, updateCharacter } = useCharacters();

  const character = id ? characters.find(c => c.id === parseInt(id)) : null;

  const handleSave = (formData) => {
    if (id) {
      // 编辑模式
      updateCharacter(parseInt(id), formData);
      alert('✅ 人物信息已更新！');
    } else {
      // 添加模式
      addCharacter(formData);
      alert('✅ 新人物已添加！');
    }
    navigate('/admin');
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #FFF5F9 0%, #F0D9E8 100%)', padding: '20px' }}>
      <CharacterForm
        character={character}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}

