const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();

  // find the proof that Jacquelyn Beer is in the list
  const name = 'Jacquelyn Beer';
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  try {
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      leaf: name,
      proof: proof,
      root: root
    });
    console.log({ gift });
  }
  catch (error) {
    console.error(error);
  }
}

main();