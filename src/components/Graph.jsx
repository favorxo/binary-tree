import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GraphNode from './GraphNode';

// pass root node here
const Graph = ({ graph }) => {
  const [depth, setDepth] = useState(0);
  console.log(graph);
  useEffect(() => {
    // setDepth(graph.getDepth());
    setDepth(2);
  }, []);

  return (
    <svg
      width={1000}
      height={600}
      style={{ alignSelf: 'center', userSelect: 'none', pointerEvents: 'none' }}
    >
      <AnimatePresence>
        <GraphNode width={1000} height={50} node={graph} offset={0} />
      </AnimatePresence>
    </svg>
  );
};

export default Graph;
