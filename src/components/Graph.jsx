import GraphNode from './GraphNode';

const Graph = ({ graph }) => {
  return (
    <svg
      width={1000}
      height={600}
      style={{ alignSelf: 'center', userSelect: 'none', pointerEvents: 'none' }}
    >
      <GraphNode node={graph} />
    </svg>
  );
};

export default Graph;
