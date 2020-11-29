import { createContext } from 'react'

export const Level = createContext(1);

export function Section(props) {
  return (
    <Level.Consumer>{level =>
      <Level.Provider value={level + 1}>
        <section {...props} />
      </Level.Provider>
    }</Level.Consumer>
  );
}

export function H(props) {
  return (
    <Level.Consumer>{level => {
      const Heading = 'h' + Math.min(level, 6);
      return <Heading {...props} />;
    }}</Level.Consumer>
  );
}
