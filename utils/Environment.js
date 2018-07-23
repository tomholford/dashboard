const node_env = process.env.NODE_ENV;

class Environment {
  static get NODE_ENV() {
    return node_env;
  }
}
