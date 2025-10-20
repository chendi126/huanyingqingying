import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('renders the home page on initial load', () => {
    render(<App />);

    // 检查首页标题是否存在
    expect(screen.getByText('焕影清音')).toBeInTheDocument();
  });

  it('displays the subtitle', () => {
    render(<App />);

    expect(screen.getByText('华县皮影的前世今生')).toBeInTheDocument();
  });

  it('displays character cards', () => {
    render(<App />);

    // 检查是否显示了人物卡片
    expect(screen.getByText('汪天喜')).toBeInTheDocument();
    expect(screen.getByText('李爱民')).toBeInTheDocument();
    expect(screen.getByText('王秀英')).toBeInTheDocument();
    expect(screen.getByText('张建国')).toBeInTheDocument();
  });

  it('displays character titles', () => {
    render(<App />);

    expect(screen.getByText('华县皮影传承人')).toBeInTheDocument();
    expect(screen.getByText('皮影雕刻艺术家')).toBeInTheDocument();
  });
});

