import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
const GraphNode = ({ node }) => {
  const r = 14;
  const stroke = 2;
  const speed = 0.3;
  const leftLine = node.left && {
    pathLength: [0, 1],
    strokeWidth: 3,
    x1: [node.lastX, node.currentX],
    y1: [node.lastY, node.currentY],
    x2: [node.left.lastX, node.left.currentX],
    y2: [node.left.lastY, node.left.currentY],
  };
  const rightLine = node.right && {
    pathLength: [0, 1],
    strokeWidth: 3,
    x1: [node.lastX, node.currentX],
    y1: [node.lastY, node.currentY],
    x2: [node.right.lastX, node.right.currentX],
    y2: [node.right.lastY, node.right.currentY],
  };
  const borderCircle = {
    fill:
      node.tags.isCurrent || node.tags.isVisited ? 'rgb(255,150,0)' : '#050505',
    cx: [node.lastX, node.currentX],
    cy: [node.lastY, node.currentY],
    opacity: 1,
    scale: 1,
  };
  const innerCircle = {
    fill: node.tags.isCurrent ? 'rgb(255,150,0)' : '#fff',
    cx: [node.lastX, node.currentX],
    cy: [node.lastY, node.currentY],
    opacity: 1,
    scale: 1,
  };
  const circleInitial = {
    opacity: 0,
    scale: 0,
    cx: node.lastX,
    cy: node.lastY,
  };
  const innerText = {
    stroke: node.tags.isCurrent ? '#fff' : '#050505',
    x: [node.lastX, node.currentX],
    y: [node.lastY + 6, node.currentY + 6],
    opacity: 1,
    scale: 1,
  };
  const textInitial = {
    opacity: 0,
    scale: 0,
    x: node.lastX,
    y: node.lastY,
  };
  const transition = (delay) => ({
    duration: speed,
    ease: 'easeIn',
    delay: delay,
  });
  
  return (
    <>
      {node.left && (
        <>
          <motion.line
            transition={transition()}
            animate={leftLine}
            stroke={node.leftLine.isVisited ? 'rgb(255,150,0)' : '#050505'}
          />
          {node.leftLine.isCurrent && (
            <motion.line
              transition={transition(speed)}
              animate={{
                ...leftLine,
                stroke: 'rgb(255,150,0)',
                strokeWidth: 9,
              }}
            />
          )}
          <GraphNode node={node.left} />
        </>
      )}
      {node.right && (
        <>
          <motion.line
            transition={transition()}
            animate={rightLine}
            stroke={node.rightLine.isVisited ? 'rgb(255,150,0)' : '#050505'}
          />
          {node.rightLine.isCurrent && (
            <motion.line
              transition={transition(speed)}
              animate={{
                ...rightLine,
                stroke: 'rgb(255,150,0)',
                strokeWidth: 9,
              }}
            />
          )}
          <GraphNode node={node.right} />
        </>
      )}
      <g>
        <motion.circle // border circle
          fill="black"
          transition={transition()}
          r={r + 3}
          strokeWidth={stroke + 3}
          width={32}
          height={32}
          animate={borderCircle}
        />
        <motion.circle // inner circle
          fill="#fff"
          transition={transition()}
          r={r}
          strokeWidth={stroke}
          width={32}
          height={32}
          animate={innerCircle}
        />
        <motion.text
          stroke="black"
          transition={transition()}
          fontSize={16}
          textAnchor="middle"
          animate={innerText}
        >
          {node.data}
        </motion.text>
      </g>
    </>
  );
};

export default GraphNode;
