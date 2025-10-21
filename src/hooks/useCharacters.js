import { useState, useEffect } from 'react';
import { characters as defaultCharacters } from '../data/characters';

/**
 * 人物数据管理Hook
 * 支持CRUD操作，数据存储在localStorage
 */
export function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 初始化数据
  useEffect(() => {
    try {
      const saved = localStorage.getItem('characters');
      if (saved) {
        setCharacters(JSON.parse(saved));
      } else {
        // 首次使用，使用默认数据
        setCharacters(defaultCharacters);
        localStorage.setItem('characters', JSON.stringify(defaultCharacters));
      }
    } catch (err) {
      setError('加载数据失败：' + err.message);
      setCharacters(defaultCharacters);
    } finally {
      setLoading(false);
    }
  }, []);

  // 保存数据到localStorage
  const saveCharacters = (newCharacters) => {
    try {
      setCharacters(newCharacters);
      localStorage.setItem('characters', JSON.stringify(newCharacters));
      return true;
    } catch (err) {
      setError('保存数据失败：' + err.message);
      return false;
    }
  };

  // 添加人物
  const addCharacter = (character) => {
    try {
      const newId = characters.length > 0 
        ? Math.max(...characters.map(c => c.id)) + 1 
        : 1;
      
      const newCharacter = {
        ...character,
        id: newId,
        achievements: character.achievements || []
      };
      
      const updated = [...characters, newCharacter];
      saveCharacters(updated);
      return newCharacter;
    } catch (err) {
      setError('添加人物失败：' + err.message);
      return null;
    }
  };

  // 更新人物
  const updateCharacter = (id, updates) => {
    try {
      const updated = characters.map(c => 
        c.id === id ? { ...c, ...updates } : c
      );
      saveCharacters(updated);
      return true;
    } catch (err) {
      setError('更新人物失败：' + err.message);
      return false;
    }
  };

  // 删除人物
  const deleteCharacter = (id) => {
    try {
      const updated = characters.filter(c => c.id !== id);
      saveCharacters(updated);
      return true;
    } catch (err) {
      setError('删除人物失败：' + err.message);
      return false;
    }
  };

  // 获取单个人物
  const getCharacter = (id) => {
    return characters.find(c => c.id === id);
  };

  // 重置为默认数据
  const resetToDefault = () => {
    if (window.confirm('确定要重置为默认数据吗？此操作不可撤销。')) {
      saveCharacters(defaultCharacters);
      return true;
    }
    return false;
  };

  // 导出数据为JSON
  const exportData = () => {
    const dataStr = JSON.stringify(characters, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `characters-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 导入数据从JSON
  const importData = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      if (!Array.isArray(imported)) {
        throw new Error('数据必须是数组格式');
      }
      saveCharacters(imported);
      return true;
    } catch (err) {
      setError('导入数据失败：' + err.message);
      return false;
    }
  };

  return {
    characters,
    loading,
    error,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacter,
    resetToDefault,
    exportData,
    importData,
    clearError: () => setError(null)
  };
}

