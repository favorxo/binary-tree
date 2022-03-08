import { useState, useEffect } from 'react';
import Graph from './components/Graph';
import NavBar from './components/NavBar';
import BST from './utils/graph';
const App = () => {
  const [graph, setGraph] = useState(new BST(100));
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const copyGraph = graph.clone();
    copyGraph.insert(500);
    copyGraph.insert(400);
    copyGraph.insert(350);
    copyGraph.insert(450);
    copyGraph.insert(800);
    copyGraph.insert(750);
    copyGraph.insert(850);
    copyGraph.insert(50);
    copyGraph.insert(20);
    copyGraph.insert(60);
    copyGraph.insert(70);
    copyGraph.insert(55);
    copyGraph.insert(10);
    copyGraph.insert(30);
    copyGraph.clean();
    copyGraph.snapshots.push(copyGraph.cloneRoot());
    setGraph(copyGraph);
  }, []);
  const insertNode = (insert) => {
    const copyGraph = graph.clone();
    copyGraph.insert(Number(insert));
    setCurrent(0);
    setGraph(copyGraph);
    animateSnapshots(copyGraph);
  };

  const search = (find) => {};

  const deleteNode = (nodeToDelete) => {
    const copyGraph = graph.clone();
    copyGraph.remove(Number(nodeToDelete));
    setCurrent(0);
    setGraph(copyGraph);
    animateSnapshots(copyGraph);
  };

  const animateSnapshots = (graph) => {
    console.log(graph.snapshots);
    for (let i = 0; i < graph.snapshots.length; i++) {
      setTimeout(() => {
        setCurrent(i);
      }, i * 800);
    }
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
      <Graph graph={graph.snapshots[current]} />
    </>
  );
};

export default App;
