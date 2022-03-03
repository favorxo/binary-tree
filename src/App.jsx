import { useState } from 'react';
import Graph from './components/Graph';
import GraphNode from './components/GraphNode';
import NavBar from './components/NavBar';
import BST from './utils/graph';
const App = () => {
  const [graph, setGraph] = useState(new BST(100));
  console.log(graph);

  const copyObject = (obj) =>
    Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);

  const search = (find) => {
    const copyGraph = copyObject(graph);
    console.log(answ);
  };

  const insertNode = (insert) => {
    const copyGraph = copyObject(graph);
    copyGraph.add(Number(insert));
    setGraph(copyGraph);
  };

  const deleteNode = (nodeToDelete) => {
    const copyGraph = copyObject(graph);
    copyGraph.remove(Number(nodeToDelete));
    setGraph(copyGraph);
  };

  return (
    <>
      <NavBar
        graph={graph.root}
        setGraph={setGraph}
        searchNode={search}
        insertNode={insertNode}
        deleteNode={deleteNode}
      />
      <Graph graph={graph.root} />
    </>
  );
};

export default App;
