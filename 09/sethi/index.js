function day9( findMin ) {
  const validate = findMin ? (a,b) => a < b : (a,b) => a > b;
  const shortCircuit = findMin ? (a,b) => a > b : (a,b) => a < b;
  const defaultAnswer = findMin ? Infinity : -Infinity;

  const data = document.body.innerText;

  const regex = /^(\w+) to (\w+) = (\d+)$/gm;

  const GRAPH = new Map();

  const getNode = name => {
    if( ! GRAPH.has(name) )
      GRAPH.set( name, { name, edges: new Map() } );
    return GRAPH.get(name);
  }

  while( match = regex.exec(data) ) {
    const [ , name1, name2, distance ] = match;
    const node1 = getNode(name1);
    const node2 = getNode(name2);
    node1.edges.set( node2, +distance );
    node2.edges.set( node1, +distance );
  }

  let ANSWER = defaultAnswer;

  const walk = (node,visited = new Set(),travelled = 0) => {
    if( shortCircuit(travelled,ANSWER) || visited.has(node) ) return defaultAnswer;
    visited = new Set([ ...visited, node ]);
    if( visited.size === GRAPH.size ) return travelled;
    let answer = defaultAnswer;
    for( let [ next, distance ] of node.edges ) {
      const totalTravelled = walk( next, visited, travelled + distance );
      if( validate(totalTravelled,answer) ) answer = totalTravelled;
    }
    return answer;
  }

  for( let node of GRAPH.values() ) {
    const travelled = walk( node );
    if( validate(travelled,ANSWER) ) ANSWER = travelled;
  }

  return ANSWER;
}

console.log( 'Part One:', day9(true) );
console.log( 'Part Two:', day9(false) );
