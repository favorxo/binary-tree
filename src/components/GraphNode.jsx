import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
const GraphNode = ({ node, width, height, offset }) => {
  const x = useMotionValue(width / 2 + offset);
  const y = useMotionValue(height);
  const r = 14;
  const stroke = 2;
  return (
    <>
      {node.left && (
        <>
          <motion.line
            x1={x}
            y1={y}
            x2={width / 4 + offset}
            y2={height + 40}
            // strokeWidth={3}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { pathLength: 0, strokeWidth: 6 },
              visible: {
                pathLength: 1,
                strokeWidth: 3,
                stroke: 'rgb(0,0,0)',
              },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <GraphNode
            node={node.left}
            width={width / 2}
            height={height + 40}
            offset={offset}
          />
        </>
      )}
      {node.right && (
        <>
          <motion.line
            x1={x}
            y1={y}
            style={{ transition: 'all 100ms' }}
            x2={offset + width / 2 + width / 4}
            y2={height + 40}
            stroke="black"
            strokeWidth={3}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <GraphNode
            node={node.right}
            width={width / 2}
            height={height + 40}
            offset={offset + width / 2}
          />
        </>
      )}

      <motion.g x={150}>
        <motion.circle // border circle
          r={r + 3}
          cx={x}
          cy={y}
          strokeWidth={stroke + 3}
          width={32}
          height={32}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeIn' }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            fill: '#000',
            // cx: [null, 250],
            // cy: [null, 150],
          }}
        />
        <motion.circle // inner circle
          r={r}
          cx={x}
          cy={y}
          strokeWidth={stroke}
          width={32}
          height={32}
          fill="#fff"
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeIn' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, fill: '#fff' }}
        />
        <motion.text
          x={x}
          y={y.get() + 6}
          stroke="black"
          fontSize={16}
          textAnchor="middle"
          fontWeight={500}
          transition={{ delay: 0.5, duration: 0.5, ease: 'easeIn' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {node.data}
        </motion.text>
      </motion.g>
    </>
  );
};

export default GraphNode;
