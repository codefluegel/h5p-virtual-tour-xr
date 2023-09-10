import React from 'react';
import semanticsJSON from '/semantics.json';

export const findSemanticsPath = (path, semantics = semanticsJSON) => {
  // Sanitization for user convenience
  path = path.startsWith('/') ? path.slice(1) : path;
  path = path.endsWith('/') ? path.slice(0, -1) : path;

  const pathSegments = path.split('/');

  if (Array.isArray(semantics)) {
    // Array
    for (const object of semantics) {
      if (object.name === pathSegments[0]) {
        return findSemanticsPath(path, object);
      }
    }
  }
  else if (pathSegments.length === 1 && pathSegments[0] === semantics.name) {
    // Found
    return semantics;
  }
  else if (semantics.field) {
    // List
    pathSegments.shift();
    return findSemanticsPath(pathSegments.join('/'), semantics.field);
  }
  else if (semantics.fields) {
    // Group
    pathSegments.shift();
    return findSemanticsPath(pathSegments.join('/'), semantics.fields);
  }
  else {
    // Not found
    return null;
  }
};

export const H5PContext = React.createContext(null);
