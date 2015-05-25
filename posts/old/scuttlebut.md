The problem: synchronize data from node.js server to my clients?  
The Solution: [scuttlebut](https://github.com/substack/stream-handbook#scuttlebutt)

You just hook the streams together and call .get() and .set() and it survives network partitions in an eventually consistent, distributed way
