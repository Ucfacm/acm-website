'use client';

import React, { useEffect, useRef } from 'react';
import '../../src/components/binarywalls.css';

const BinaryWall: React.FC = () => {
  const binaryWallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const binaryWall = binaryWallRef.current;
    if (!binaryWall) return;

    const generateRandomBinary = () => (Math.random() < 0.5 ? '0' : '1');

    const populateGrid = () => {
      const wallWidth = binaryWall.clientWidth;
      const wallHeight = binaryWall.clientHeight;
      const cellSize = wallWidth / Math.floor(wallWidth / 20);

      const columns = Math.floor(wallWidth / cellSize);
      const rows = Math.floor(wallHeight / cellSize);
      const totalDigits = columns * rows;

      binaryWall.innerHTML = '';

      for (let i = 0; i < totalDigits; i++) {
        const digit = document.createElement('span');
        digit.className = 'binary-digit';
        digit.textContent = generateRandomBinary();
        digit.setAttribute('aria-hidden', 'true');
        digit.setAttribute('tabIndex', '-1');
        binaryWall.appendChild(digit);
      }
    };

    const getColumnCount = () => {
      const styles = window.getComputedStyle(binaryWall);
      const columns = styles.getPropertyValue('grid-template-columns');
      return columns.split(' ').length;
    };

    const getNearbyElements = (index: number) => {
      const levels = {
        active: [] as HTMLElement[],
        nearby1: [] as HTMLElement[],
        nearby2: [] as HTMLElement[],
        nearby3: [] as HTMLElement[],
        nearby4: [] as HTMLElement[],
      };

      const children = Array.from(binaryWall.children) as HTMLElement[];
      const columns = getColumnCount();
      const row = Math.floor(index / columns);
      const col = index % columns;

      for (let i = 0; i < children.length; i++) {
        const currentRow = Math.floor(i / columns);
        const currentCol = i % columns;

        const distance = Math.sqrt(
          Math.pow(currentRow - row, 2) + Math.pow(currentCol - col, 2)
        );

        const element = children[i];
        if (distance === 0) levels.active.push(element);
        else if (distance <= 1) levels.nearby1.push(element);
        else if (distance <= 2) levels.nearby2.push(element);
        else if (distance <= 3) levels.nearby3.push(element);
        else if (distance <= 4) levels.nearby4.push(element);
      }

      return levels;
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (!e.target.classList.contains('binary-digit')) return;

      applyHighlight(e.target);
    };

    const handleMouseLeave = () => {
      clearHighlights();
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement;
      if (!target || !target.classList.contains('binary-digit')) return;

      applyHighlight(target);
    };

    const handleTouchEnd = () => {
      clearHighlights();
    };

    const applyHighlight = (target: HTMLElement) => {
      const children = Array.from(binaryWall!.children) as HTMLElement[];
      children.forEach((el) =>
        el.classList.remove('active', 'nearby-1', 'nearby-2', 'nearby-3', 'nearby-4')
      );

      const index = children.indexOf(target);
      const nearby = getNearbyElements(index);

      nearby.active.forEach((el) => el.classList.add('active'));
      nearby.nearby1.forEach((el) => el.classList.add('nearby-1'));
      nearby.nearby2.forEach((el) => el.classList.add('nearby-2'));
      nearby.nearby3.forEach((el) => el.classList.add('nearby-3'));
      nearby.nearby4.forEach((el) => el.classList.add('nearby-4'));
    };

    const clearHighlights = () => {
      const children = Array.from(binaryWall!.children) as HTMLElement[];
      children.forEach((digit) =>
        digit.classList.remove('active', 'nearby-1', 'nearby-2', 'nearby-3', 'nearby-4')
      );
    };

    populateGrid();
    binaryWall.addEventListener('mouseover', handleMouseOver);
    binaryWall.addEventListener('mouseleave', handleMouseLeave);
    binaryWall.addEventListener('touchstart', handleTouchStart, { passive: true });
    binaryWall.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('resize', populateGrid);

    return () => {
      binaryWall.removeEventListener('mouseover', handleMouseOver);
      binaryWall.removeEventListener('mouseleave', handleMouseLeave);
      binaryWall.removeEventListener('touchstart', handleTouchStart);
      binaryWall.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', populateGrid);
    };
  }, []);

  return (
    <section className="hero-section" aria-hidden="true">
      <div
        className="binary-wall"
        ref={binaryWallRef}
        aria-hidden="true"
        tabIndex={-1}
      ></div>
    </section>
  );
};

export default BinaryWall;
