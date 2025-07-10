/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiddenText: () => (/* binding */ HiddenText),
/* harmony export */   LiveRegion: () => (/* binding */ LiveRegion),
/* harmony export */   useAnnouncement: () => (/* binding */ useAnnouncement)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const hiddenStyles = {
  display: 'none'
};
function HiddenText(_ref) {
  let {
    id,
    value
  } = _ref;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: id,
    style: hiddenStyles
  }, value);
}

function LiveRegion(_ref) {
  let {
    id,
    announcement,
    ariaLiveType = "assertive"
  } = _ref;
  // Hide element visually but keep it readable by screen readers
  const visuallyHidden = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 1,
    height: 1,
    margin: -1,
    border: 0,
    padding: 0,
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(100%)',
    whiteSpace: 'nowrap'
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    id: id,
    style: visuallyHidden,
    role: "status",
    "aria-live": ariaLiveType,
    "aria-atomic": true
  }, announcement);
}

function useAnnouncement() {
  const [announcement, setAnnouncement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const announce = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(value => {
    if (value != null) {
      setAnnouncement(value);
    }
  }, []);
  return {
    announce,
    announcement
  };
}


//# sourceMappingURL=accessibility.esm.js.map


/***/ }),

/***/ "./node_modules/@dnd-kit/core/dist/core.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/@dnd-kit/core/dist/core.esm.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoScrollActivator: () => (/* binding */ AutoScrollActivator),
/* harmony export */   DndContext: () => (/* binding */ DndContext),
/* harmony export */   DragOverlay: () => (/* binding */ DragOverlay),
/* harmony export */   KeyboardCode: () => (/* binding */ KeyboardCode),
/* harmony export */   KeyboardSensor: () => (/* binding */ KeyboardSensor),
/* harmony export */   MeasuringFrequency: () => (/* binding */ MeasuringFrequency),
/* harmony export */   MeasuringStrategy: () => (/* binding */ MeasuringStrategy),
/* harmony export */   MouseSensor: () => (/* binding */ MouseSensor),
/* harmony export */   PointerSensor: () => (/* binding */ PointerSensor),
/* harmony export */   TouchSensor: () => (/* binding */ TouchSensor),
/* harmony export */   TraversalOrder: () => (/* binding */ TraversalOrder),
/* harmony export */   applyModifiers: () => (/* binding */ applyModifiers),
/* harmony export */   closestCenter: () => (/* binding */ closestCenter),
/* harmony export */   closestCorners: () => (/* binding */ closestCorners),
/* harmony export */   defaultAnnouncements: () => (/* binding */ defaultAnnouncements),
/* harmony export */   defaultCoordinates: () => (/* binding */ defaultCoordinates),
/* harmony export */   defaultDropAnimation: () => (/* binding */ defaultDropAnimationConfiguration),
/* harmony export */   defaultDropAnimationSideEffects: () => (/* binding */ defaultDropAnimationSideEffects),
/* harmony export */   defaultKeyboardCoordinateGetter: () => (/* binding */ defaultKeyboardCoordinateGetter),
/* harmony export */   defaultScreenReaderInstructions: () => (/* binding */ defaultScreenReaderInstructions),
/* harmony export */   getClientRect: () => (/* binding */ getClientRect),
/* harmony export */   getFirstCollision: () => (/* binding */ getFirstCollision),
/* harmony export */   getScrollableAncestors: () => (/* binding */ getScrollableAncestors),
/* harmony export */   pointerWithin: () => (/* binding */ pointerWithin),
/* harmony export */   rectIntersection: () => (/* binding */ rectIntersection),
/* harmony export */   useDndContext: () => (/* binding */ useDndContext),
/* harmony export */   useDndMonitor: () => (/* binding */ useDndMonitor),
/* harmony export */   useDraggable: () => (/* binding */ useDraggable),
/* harmony export */   useDroppable: () => (/* binding */ useDroppable),
/* harmony export */   useSensor: () => (/* binding */ useSensor),
/* harmony export */   useSensors: () => (/* binding */ useSensors)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dnd-kit/utilities */ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js");
/* harmony import */ var _dnd_kit_accessibility__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dnd-kit/accessibility */ "./node_modules/@dnd-kit/accessibility/dist/accessibility.esm.js");





const DndMonitorContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);

function useDndMonitor(listener) {
  const registerListener = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(DndMonitorContext);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!registerListener) {
      throw new Error('useDndMonitor must be used within a children of <DndContext>');
    }

    const unsubscribe = registerListener(listener);
    return unsubscribe;
  }, [listener, registerListener]);
}

function useDndMonitorProvider() {
  const [listeners] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => new Set());
  const registerListener = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, [listeners]);
  const dispatch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(_ref => {
    let {
      type,
      event
    } = _ref;
    listeners.forEach(listener => {
      var _listener$type;

      return (_listener$type = listener[type]) == null ? void 0 : _listener$type.call(listener, event);
    });
  }, [listeners]);
  return [dispatch, registerListener];
}

const defaultScreenReaderInstructions = {
  draggable: "\n    To pick up a draggable item, press the space bar.\n    While dragging, use the arrow keys to move the item.\n    Press space again to drop the item in its new position, or press escape to cancel.\n  "
};
const defaultAnnouncements = {
  onDragStart(_ref) {
    let {
      active
    } = _ref;
    return "Picked up draggable item " + active.id + ".";
  },

  onDragOver(_ref2) {
    let {
      active,
      over
    } = _ref2;

    if (over) {
      return "Draggable item " + active.id + " was moved over droppable area " + over.id + ".";
    }

    return "Draggable item " + active.id + " is no longer over a droppable area.";
  },

  onDragEnd(_ref3) {
    let {
      active,
      over
    } = _ref3;

    if (over) {
      return "Draggable item " + active.id + " was dropped over droppable area " + over.id;
    }

    return "Draggable item " + active.id + " was dropped.";
  },

  onDragCancel(_ref4) {
    let {
      active
    } = _ref4;
    return "Dragging was cancelled. Draggable item " + active.id + " was dropped.";
  }

};

function Accessibility(_ref) {
  let {
    announcements = defaultAnnouncements,
    container,
    hiddenTextDescribedById,
    screenReaderInstructions = defaultScreenReaderInstructions
  } = _ref;
  const {
    announce,
    announcement
  } = (0,_dnd_kit_accessibility__WEBPACK_IMPORTED_MODULE_3__.useAnnouncement)();
  const liveRegionId = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)("DndLiveRegion");
  const [mounted, setMounted] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setMounted(true);
  }, []);
  useDndMonitor((0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    onDragStart(_ref2) {
      let {
        active
      } = _ref2;
      announce(announcements.onDragStart({
        active
      }));
    },

    onDragMove(_ref3) {
      let {
        active,
        over
      } = _ref3;

      if (announcements.onDragMove) {
        announce(announcements.onDragMove({
          active,
          over
        }));
      }
    },

    onDragOver(_ref4) {
      let {
        active,
        over
      } = _ref4;
      announce(announcements.onDragOver({
        active,
        over
      }));
    },

    onDragEnd(_ref5) {
      let {
        active,
        over
      } = _ref5;
      announce(announcements.onDragEnd({
        active,
        over
      }));
    },

    onDragCancel(_ref6) {
      let {
        active,
        over
      } = _ref6;
      announce(announcements.onDragCancel({
        active,
        over
      }));
    }

  }), [announce, announcements]));

  if (!mounted) {
    return null;
  }

  const markup = react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_dnd_kit_accessibility__WEBPACK_IMPORTED_MODULE_3__.HiddenText, {
    id: hiddenTextDescribedById,
    value: screenReaderInstructions.draggable
  }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_dnd_kit_accessibility__WEBPACK_IMPORTED_MODULE_3__.LiveRegion, {
    id: liveRegionId,
    announcement: announcement
  }));
  return container ? (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.createPortal)(markup, container) : markup;
}

var Action;

(function (Action) {
  Action["DragStart"] = "dragStart";
  Action["DragMove"] = "dragMove";
  Action["DragEnd"] = "dragEnd";
  Action["DragCancel"] = "dragCancel";
  Action["DragOver"] = "dragOver";
  Action["RegisterDroppable"] = "registerDroppable";
  Action["SetDroppableDisabled"] = "setDroppableDisabled";
  Action["UnregisterDroppable"] = "unregisterDroppable";
})(Action || (Action = {}));

function noop() {}

function useSensor(sensor, options) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    sensor,
    options: options != null ? options : {}
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [sensor, options]);
}

function useSensors() {
  for (var _len = arguments.length, sensors = new Array(_len), _key = 0; _key < _len; _key++) {
    sensors[_key] = arguments[_key];
  }

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => [...sensors].filter(sensor => sensor != null), // eslint-disable-next-line react-hooks/exhaustive-deps
  [...sensors]);
}

const defaultCoordinates = /*#__PURE__*/Object.freeze({
  x: 0,
  y: 0
});

/**
 * Returns the distance between two points
 */
function distanceBetween(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

function getRelativeTransformOrigin(event, rect) {
  const eventCoordinates = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getEventCoordinates)(event);

  if (!eventCoordinates) {
    return '0 0';
  }

  const transformOrigin = {
    x: (eventCoordinates.x - rect.left) / rect.width * 100,
    y: (eventCoordinates.y - rect.top) / rect.height * 100
  };
  return transformOrigin.x + "% " + transformOrigin.y + "%";
}

/**
 * Sort collisions from smallest to greatest value
 */
function sortCollisionsAsc(_ref, _ref2) {
  let {
    data: {
      value: a
    }
  } = _ref;
  let {
    data: {
      value: b
    }
  } = _ref2;
  return a - b;
}
/**
 * Sort collisions from greatest to smallest value
 */

function sortCollisionsDesc(_ref3, _ref4) {
  let {
    data: {
      value: a
    }
  } = _ref3;
  let {
    data: {
      value: b
    }
  } = _ref4;
  return b - a;
}
/**
 * Returns the coordinates of the corners of a given rectangle:
 * [TopLeft {x, y}, TopRight {x, y}, BottomLeft {x, y}, BottomRight {x, y}]
 */

function cornersOfRectangle(_ref5) {
  let {
    left,
    top,
    height,
    width
  } = _ref5;
  return [{
    x: left,
    y: top
  }, {
    x: left + width,
    y: top
  }, {
    x: left,
    y: top + height
  }, {
    x: left + width,
    y: top + height
  }];
}
function getFirstCollision(collisions, property) {
  if (!collisions || collisions.length === 0) {
    return null;
  }

  const [firstCollision] = collisions;
  return property ? firstCollision[property] : firstCollision;
}

/**
 * Returns the coordinates of the center of a given ClientRect
 */

function centerOfRectangle(rect, left, top) {
  if (left === void 0) {
    left = rect.left;
  }

  if (top === void 0) {
    top = rect.top;
  }

  return {
    x: left + rect.width * 0.5,
    y: top + rect.height * 0.5
  };
}
/**
 * Returns the closest rectangles from an array of rectangles to the center of a given
 * rectangle.
 */


const closestCenter = _ref => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const centerRect = centerOfRectangle(collisionRect, collisionRect.left, collisionRect.top);
  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const distBetween = distanceBetween(centerOfRectangle(rect), centerRect);
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: distBetween
        }
      });
    }
  }

  return collisions.sort(sortCollisionsAsc);
};

/**
 * Returns the closest rectangles from an array of rectangles to the corners of
 * another rectangle.
 */

const closestCorners = _ref => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const corners = cornersOfRectangle(collisionRect);
  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const rectCorners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner, index) => {
        return accumulator + distanceBetween(rectCorners[index], corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: effectiveDistance
        }
      });
    }
  }

  return collisions.sort(sortCollisionsAsc);
};

/**
 * Returns the intersecting rectangle area between two rectangles
 */

function getIntersectionRatio(entry, target) {
  const top = Math.max(target.top, entry.top);
  const left = Math.max(target.left, entry.left);
  const right = Math.min(target.left + target.width, entry.left + entry.width);
  const bottom = Math.min(target.top + target.height, entry.top + entry.height);
  const width = right - left;
  const height = bottom - top;

  if (left < right && top < bottom) {
    const targetArea = target.width * target.height;
    const entryArea = entry.width * entry.height;
    const intersectionArea = width * height;
    const intersectionRatio = intersectionArea / (targetArea + entryArea - intersectionArea);
    return Number(intersectionRatio.toFixed(4));
  } // Rectangles do not overlap, or overlap has an area of zero (edge/corner overlap)


  return 0;
}
/**
 * Returns the rectangles that has the greatest intersection area with a given
 * rectangle in an array of rectangles.
 */

const rectIntersection = _ref => {
  let {
    collisionRect,
    droppableRects,
    droppableContainers
  } = _ref;
  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect) {
      const intersectionRatio = getIntersectionRatio(rect, collisionRect);

      if (intersectionRatio > 0) {
        collisions.push({
          id,
          data: {
            droppableContainer,
            value: intersectionRatio
          }
        });
      }
    }
  }

  return collisions.sort(sortCollisionsDesc);
};

/**
 * Check if a given point is contained within a bounding rectangle
 */

function isPointWithinRect(point, rect) {
  const {
    top,
    left,
    bottom,
    right
  } = rect;
  return top <= point.y && point.y <= bottom && left <= point.x && point.x <= right;
}
/**
 * Returns the rectangles that the pointer is hovering over
 */


const pointerWithin = _ref => {
  let {
    droppableContainers,
    droppableRects,
    pointerCoordinates
  } = _ref;

  if (!pointerCoordinates) {
    return [];
  }

  const collisions = [];

  for (const droppableContainer of droppableContainers) {
    const {
      id
    } = droppableContainer;
    const rect = droppableRects.get(id);

    if (rect && isPointWithinRect(pointerCoordinates, rect)) {
      /* There may be more than a single rectangle intersecting
       * with the pointer coordinates. In order to sort the
       * colliding rectangles, we measure the distance between
       * the pointer and the corners of the intersecting rectangle
       */
      const corners = cornersOfRectangle(rect);
      const distances = corners.reduce((accumulator, corner) => {
        return accumulator + distanceBetween(pointerCoordinates, corner);
      }, 0);
      const effectiveDistance = Number((distances / 4).toFixed(4));
      collisions.push({
        id,
        data: {
          droppableContainer,
          value: effectiveDistance
        }
      });
    }
  }

  return collisions.sort(sortCollisionsAsc);
};

function adjustScale(transform, rect1, rect2) {
  return { ...transform,
    scaleX: rect1 && rect2 ? rect1.width / rect2.width : 1,
    scaleY: rect1 && rect2 ? rect1.height / rect2.height : 1
  };
}

function getRectDelta(rect1, rect2) {
  return rect1 && rect2 ? {
    x: rect1.left - rect2.left,
    y: rect1.top - rect2.top
  } : defaultCoordinates;
}

function createRectAdjustmentFn(modifier) {
  return function adjustClientRect(rect) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }

    return adjustments.reduce((acc, adjustment) => ({ ...acc,
      top: acc.top + modifier * adjustment.y,
      bottom: acc.bottom + modifier * adjustment.y,
      left: acc.left + modifier * adjustment.x,
      right: acc.right + modifier * adjustment.x
    }), { ...rect
    });
  };
}
const getAdjustedRect = /*#__PURE__*/createRectAdjustmentFn(1);

function parseTransform(transform) {
  if (transform.startsWith('matrix3d(')) {
    const transformArray = transform.slice(9, -1).split(/, /);
    return {
      x: +transformArray[12],
      y: +transformArray[13],
      scaleX: +transformArray[0],
      scaleY: +transformArray[5]
    };
  } else if (transform.startsWith('matrix(')) {
    const transformArray = transform.slice(7, -1).split(/, /);
    return {
      x: +transformArray[4],
      y: +transformArray[5],
      scaleX: +transformArray[0],
      scaleY: +transformArray[3]
    };
  }

  return null;
}

function inverseTransform(rect, transform, transformOrigin) {
  const parsedTransform = parseTransform(transform);

  if (!parsedTransform) {
    return rect;
  }

  const {
    scaleX,
    scaleY,
    x: translateX,
    y: translateY
  } = parsedTransform;
  const x = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
  const y = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(' ') + 1));
  const w = scaleX ? rect.width / scaleX : rect.width;
  const h = scaleY ? rect.height / scaleY : rect.height;
  return {
    width: w,
    height: h,
    top: y,
    right: x + w,
    bottom: y + h,
    left: x
  };
}

const defaultOptions = {
  ignoreTransform: false
};
/**
 * Returns the bounding client rect of an element relative to the viewport.
 */

function getClientRect(element, options) {
  if (options === void 0) {
    options = defaultOptions;
  }

  let rect = element.getBoundingClientRect();

  if (options.ignoreTransform) {
    const {
      transform,
      transformOrigin
    } = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element).getComputedStyle(element);

    if (transform) {
      rect = inverseTransform(rect, transform, transformOrigin);
    }
  }

  const {
    top,
    left,
    width,
    height,
    bottom,
    right
  } = rect;
  return {
    top,
    left,
    width,
    height,
    bottom,
    right
  };
}
/**
 * Returns the bounding client rect of an element relative to the viewport.
 *
 * @remarks
 * The ClientRect returned by this method does not take into account transforms
 * applied to the element it measures.
 *
 */

function getTransformAgnosticClientRect(element) {
  return getClientRect(element, {
    ignoreTransform: true
  });
}

function getWindowClientRect(element) {
  const width = element.innerWidth;
  const height = element.innerHeight;
  return {
    top: 0,
    left: 0,
    right: width,
    bottom: height,
    width,
    height
  };
}

function isFixed(node, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(node).getComputedStyle(node);
  }

  return computedStyle.position === 'fixed';
}

function isScrollable(element, computedStyle) {
  if (computedStyle === void 0) {
    computedStyle = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element).getComputedStyle(element);
  }

  const overflowRegex = /(auto|scroll|overlay)/;
  const properties = ['overflow', 'overflowX', 'overflowY'];
  return properties.some(property => {
    const value = computedStyle[property];
    return typeof value === 'string' ? overflowRegex.test(value) : false;
  });
}

function getScrollableAncestors(element, limit) {
  const scrollParents = [];

  function findScrollableAncestors(node) {
    if (limit != null && scrollParents.length >= limit) {
      return scrollParents;
    }

    if (!node) {
      return scrollParents;
    }

    if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isDocument)(node) && node.scrollingElement != null && !scrollParents.includes(node.scrollingElement)) {
      scrollParents.push(node.scrollingElement);
      return scrollParents;
    }

    if (!(0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(node) || (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isSVGElement)(node)) {
      return scrollParents;
    }

    if (scrollParents.includes(node)) {
      return scrollParents;
    }

    const computedStyle = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(element).getComputedStyle(node);

    if (node !== element) {
      if (isScrollable(node, computedStyle)) {
        scrollParents.push(node);
      }
    }

    if (isFixed(node, computedStyle)) {
      return scrollParents;
    }

    return findScrollableAncestors(node.parentNode);
  }

  if (!element) {
    return scrollParents;
  }

  return findScrollableAncestors(element);
}
function getFirstScrollableAncestor(node) {
  const [firstScrollableAncestor] = getScrollableAncestors(node, 1);
  return firstScrollableAncestor != null ? firstScrollableAncestor : null;
}

function getScrollableElement(element) {
  if (!_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.canUseDOM || !element) {
    return null;
  }

  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isWindow)(element)) {
    return element;
  }

  if (!(0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isNode)(element)) {
    return null;
  }

  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isDocument)(element) || element === (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(element).scrollingElement) {
    return window;
  }

  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(element)) {
    return element;
  }

  return null;
}

function getScrollXCoordinate(element) {
  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isWindow)(element)) {
    return element.scrollX;
  }

  return element.scrollLeft;
}
function getScrollYCoordinate(element) {
  if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isWindow)(element)) {
    return element.scrollY;
  }

  return element.scrollTop;
}
function getScrollCoordinates(element) {
  return {
    x: getScrollXCoordinate(element),
    y: getScrollYCoordinate(element)
  };
}

var Direction;

(function (Direction) {
  Direction[Direction["Forward"] = 1] = "Forward";
  Direction[Direction["Backward"] = -1] = "Backward";
})(Direction || (Direction = {}));

function isDocumentScrollingElement(element) {
  if (!_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.canUseDOM || !element) {
    return false;
  }

  return element === document.scrollingElement;
}

function getScrollPosition(scrollingContainer) {
  const minScroll = {
    x: 0,
    y: 0
  };
  const dimensions = isDocumentScrollingElement(scrollingContainer) ? {
    height: window.innerHeight,
    width: window.innerWidth
  } : {
    height: scrollingContainer.clientHeight,
    width: scrollingContainer.clientWidth
  };
  const maxScroll = {
    x: scrollingContainer.scrollWidth - dimensions.width,
    y: scrollingContainer.scrollHeight - dimensions.height
  };
  const isTop = scrollingContainer.scrollTop <= minScroll.y;
  const isLeft = scrollingContainer.scrollLeft <= minScroll.x;
  const isBottom = scrollingContainer.scrollTop >= maxScroll.y;
  const isRight = scrollingContainer.scrollLeft >= maxScroll.x;
  return {
    isTop,
    isLeft,
    isBottom,
    isRight,
    maxScroll,
    minScroll
  };
}

const defaultThreshold = {
  x: 0.2,
  y: 0.2
};
function getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, _ref, acceleration, thresholdPercentage) {
  let {
    top,
    left,
    right,
    bottom
  } = _ref;

  if (acceleration === void 0) {
    acceleration = 10;
  }

  if (thresholdPercentage === void 0) {
    thresholdPercentage = defaultThreshold;
  }

  const {
    isTop,
    isBottom,
    isLeft,
    isRight
  } = getScrollPosition(scrollContainer);
  const direction = {
    x: 0,
    y: 0
  };
  const speed = {
    x: 0,
    y: 0
  };
  const threshold = {
    height: scrollContainerRect.height * thresholdPercentage.y,
    width: scrollContainerRect.width * thresholdPercentage.x
  };

  if (!isTop && top <= scrollContainerRect.top + threshold.height) {
    // Scroll Up
    direction.y = Direction.Backward;
    speed.y = acceleration * Math.abs((scrollContainerRect.top + threshold.height - top) / threshold.height);
  } else if (!isBottom && bottom >= scrollContainerRect.bottom - threshold.height) {
    // Scroll Down
    direction.y = Direction.Forward;
    speed.y = acceleration * Math.abs((scrollContainerRect.bottom - threshold.height - bottom) / threshold.height);
  }

  if (!isRight && right >= scrollContainerRect.right - threshold.width) {
    // Scroll Right
    direction.x = Direction.Forward;
    speed.x = acceleration * Math.abs((scrollContainerRect.right - threshold.width - right) / threshold.width);
  } else if (!isLeft && left <= scrollContainerRect.left + threshold.width) {
    // Scroll Left
    direction.x = Direction.Backward;
    speed.x = acceleration * Math.abs((scrollContainerRect.left + threshold.width - left) / threshold.width);
  }

  return {
    direction,
    speed
  };
}

function getScrollElementRect(element) {
  if (element === document.scrollingElement) {
    const {
      innerWidth,
      innerHeight
    } = window;
    return {
      top: 0,
      left: 0,
      right: innerWidth,
      bottom: innerHeight,
      width: innerWidth,
      height: innerHeight
    };
  }

  const {
    top,
    left,
    right,
    bottom
  } = element.getBoundingClientRect();
  return {
    top,
    left,
    right,
    bottom,
    width: element.clientWidth,
    height: element.clientHeight
  };
}

function getScrollOffsets(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(acc, getScrollCoordinates(node));
  }, defaultCoordinates);
}
function getScrollXOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollXCoordinate(node);
  }, 0);
}
function getScrollYOffset(scrollableAncestors) {
  return scrollableAncestors.reduce((acc, node) => {
    return acc + getScrollYCoordinate(node);
  }, 0);
}

function scrollIntoViewIfNeeded(element, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }

  if (!element) {
    return;
  }

  const {
    top,
    left,
    bottom,
    right
  } = measure(element);
  const firstScrollableAncestor = getFirstScrollableAncestor(element);

  if (!firstScrollableAncestor) {
    return;
  }

  if (bottom <= 0 || right <= 0 || top >= window.innerHeight || left >= window.innerWidth) {
    element.scrollIntoView({
      block: 'center',
      inline: 'center'
    });
  }
}

const properties = [['x', ['left', 'right'], getScrollXOffset], ['y', ['top', 'bottom'], getScrollYOffset]];
class Rect {
  constructor(rect, element) {
    this.rect = void 0;
    this.width = void 0;
    this.height = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.right = void 0;
    this.left = void 0;
    const scrollableAncestors = getScrollableAncestors(element);
    const scrollOffsets = getScrollOffsets(scrollableAncestors);
    this.rect = { ...rect
    };
    this.width = rect.width;
    this.height = rect.height;

    for (const [axis, keys, getScrollOffset] of properties) {
      for (const key of keys) {
        Object.defineProperty(this, key, {
          get: () => {
            const currentOffsets = getScrollOffset(scrollableAncestors);
            const scrollOffsetsDeltla = scrollOffsets[axis] - currentOffsets;
            return this.rect[key] + scrollOffsetsDeltla;
          },
          enumerable: true
        });
      }
    }

    Object.defineProperty(this, 'rect', {
      enumerable: false
    });
  }

}

class Listeners {
  constructor(target) {
    this.target = void 0;
    this.listeners = [];

    this.removeAll = () => {
      this.listeners.forEach(listener => {
        var _this$target;

        return (_this$target = this.target) == null ? void 0 : _this$target.removeEventListener(...listener);
      });
    };

    this.target = target;
  }

  add(eventName, handler, options) {
    var _this$target2;

    (_this$target2 = this.target) == null ? void 0 : _this$target2.addEventListener(eventName, handler, options);
    this.listeners.push([eventName, handler, options]);
  }

}

function getEventListenerTarget(target) {
  // If the `event.target` element is removed from the document events will still be targeted
  // at it, and hence won't always bubble up to the window or document anymore.
  // If there is any risk of an element being removed while it is being dragged,
  // the best practice is to attach the event listeners directly to the target.
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
  const {
    EventTarget
  } = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(target);
  return target instanceof EventTarget ? target : (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(target);
}

function hasExceededDistance(delta, measurement) {
  const dx = Math.abs(delta.x);
  const dy = Math.abs(delta.y);

  if (typeof measurement === 'number') {
    return Math.sqrt(dx ** 2 + dy ** 2) > measurement;
  }

  if ('x' in measurement && 'y' in measurement) {
    return dx > measurement.x && dy > measurement.y;
  }

  if ('x' in measurement) {
    return dx > measurement.x;
  }

  if ('y' in measurement) {
    return dy > measurement.y;
  }

  return false;
}

var EventName;

(function (EventName) {
  EventName["Click"] = "click";
  EventName["DragStart"] = "dragstart";
  EventName["Keydown"] = "keydown";
  EventName["ContextMenu"] = "contextmenu";
  EventName["Resize"] = "resize";
  EventName["SelectionChange"] = "selectionchange";
  EventName["VisibilityChange"] = "visibilitychange";
})(EventName || (EventName = {}));

function preventDefault(event) {
  event.preventDefault();
}
function stopPropagation(event) {
  event.stopPropagation();
}

var KeyboardCode;

(function (KeyboardCode) {
  KeyboardCode["Space"] = "Space";
  KeyboardCode["Down"] = "ArrowDown";
  KeyboardCode["Right"] = "ArrowRight";
  KeyboardCode["Left"] = "ArrowLeft";
  KeyboardCode["Up"] = "ArrowUp";
  KeyboardCode["Esc"] = "Escape";
  KeyboardCode["Enter"] = "Enter";
  KeyboardCode["Tab"] = "Tab";
})(KeyboardCode || (KeyboardCode = {}));

const defaultKeyboardCodes = {
  start: [KeyboardCode.Space, KeyboardCode.Enter],
  cancel: [KeyboardCode.Esc],
  end: [KeyboardCode.Space, KeyboardCode.Enter, KeyboardCode.Tab]
};
const defaultKeyboardCoordinateGetter = (event, _ref) => {
  let {
    currentCoordinates
  } = _ref;

  switch (event.code) {
    case KeyboardCode.Right:
      return { ...currentCoordinates,
        x: currentCoordinates.x + 25
      };

    case KeyboardCode.Left:
      return { ...currentCoordinates,
        x: currentCoordinates.x - 25
      };

    case KeyboardCode.Down:
      return { ...currentCoordinates,
        y: currentCoordinates.y + 25
      };

    case KeyboardCode.Up:
      return { ...currentCoordinates,
        y: currentCoordinates.y - 25
      };
  }

  return undefined;
};

class KeyboardSensor {
  constructor(props) {
    this.props = void 0;
    this.autoScrollEnabled = false;
    this.referenceCoordinates = void 0;
    this.listeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    const {
      event: {
        target
      }
    } = props;
    this.props = props;
    this.listeners = new Listeners((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(target));
    this.windowListeners = new Listeners((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(target));
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.attach();
  }

  attach() {
    this.handleStart();
    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    setTimeout(() => this.listeners.add(EventName.Keydown, this.handleKeyDown));
  }

  handleStart() {
    const {
      activeNode,
      onStart
    } = this.props;
    const node = activeNode.node.current;

    if (node) {
      scrollIntoViewIfNeeded(node);
    }

    onStart(defaultCoordinates);
  }

  handleKeyDown(event) {
    if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isKeyboardEvent)(event)) {
      const {
        active,
        context,
        options
      } = this.props;
      const {
        keyboardCodes = defaultKeyboardCodes,
        coordinateGetter = defaultKeyboardCoordinateGetter,
        scrollBehavior = 'smooth'
      } = options;
      const {
        code
      } = event;

      if (keyboardCodes.end.includes(code)) {
        this.handleEnd(event);
        return;
      }

      if (keyboardCodes.cancel.includes(code)) {
        this.handleCancel(event);
        return;
      }

      const {
        collisionRect
      } = context.current;
      const currentCoordinates = collisionRect ? {
        x: collisionRect.left,
        y: collisionRect.top
      } : defaultCoordinates;

      if (!this.referenceCoordinates) {
        this.referenceCoordinates = currentCoordinates;
      }

      const newCoordinates = coordinateGetter(event, {
        active,
        context: context.current,
        currentCoordinates
      });

      if (newCoordinates) {
        const coordinatesDelta = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(newCoordinates, currentCoordinates);
        const scrollDelta = {
          x: 0,
          y: 0
        };
        const {
          scrollableAncestors
        } = context.current;

        for (const scrollContainer of scrollableAncestors) {
          const direction = event.code;
          const {
            isTop,
            isRight,
            isLeft,
            isBottom,
            maxScroll,
            minScroll
          } = getScrollPosition(scrollContainer);
          const scrollElementRect = getScrollElementRect(scrollContainer);
          const clampedCoordinates = {
            x: Math.min(direction === KeyboardCode.Right ? scrollElementRect.right - scrollElementRect.width / 2 : scrollElementRect.right, Math.max(direction === KeyboardCode.Right ? scrollElementRect.left : scrollElementRect.left + scrollElementRect.width / 2, newCoordinates.x)),
            y: Math.min(direction === KeyboardCode.Down ? scrollElementRect.bottom - scrollElementRect.height / 2 : scrollElementRect.bottom, Math.max(direction === KeyboardCode.Down ? scrollElementRect.top : scrollElementRect.top + scrollElementRect.height / 2, newCoordinates.y))
          };
          const canScrollX = direction === KeyboardCode.Right && !isRight || direction === KeyboardCode.Left && !isLeft;
          const canScrollY = direction === KeyboardCode.Down && !isBottom || direction === KeyboardCode.Up && !isTop;

          if (canScrollX && clampedCoordinates.x !== newCoordinates.x) {
            const newScrollCoordinates = scrollContainer.scrollLeft + coordinatesDelta.x;
            const canScrollToNewCoordinates = direction === KeyboardCode.Right && newScrollCoordinates <= maxScroll.x || direction === KeyboardCode.Left && newScrollCoordinates >= minScroll.x;

            if (canScrollToNewCoordinates && !coordinatesDelta.y) {
              // We don't need to update coordinates, the scroll adjustment alone will trigger
              // logic to auto-detect the new container we are over
              scrollContainer.scrollTo({
                left: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }

            if (canScrollToNewCoordinates) {
              scrollDelta.x = scrollContainer.scrollLeft - newScrollCoordinates;
            } else {
              scrollDelta.x = direction === KeyboardCode.Right ? scrollContainer.scrollLeft - maxScroll.x : scrollContainer.scrollLeft - minScroll.x;
            }

            if (scrollDelta.x) {
              scrollContainer.scrollBy({
                left: -scrollDelta.x,
                behavior: scrollBehavior
              });
            }

            break;
          } else if (canScrollY && clampedCoordinates.y !== newCoordinates.y) {
            const newScrollCoordinates = scrollContainer.scrollTop + coordinatesDelta.y;
            const canScrollToNewCoordinates = direction === KeyboardCode.Down && newScrollCoordinates <= maxScroll.y || direction === KeyboardCode.Up && newScrollCoordinates >= minScroll.y;

            if (canScrollToNewCoordinates && !coordinatesDelta.x) {
              // We don't need to update coordinates, the scroll adjustment alone will trigger
              // logic to auto-detect the new container we are over
              scrollContainer.scrollTo({
                top: newScrollCoordinates,
                behavior: scrollBehavior
              });
              return;
            }

            if (canScrollToNewCoordinates) {
              scrollDelta.y = scrollContainer.scrollTop - newScrollCoordinates;
            } else {
              scrollDelta.y = direction === KeyboardCode.Down ? scrollContainer.scrollTop - maxScroll.y : scrollContainer.scrollTop - minScroll.y;
            }

            if (scrollDelta.y) {
              scrollContainer.scrollBy({
                top: -scrollDelta.y,
                behavior: scrollBehavior
              });
            }

            break;
          }
        }

        this.handleMove(event, (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(newCoordinates, this.referenceCoordinates), scrollDelta));
      }
    }
  }

  handleMove(event, coordinates) {
    const {
      onMove
    } = this.props;
    event.preventDefault();
    onMove(coordinates);
  }

  handleEnd(event) {
    const {
      onEnd
    } = this.props;
    event.preventDefault();
    this.detach();
    onEnd();
  }

  handleCancel(event) {
    const {
      onCancel
    } = this.props;
    event.preventDefault();
    this.detach();
    onCancel();
  }

  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll();
  }

}
KeyboardSensor.activators = [{
  eventName: 'onKeyDown',
  handler: (event, _ref, _ref2) => {
    let {
      keyboardCodes = defaultKeyboardCodes,
      onActivation
    } = _ref;
    let {
      active
    } = _ref2;
    const {
      code
    } = event.nativeEvent;

    if (keyboardCodes.start.includes(code)) {
      const activator = active.activatorNode.current;

      if (activator && event.target !== activator) {
        return false;
      }

      event.preventDefault();
      onActivation == null ? void 0 : onActivation({
        event: event.nativeEvent
      });
      return true;
    }

    return false;
  }
}];

function isDistanceConstraint(constraint) {
  return Boolean(constraint && 'distance' in constraint);
}

function isDelayConstraint(constraint) {
  return Boolean(constraint && 'delay' in constraint);
}

class AbstractPointerSensor {
  constructor(props, events, listenerTarget) {
    var _getEventCoordinates;

    if (listenerTarget === void 0) {
      listenerTarget = getEventListenerTarget(props.event.target);
    }

    this.props = void 0;
    this.events = void 0;
    this.autoScrollEnabled = true;
    this.document = void 0;
    this.activated = false;
    this.initialCoordinates = void 0;
    this.timeoutId = null;
    this.listeners = void 0;
    this.documentListeners = void 0;
    this.windowListeners = void 0;
    this.props = props;
    this.events = events;
    const {
      event
    } = props;
    const {
      target
    } = event;
    this.props = props;
    this.events = events;
    this.document = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(target);
    this.documentListeners = new Listeners(this.document);
    this.listeners = new Listeners(listenerTarget);
    this.windowListeners = new Listeners((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(target));
    this.initialCoordinates = (_getEventCoordinates = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getEventCoordinates)(event)) != null ? _getEventCoordinates : defaultCoordinates;
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.removeTextSelection = this.removeTextSelection.bind(this);
    this.attach();
  }

  attach() {
    const {
      events,
      props: {
        options: {
          activationConstraint,
          bypassActivationConstraint
        }
      }
    } = this;
    this.listeners.add(events.move.name, this.handleMove, {
      passive: false
    });
    this.listeners.add(events.end.name, this.handleEnd);

    if (events.cancel) {
      this.listeners.add(events.cancel.name, this.handleCancel);
    }

    this.windowListeners.add(EventName.Resize, this.handleCancel);
    this.windowListeners.add(EventName.DragStart, preventDefault);
    this.windowListeners.add(EventName.VisibilityChange, this.handleCancel);
    this.windowListeners.add(EventName.ContextMenu, preventDefault);
    this.documentListeners.add(EventName.Keydown, this.handleKeydown);

    if (activationConstraint) {
      if (bypassActivationConstraint != null && bypassActivationConstraint({
        event: this.props.event,
        activeNode: this.props.activeNode,
        options: this.props.options
      })) {
        return this.handleStart();
      }

      if (isDelayConstraint(activationConstraint)) {
        this.timeoutId = setTimeout(this.handleStart, activationConstraint.delay);
        this.handlePending(activationConstraint);
        return;
      }

      if (isDistanceConstraint(activationConstraint)) {
        this.handlePending(activationConstraint);
        return;
      }
    }

    this.handleStart();
  }

  detach() {
    this.listeners.removeAll();
    this.windowListeners.removeAll(); // Wait until the next event loop before removing document listeners
    // This is necessary because we listen for `click` and `selection` events on the document

    setTimeout(this.documentListeners.removeAll, 50);

    if (this.timeoutId !== null) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  handlePending(constraint, offset) {
    const {
      active,
      onPending
    } = this.props;
    onPending(active, constraint, this.initialCoordinates, offset);
  }

  handleStart() {
    const {
      initialCoordinates
    } = this;
    const {
      onStart
    } = this.props;

    if (initialCoordinates) {
      this.activated = true; // Stop propagation of click events once activation constraints are met

      this.documentListeners.add(EventName.Click, stopPropagation, {
        capture: true
      }); // Remove any text selection from the document

      this.removeTextSelection(); // Prevent further text selection while dragging

      this.documentListeners.add(EventName.SelectionChange, this.removeTextSelection);
      onStart(initialCoordinates);
    }
  }

  handleMove(event) {
    var _getEventCoordinates2;

    const {
      activated,
      initialCoordinates,
      props
    } = this;
    const {
      onMove,
      options: {
        activationConstraint
      }
    } = props;

    if (!initialCoordinates) {
      return;
    }

    const coordinates = (_getEventCoordinates2 = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getEventCoordinates)(event)) != null ? _getEventCoordinates2 : defaultCoordinates;
    const delta = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(initialCoordinates, coordinates); // Constraint validation

    if (!activated && activationConstraint) {
      if (isDistanceConstraint(activationConstraint)) {
        if (activationConstraint.tolerance != null && hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }

        if (hasExceededDistance(delta, activationConstraint.distance)) {
          return this.handleStart();
        }
      }

      if (isDelayConstraint(activationConstraint)) {
        if (hasExceededDistance(delta, activationConstraint.tolerance)) {
          return this.handleCancel();
        }
      }

      this.handlePending(activationConstraint, delta);
      return;
    }

    if (event.cancelable) {
      event.preventDefault();
    }

    onMove(coordinates);
  }

  handleEnd() {
    const {
      onAbort,
      onEnd
    } = this.props;
    this.detach();

    if (!this.activated) {
      onAbort(this.props.active);
    }

    onEnd();
  }

  handleCancel() {
    const {
      onAbort,
      onCancel
    } = this.props;
    this.detach();

    if (!this.activated) {
      onAbort(this.props.active);
    }

    onCancel();
  }

  handleKeydown(event) {
    if (event.code === KeyboardCode.Esc) {
      this.handleCancel();
    }
  }

  removeTextSelection() {
    var _this$document$getSel;

    (_this$document$getSel = this.document.getSelection()) == null ? void 0 : _this$document$getSel.removeAllRanges();
  }

}

const events = {
  cancel: {
    name: 'pointercancel'
  },
  move: {
    name: 'pointermove'
  },
  end: {
    name: 'pointerup'
  }
};
class PointerSensor extends AbstractPointerSensor {
  constructor(props) {
    const {
      event
    } = props; // Pointer events stop firing if the target is unmounted while dragging
    // Therefore we attach listeners to the owner document instead

    const listenerTarget = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(event.target);
    super(props, events, listenerTarget);
  }

}
PointerSensor.activators = [{
  eventName: 'onPointerDown',
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;

    if (!event.isPrimary || event.button !== 0) {
      return false;
    }

    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];

const events$1 = {
  move: {
    name: 'mousemove'
  },
  end: {
    name: 'mouseup'
  }
};
var MouseButton;

(function (MouseButton) {
  MouseButton[MouseButton["RightClick"] = 2] = "RightClick";
})(MouseButton || (MouseButton = {}));

class MouseSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$1, (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getOwnerDocument)(props.event.target));
  }

}
MouseSensor.activators = [{
  eventName: 'onMouseDown',
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;

    if (event.button === MouseButton.RightClick) {
      return false;
    }

    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];

const events$2 = {
  cancel: {
    name: 'touchcancel'
  },
  move: {
    name: 'touchmove'
  },
  end: {
    name: 'touchend'
  }
};
class TouchSensor extends AbstractPointerSensor {
  constructor(props) {
    super(props, events$2);
  }

  static setup() {
    // Adding a non-capture and non-passive `touchmove` listener in order
    // to force `event.preventDefault()` calls to work in dynamically added
    // touchmove event handlers. This is required for iOS Safari.
    window.addEventListener(events$2.move.name, noop, {
      capture: false,
      passive: false
    });
    return function teardown() {
      window.removeEventListener(events$2.move.name, noop);
    }; // We create a new handler because the teardown function of another sensor
    // could remove our event listener if we use a referentially equal listener.

    function noop() {}
  }

}
TouchSensor.activators = [{
  eventName: 'onTouchStart',
  handler: (_ref, _ref2) => {
    let {
      nativeEvent: event
    } = _ref;
    let {
      onActivation
    } = _ref2;
    const {
      touches
    } = event;

    if (touches.length > 1) {
      return false;
    }

    onActivation == null ? void 0 : onActivation({
      event
    });
    return true;
  }
}];

var AutoScrollActivator;

(function (AutoScrollActivator) {
  AutoScrollActivator[AutoScrollActivator["Pointer"] = 0] = "Pointer";
  AutoScrollActivator[AutoScrollActivator["DraggableRect"] = 1] = "DraggableRect";
})(AutoScrollActivator || (AutoScrollActivator = {}));

var TraversalOrder;

(function (TraversalOrder) {
  TraversalOrder[TraversalOrder["TreeOrder"] = 0] = "TreeOrder";
  TraversalOrder[TraversalOrder["ReversedTreeOrder"] = 1] = "ReversedTreeOrder";
})(TraversalOrder || (TraversalOrder = {}));

function useAutoScroller(_ref) {
  let {
    acceleration,
    activator = AutoScrollActivator.Pointer,
    canScroll,
    draggingRect,
    enabled,
    interval = 5,
    order = TraversalOrder.TreeOrder,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects,
    delta,
    threshold
  } = _ref;
  const scrollIntent = useScrollIntent({
    delta,
    disabled: !enabled
  });
  const [setAutoScrollInterval, clearAutoScrollInterval] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useInterval)();
  const scrollSpeed = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    x: 0,
    y: 0
  });
  const scrollDirection = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    x: 0,
    y: 0
  });
  const rect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    switch (activator) {
      case AutoScrollActivator.Pointer:
        return pointerCoordinates ? {
          top: pointerCoordinates.y,
          bottom: pointerCoordinates.y,
          left: pointerCoordinates.x,
          right: pointerCoordinates.x
        } : null;

      case AutoScrollActivator.DraggableRect:
        return draggingRect;
    }
  }, [activator, draggingRect, pointerCoordinates]);
  const scrollContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const autoScroll = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) {
      return;
    }

    const scrollLeft = scrollSpeed.current.x * scrollDirection.current.x;
    const scrollTop = scrollSpeed.current.y * scrollDirection.current.y;
    scrollContainer.scrollBy(scrollLeft, scrollTop);
  }, []);
  const sortedScrollableAncestors = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => order === TraversalOrder.TreeOrder ? [...scrollableAncestors].reverse() : scrollableAncestors, [order, scrollableAncestors]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!enabled || !scrollableAncestors.length || !rect) {
      clearAutoScrollInterval();
      return;
    }

    for (const scrollContainer of sortedScrollableAncestors) {
      if ((canScroll == null ? void 0 : canScroll(scrollContainer)) === false) {
        continue;
      }

      const index = scrollableAncestors.indexOf(scrollContainer);
      const scrollContainerRect = scrollableAncestorRects[index];

      if (!scrollContainerRect) {
        continue;
      }

      const {
        direction,
        speed
      } = getScrollDirectionAndSpeed(scrollContainer, scrollContainerRect, rect, acceleration, threshold);

      for (const axis of ['x', 'y']) {
        if (!scrollIntent[axis][direction[axis]]) {
          speed[axis] = 0;
          direction[axis] = 0;
        }
      }

      if (speed.x > 0 || speed.y > 0) {
        clearAutoScrollInterval();
        scrollContainerRef.current = scrollContainer;
        setAutoScrollInterval(autoScroll, interval);
        scrollSpeed.current = speed;
        scrollDirection.current = direction;
        return;
      }
    }

    scrollSpeed.current = {
      x: 0,
      y: 0
    };
    scrollDirection.current = {
      x: 0,
      y: 0
    };
    clearAutoScrollInterval();
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [acceleration, autoScroll, canScroll, clearAutoScrollInterval, enabled, interval, // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(rect), // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(scrollIntent), setAutoScrollInterval, scrollableAncestors, sortedScrollableAncestors, scrollableAncestorRects, // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(threshold)]);
}
const defaultScrollIntent = {
  x: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  },
  y: {
    [Direction.Backward]: false,
    [Direction.Forward]: false
  }
};

function useScrollIntent(_ref2) {
  let {
    delta,
    disabled
  } = _ref2;
  const previousDelta = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.usePrevious)(delta);
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(previousIntent => {
    if (disabled || !previousDelta || !previousIntent) {
      // Reset scroll intent tracking when auto-scrolling is disabled
      return defaultScrollIntent;
    }

    const direction = {
      x: Math.sign(delta.x - previousDelta.x),
      y: Math.sign(delta.y - previousDelta.y)
    }; // Keep track of the user intent to scroll in each direction for both axis

    return {
      x: {
        [Direction.Backward]: previousIntent.x[Direction.Backward] || direction.x === -1,
        [Direction.Forward]: previousIntent.x[Direction.Forward] || direction.x === 1
      },
      y: {
        [Direction.Backward]: previousIntent.y[Direction.Backward] || direction.y === -1,
        [Direction.Forward]: previousIntent.y[Direction.Forward] || direction.y === 1
      }
    };
  }, [disabled, delta, previousDelta]);
}

function useCachedNode(draggableNodes, id) {
  const draggableNode = id != null ? draggableNodes.get(id) : undefined;
  const node = draggableNode ? draggableNode.node.current : null;
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(cachedNode => {
    var _ref;

    if (id == null) {
      return null;
    } // In some cases, the draggable node can unmount while dragging
    // This is the case for virtualized lists. In those situations,
    // we fall back to the last known value for that node.


    return (_ref = node != null ? node : cachedNode) != null ? _ref : null;
  }, [node, id]);
}

function useCombineActivators(sensors, getSyntheticHandler) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => sensors.reduce((accumulator, sensor) => {
    const {
      sensor: Sensor
    } = sensor;
    const sensorActivators = Sensor.activators.map(activator => ({
      eventName: activator.eventName,
      handler: getSyntheticHandler(activator.handler, sensor)
    }));
    return [...accumulator, ...sensorActivators];
  }, []), [sensors, getSyntheticHandler]);
}

var MeasuringStrategy;

(function (MeasuringStrategy) {
  MeasuringStrategy[MeasuringStrategy["Always"] = 0] = "Always";
  MeasuringStrategy[MeasuringStrategy["BeforeDragging"] = 1] = "BeforeDragging";
  MeasuringStrategy[MeasuringStrategy["WhileDragging"] = 2] = "WhileDragging";
})(MeasuringStrategy || (MeasuringStrategy = {}));

var MeasuringFrequency;

(function (MeasuringFrequency) {
  MeasuringFrequency["Optimized"] = "optimized";
})(MeasuringFrequency || (MeasuringFrequency = {}));

const defaultValue = /*#__PURE__*/new Map();
function useDroppableMeasuring(containers, _ref) {
  let {
    dragging,
    dependencies,
    config
  } = _ref;
  const [queue, setQueue] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    frequency,
    measure,
    strategy
  } = config;
  const containersRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(containers);
  const disabled = isDisabled();
  const disabledRef = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(disabled);
  const measureDroppableContainers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (ids) {
    if (ids === void 0) {
      ids = [];
    }

    if (disabledRef.current) {
      return;
    }

    setQueue(value => {
      if (value === null) {
        return ids;
      }

      return value.concat(ids.filter(id => !value.includes(id)));
    });
  }, [disabledRef]);
  const timeoutId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const droppableRects = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(previousValue => {
    if (disabled && !dragging) {
      return defaultValue;
    }

    if (!previousValue || previousValue === defaultValue || containersRef.current !== containers || queue != null) {
      const map = new Map();

      for (let container of containers) {
        if (!container) {
          continue;
        }

        if (queue && queue.length > 0 && !queue.includes(container.id) && container.rect.current) {
          // This container does not need to be re-measured
          map.set(container.id, container.rect.current);
          continue;
        }

        const node = container.node.current;
        const rect = node ? new Rect(measure(node), node) : null;
        container.rect.current = rect;

        if (rect) {
          map.set(container.id, rect);
        }
      }

      return map;
    }

    return previousValue;
  }, [containers, queue, dragging, disabled, measure]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    containersRef.current = containers;
  }, [containers]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabled) {
      return;
    }

    measureDroppableContainers();
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [dragging, disabled]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (queue && queue.length > 0) {
      setQueue(null);
    }
  }, //eslint-disable-next-line react-hooks/exhaustive-deps
  [JSON.stringify(queue)]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabled || typeof frequency !== 'number' || timeoutId.current !== null) {
      return;
    }

    timeoutId.current = setTimeout(() => {
      measureDroppableContainers();
      timeoutId.current = null;
    }, frequency);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [frequency, disabled, measureDroppableContainers, ...dependencies]);
  return {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled: queue != null
  };

  function isDisabled() {
    switch (strategy) {
      case MeasuringStrategy.Always:
        return false;

      case MeasuringStrategy.BeforeDragging:
        return dragging;

      default:
        return !dragging;
    }
  }
}

function useInitialValue(value, computeFn) {
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(previousValue => {
    if (!value) {
      return null;
    }

    if (previousValue) {
      return previousValue;
    }

    return typeof computeFn === 'function' ? computeFn(value) : value;
  }, [computeFn, value]);
}

function useInitialRect(node, measure) {
  return useInitialValue(node, measure);
}

/**
 * Returns a new MutationObserver instance.
 * If `MutationObserver` is undefined in the execution environment, returns `undefined`.
 */

function useMutationObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleMutations = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useEvent)(callback);
  const mutationObserver = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (disabled || typeof window === 'undefined' || typeof window.MutationObserver === 'undefined') {
      return undefined;
    }

    const {
      MutationObserver
    } = window;
    return new MutationObserver(handleMutations);
  }, [handleMutations, disabled]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => mutationObserver == null ? void 0 : mutationObserver.disconnect();
  }, [mutationObserver]);
  return mutationObserver;
}

/**
 * Returns a new ResizeObserver instance bound to the `onResize` callback.
 * If `ResizeObserver` is undefined in the execution environment, returns `undefined`.
 */

function useResizeObserver(_ref) {
  let {
    callback,
    disabled
  } = _ref;
  const handleResize = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useEvent)(callback);
  const resizeObserver = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (disabled || typeof window === 'undefined' || typeof window.ResizeObserver === 'undefined') {
      return undefined;
    }

    const {
      ResizeObserver
    } = window;
    return new ResizeObserver(handleResize);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [disabled]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => resizeObserver == null ? void 0 : resizeObserver.disconnect();
  }, [resizeObserver]);
  return resizeObserver;
}

function defaultMeasure(element) {
  return new Rect(getClientRect(element), element);
}

function useRect(element, measure, fallbackRect) {
  if (measure === void 0) {
    measure = defaultMeasure;
  }

  const [rect, setRect] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);

  function measureRect() {
    setRect(currentRect => {
      if (!element) {
        return null;
      }

      if (element.isConnected === false) {
        var _ref;

        // Fall back to last rect we measured if the element is
        // no longer connected to the DOM.
        return (_ref = currentRect != null ? currentRect : fallbackRect) != null ? _ref : null;
      }

      const newRect = measure(element);

      if (JSON.stringify(currentRect) === JSON.stringify(newRect)) {
        return currentRect;
      }

      return newRect;
    });
  }

  const mutationObserver = useMutationObserver({
    callback(records) {
      if (!element) {
        return;
      }

      for (const record of records) {
        const {
          type,
          target
        } = record;

        if (type === 'childList' && target instanceof HTMLElement && target.contains(element)) {
          measureRect();
          break;
        }
      }
    }

  });
  const resizeObserver = useResizeObserver({
    callback: measureRect
  });
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    measureRect();

    if (element) {
      resizeObserver == null ? void 0 : resizeObserver.observe(element);
      mutationObserver == null ? void 0 : mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      mutationObserver == null ? void 0 : mutationObserver.disconnect();
    }
  }, [element]);
  return rect;
}

function useRectDelta(rect) {
  const initialRect = useInitialValue(rect);
  return getRectDelta(rect, initialRect);
}

const defaultValue$1 = [];
function useScrollableAncestors(node) {
  const previousNode = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(node);
  const ancestors = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLazyMemo)(previousValue => {
    if (!node) {
      return defaultValue$1;
    }

    if (previousValue && previousValue !== defaultValue$1 && node && previousNode.current && node.parentNode === previousNode.current.parentNode) {
      return previousValue;
    }

    return getScrollableAncestors(node);
  }, [node]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    previousNode.current = node;
  }, [node]);
  return ancestors;
}

function useScrollOffsets(elements) {
  const [scrollCoordinates, setScrollCoordinates] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const prevElements = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(elements); // To-do: Throttle the handleScroll callback

  const handleScroll = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(event => {
    const scrollingElement = getScrollableElement(event.target);

    if (!scrollingElement) {
      return;
    }

    setScrollCoordinates(scrollCoordinates => {
      if (!scrollCoordinates) {
        return null;
      }

      scrollCoordinates.set(scrollingElement, getScrollCoordinates(scrollingElement));
      return new Map(scrollCoordinates);
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const previousElements = prevElements.current;

    if (elements !== previousElements) {
      cleanup(previousElements);
      const entries = elements.map(element => {
        const scrollableElement = getScrollableElement(element);

        if (scrollableElement) {
          scrollableElement.addEventListener('scroll', handleScroll, {
            passive: true
          });
          return [scrollableElement, getScrollCoordinates(scrollableElement)];
        }

        return null;
      }).filter(entry => entry != null);
      setScrollCoordinates(entries.length ? new Map(entries) : null);
      prevElements.current = elements;
    }

    return () => {
      cleanup(elements);
      cleanup(previousElements);
    };

    function cleanup(elements) {
      elements.forEach(element => {
        const scrollableElement = getScrollableElement(element);
        scrollableElement == null ? void 0 : scrollableElement.removeEventListener('scroll', handleScroll);
      });
    }
  }, [handleScroll, elements]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (elements.length) {
      return scrollCoordinates ? Array.from(scrollCoordinates.values()).reduce((acc, coordinates) => (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(acc, coordinates), defaultCoordinates) : getScrollOffsets(elements);
    }

    return defaultCoordinates;
  }, [elements, scrollCoordinates]);
}

function useScrollOffsetsDelta(scrollOffsets, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }

  const initialScrollOffsets = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    initialScrollOffsets.current = null;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  dependencies);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const hasScrollOffsets = scrollOffsets !== defaultCoordinates;

    if (hasScrollOffsets && !initialScrollOffsets.current) {
      initialScrollOffsets.current = scrollOffsets;
    }

    if (!hasScrollOffsets && initialScrollOffsets.current) {
      initialScrollOffsets.current = null;
    }
  }, [scrollOffsets]);
  return initialScrollOffsets.current ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(scrollOffsets, initialScrollOffsets.current) : defaultCoordinates;
}

function useSensorSetup(sensors) {
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.canUseDOM) {
      return;
    }

    const teardownFns = sensors.map(_ref => {
      let {
        sensor
      } = _ref;
      return sensor.setup == null ? void 0 : sensor.setup();
    });
    return () => {
      for (const teardown of teardownFns) {
        teardown == null ? void 0 : teardown();
      }
    };
  }, // TO-DO: Sensors length could theoretically change which would not be a valid dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  sensors.map(_ref2 => {
    let {
      sensor
    } = _ref2;
    return sensor;
  }));
}

function useSyntheticListeners(listeners, id) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return listeners.reduce((acc, _ref) => {
      let {
        eventName,
        handler
      } = _ref;

      acc[eventName] = event => {
        handler(event, id);
      };

      return acc;
    }, {});
  }, [listeners, id]);
}

function useWindowRect(element) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => element ? getWindowClientRect(element) : null, [element]);
}

const defaultValue$2 = [];
function useRects(elements, measure) {
  if (measure === void 0) {
    measure = getClientRect;
  }

  const [firstElement] = elements;
  const windowRect = useWindowRect(firstElement ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(firstElement) : null);
  const [rects, setRects] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultValue$2);

  function measureRects() {
    setRects(() => {
      if (!elements.length) {
        return defaultValue$2;
      }

      return elements.map(element => isDocumentScrollingElement(element) ? windowRect : new Rect(measure(element), element));
    });
  }

  const resizeObserver = useResizeObserver({
    callback: measureRects
  });
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    resizeObserver == null ? void 0 : resizeObserver.disconnect();
    measureRects();
    elements.forEach(element => resizeObserver == null ? void 0 : resizeObserver.observe(element));
  }, [elements]);
  return rects;
}

function getMeasurableNode(node) {
  if (!node) {
    return null;
  }

  if (node.children.length > 1) {
    return node;
  }

  const firstChild = node.children[0];
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(firstChild) ? firstChild : node;
}

function useDragOverlayMeasuring(_ref) {
  let {
    measure
  } = _ref;
  const [rect, setRect] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const handleResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(entries => {
    for (const {
      target
    } of entries) {
      if ((0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isHTMLElement)(target)) {
        setRect(rect => {
          const newRect = measure(target);
          return rect ? { ...rect,
            width: newRect.width,
            height: newRect.height
          } : newRect;
        });
        break;
      }
    }
  }, [measure]);
  const resizeObserver = useResizeObserver({
    callback: handleResize
  });
  const handleNodeChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(element => {
    const node = getMeasurableNode(element);
    resizeObserver == null ? void 0 : resizeObserver.disconnect();

    if (node) {
      resizeObserver == null ? void 0 : resizeObserver.observe(node);
    }

    setRect(node ? measure(node) : null);
  }, [measure, resizeObserver]);
  const [nodeRef, setRef] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useNodeRef)(handleNodeChange);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    nodeRef,
    rect,
    setRef
  }), [rect, nodeRef, setRef]);
}

const defaultSensors = [{
  sensor: PointerSensor,
  options: {}
}, {
  sensor: KeyboardSensor,
  options: {}
}];
const defaultData = {
  current: {}
};
const defaultMeasuringConfiguration = {
  draggable: {
    measure: getTransformAgnosticClientRect
  },
  droppable: {
    measure: getTransformAgnosticClientRect,
    strategy: MeasuringStrategy.WhileDragging,
    frequency: MeasuringFrequency.Optimized
  },
  dragOverlay: {
    measure: getClientRect
  }
};

class DroppableContainersMap extends Map {
  get(id) {
    var _super$get;

    return id != null ? (_super$get = super.get(id)) != null ? _super$get : undefined : undefined;
  }

  toArray() {
    return Array.from(this.values());
  }

  getEnabled() {
    return this.toArray().filter(_ref => {
      let {
        disabled
      } = _ref;
      return !disabled;
    });
  }

  getNodeFor(id) {
    var _this$get$node$curren, _this$get;

    return (_this$get$node$curren = (_this$get = this.get(id)) == null ? void 0 : _this$get.node.current) != null ? _this$get$node$curren : undefined;
  }

}

const defaultPublicContext = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: /*#__PURE__*/new Map(),
  droppableRects: /*#__PURE__*/new Map(),
  droppableContainers: /*#__PURE__*/new DroppableContainersMap(),
  over: null,
  dragOverlay: {
    nodeRef: {
      current: null
    },
    rect: null,
    setRef: noop
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: defaultMeasuringConfiguration,
  measureDroppableContainers: noop,
  windowRect: null,
  measuringScheduled: false
};
const defaultInternalContext = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
    draggable: ''
  },
  dispatch: noop,
  draggableNodes: /*#__PURE__*/new Map(),
  over: null,
  measureDroppableContainers: noop
};
const InternalContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultInternalContext);
const PublicContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(defaultPublicContext);

function getInitialState() {
  return {
    draggable: {
      active: null,
      initialCoordinates: {
        x: 0,
        y: 0
      },
      nodes: new Map(),
      translate: {
        x: 0,
        y: 0
      }
    },
    droppable: {
      containers: new DroppableContainersMap()
    }
  };
}
function reducer(state, action) {
  switch (action.type) {
    case Action.DragStart:
      return { ...state,
        draggable: { ...state.draggable,
          initialCoordinates: action.initialCoordinates,
          active: action.active
        }
      };

    case Action.DragMove:
      if (state.draggable.active == null) {
        return state;
      }

      return { ...state,
        draggable: { ...state.draggable,
          translate: {
            x: action.coordinates.x - state.draggable.initialCoordinates.x,
            y: action.coordinates.y - state.draggable.initialCoordinates.y
          }
        }
      };

    case Action.DragEnd:
    case Action.DragCancel:
      return { ...state,
        draggable: { ...state.draggable,
          active: null,
          initialCoordinates: {
            x: 0,
            y: 0
          },
          translate: {
            x: 0,
            y: 0
          }
        }
      };

    case Action.RegisterDroppable:
      {
        const {
          element
        } = action;
        const {
          id
        } = element;
        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.set(id, element);
        return { ...state,
          droppable: { ...state.droppable,
            containers
          }
        };
      }

    case Action.SetDroppableDisabled:
      {
        const {
          id,
          key,
          disabled
        } = action;
        const element = state.droppable.containers.get(id);

        if (!element || key !== element.key) {
          return state;
        }

        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.set(id, { ...element,
          disabled
        });
        return { ...state,
          droppable: { ...state.droppable,
            containers
          }
        };
      }

    case Action.UnregisterDroppable:
      {
        const {
          id,
          key
        } = action;
        const element = state.droppable.containers.get(id);

        if (!element || key !== element.key) {
          return state;
        }

        const containers = new DroppableContainersMap(state.droppable.containers);
        containers.delete(id);
        return { ...state,
          droppable: { ...state.droppable,
            containers
          }
        };
      }

    default:
      {
        return state;
      }
  }
}

function RestoreFocus(_ref) {
  let {
    disabled
  } = _ref;
  const {
    active,
    activatorEvent,
    draggableNodes
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(InternalContext);
  const previousActivatorEvent = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.usePrevious)(activatorEvent);
  const previousActiveId = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.usePrevious)(active == null ? void 0 : active.id); // Restore keyboard focus on the activator node

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabled) {
      return;
    }

    if (!activatorEvent && previousActivatorEvent && previousActiveId != null) {
      if (!(0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isKeyboardEvent)(previousActivatorEvent)) {
        return;
      }

      if (document.activeElement === previousActivatorEvent.target) {
        // No need to restore focus
        return;
      }

      const draggableNode = draggableNodes.get(previousActiveId);

      if (!draggableNode) {
        return;
      }

      const {
        activatorNode,
        node
      } = draggableNode;

      if (!activatorNode.current && !node.current) {
        return;
      }

      requestAnimationFrame(() => {
        for (const element of [activatorNode.current, node.current]) {
          if (!element) {
            continue;
          }

          const focusableNode = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.findFirstFocusableNode)(element);

          if (focusableNode) {
            focusableNode.focus();
            break;
          }
        }
      });
    }
  }, [activatorEvent, disabled, draggableNodes, previousActiveId, previousActivatorEvent]);
  return null;
}

function applyModifiers(modifiers, _ref) {
  let {
    transform,
    ...args
  } = _ref;
  return modifiers != null && modifiers.length ? modifiers.reduce((accumulator, modifier) => {
    return modifier({
      transform: accumulator,
      ...args
    });
  }, transform) : transform;
}

function useMeasuringConfiguration(config) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    draggable: { ...defaultMeasuringConfiguration.draggable,
      ...(config == null ? void 0 : config.draggable)
    },
    droppable: { ...defaultMeasuringConfiguration.droppable,
      ...(config == null ? void 0 : config.droppable)
    },
    dragOverlay: { ...defaultMeasuringConfiguration.dragOverlay,
      ...(config == null ? void 0 : config.dragOverlay)
    }
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [config == null ? void 0 : config.draggable, config == null ? void 0 : config.droppable, config == null ? void 0 : config.dragOverlay]);
}

function useLayoutShiftScrollCompensation(_ref) {
  let {
    activeNode,
    measure,
    initialRect,
    config = true
  } = _ref;
  const initialized = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const {
    x,
    y
  } = typeof config === 'boolean' ? {
    x: config,
    y: config
  } : config;
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    const disabled = !x && !y;

    if (disabled || !activeNode) {
      initialized.current = false;
      return;
    }

    if (initialized.current || !initialRect) {
      // Return early if layout shift scroll compensation was already attempted
      // or if there is no initialRect to compare to.
      return;
    } // Get the most up to date node ref for the active draggable


    const node = activeNode == null ? void 0 : activeNode.node.current;

    if (!node || node.isConnected === false) {
      // Return early if there is no attached node ref or if the node is
      // disconnected from the document.
      return;
    }

    const rect = measure(node);
    const rectDelta = getRectDelta(rect, initialRect);

    if (!x) {
      rectDelta.x = 0;
    }

    if (!y) {
      rectDelta.y = 0;
    } // Only perform layout shift scroll compensation once


    initialized.current = true;

    if (Math.abs(rectDelta.x) > 0 || Math.abs(rectDelta.y) > 0) {
      const firstScrollableAncestor = getFirstScrollableAncestor(node);

      if (firstScrollableAncestor) {
        firstScrollableAncestor.scrollBy({
          top: rectDelta.y,
          left: rectDelta.x
        });
      }
    }
  }, [activeNode, x, y, initialRect, measure]);
}

const ActiveDraggableContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({ ...defaultCoordinates,
  scaleX: 1,
  scaleY: 1
});
var Status;

(function (Status) {
  Status[Status["Uninitialized"] = 0] = "Uninitialized";
  Status[Status["Initializing"] = 1] = "Initializing";
  Status[Status["Initialized"] = 2] = "Initialized";
})(Status || (Status = {}));

const DndContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function DndContext(_ref) {
  var _sensorContext$curren, _dragOverlay$nodeRef$, _dragOverlay$rect, _over$rect;

  let {
    id,
    accessibility,
    autoScroll = true,
    children,
    sensors = defaultSensors,
    collisionDetection = rectIntersection,
    measuring,
    modifiers,
    ...props
  } = _ref;
  const store = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(reducer, undefined, getInitialState);
  const [state, dispatch] = store;
  const [dispatchMonitorEvent, registerMonitorListener] = useDndMonitorProvider();
  const [status, setStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Status.Uninitialized);
  const isInitialized = status === Status.Initialized;
  const {
    draggable: {
      active: activeId,
      nodes: draggableNodes,
      translate
    },
    droppable: {
      containers: droppableContainers
    }
  } = state;
  const node = activeId != null ? draggableNodes.get(activeId) : null;
  const activeRects = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    initial: null,
    translated: null
  });
  const active = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    var _node$data;

    return activeId != null ? {
      id: activeId,
      // It's possible for the active node to unmount while dragging
      data: (_node$data = node == null ? void 0 : node.data) != null ? _node$data : defaultData,
      rect: activeRects
    } : null;
  }, [activeId, node]);
  const activeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [activeSensor, setActiveSensor] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [activatorEvent, setActivatorEvent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const latestProps = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(props, Object.values(props));
  const draggableDescribedById = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)("DndDescribedBy", id);
  const enabledDroppableContainers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => droppableContainers.getEnabled(), [droppableContainers]);
  const measuringConfiguration = useMeasuringConfiguration(measuring);
  const {
    droppableRects,
    measureDroppableContainers,
    measuringScheduled
  } = useDroppableMeasuring(enabledDroppableContainers, {
    dragging: isInitialized,
    dependencies: [translate.x, translate.y],
    config: measuringConfiguration.droppable
  });
  const activeNode = useCachedNode(draggableNodes, activeId);
  const activationCoordinates = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => activatorEvent ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getEventCoordinates)(activatorEvent) : null, [activatorEvent]);
  const autoScrollOptions = getAutoScrollerOptions();
  const initialActiveNodeRect = useInitialRect(activeNode, measuringConfiguration.draggable.measure);
  useLayoutShiftScrollCompensation({
    activeNode: activeId != null ? draggableNodes.get(activeId) : null,
    config: autoScrollOptions.layoutShiftCompensation,
    initialRect: initialActiveNodeRect,
    measure: measuringConfiguration.draggable.measure
  });
  const activeNodeRect = useRect(activeNode, measuringConfiguration.draggable.measure, initialActiveNodeRect);
  const containerNodeRect = useRect(activeNode ? activeNode.parentElement : null);
  const sensorContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    activatorEvent: null,
    active: null,
    activeNode,
    collisionRect: null,
    collisions: null,
    droppableRects,
    draggableNodes,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
  });
  const overNode = droppableContainers.getNodeFor((_sensorContext$curren = sensorContext.current.over) == null ? void 0 : _sensorContext$curren.id);
  const dragOverlay = useDragOverlayMeasuring({
    measure: measuringConfiguration.dragOverlay.measure
  }); // Use the rect of the drag overlay if it is mounted

  const draggingNode = (_dragOverlay$nodeRef$ = dragOverlay.nodeRef.current) != null ? _dragOverlay$nodeRef$ : activeNode;
  const draggingNodeRect = isInitialized ? (_dragOverlay$rect = dragOverlay.rect) != null ? _dragOverlay$rect : activeNodeRect : null;
  const usesDragOverlay = Boolean(dragOverlay.nodeRef.current && dragOverlay.rect); // The delta between the previous and new position of the draggable node
  // is only relevant when there is no drag overlay

  const nodeRectDelta = useRectDelta(usesDragOverlay ? null : activeNodeRect); // Get the window rect of the dragging node

  const windowRect = useWindowRect(draggingNode ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(draggingNode) : null); // Get scrollable ancestors of the dragging node

  const scrollableAncestors = useScrollableAncestors(isInitialized ? overNode != null ? overNode : activeNode : null);
  const scrollableAncestorRects = useRects(scrollableAncestors); // Apply modifiers

  const modifiedTranslate = applyModifiers(modifiers, {
    transform: {
      x: translate.x - nodeRectDelta.x,
      y: translate.y - nodeRectDelta.y,
      scaleX: 1,
      scaleY: 1
    },
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect,
    over: sensorContext.current.over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  });
  const pointerCoordinates = activationCoordinates ? (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(activationCoordinates, translate) : null;
  const scrollOffsets = useScrollOffsets(scrollableAncestors); // Represents the scroll delta since dragging was initiated

  const scrollAdjustment = useScrollOffsetsDelta(scrollOffsets); // Represents the scroll delta since the last time the active node rect was measured

  const activeNodeScrollDelta = useScrollOffsetsDelta(scrollOffsets, [activeNodeRect]);
  const scrollAdjustedTranslate = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(modifiedTranslate, scrollAdjustment);
  const collisionRect = draggingNodeRect ? getAdjustedRect(draggingNodeRect, modifiedTranslate) : null;
  const collisions = active && collisionRect ? collisionDetection({
    active,
    collisionRect,
    droppableRects,
    droppableContainers: enabledDroppableContainers,
    pointerCoordinates
  }) : null;
  const overId = getFirstCollision(collisions, 'id');
  const [over, setOver] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null); // When there is no drag overlay used, we need to account for the
  // window scroll delta

  const appliedTranslate = usesDragOverlay ? modifiedTranslate : (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.add)(modifiedTranslate, activeNodeScrollDelta);
  const transform = adjustScale(appliedTranslate, (_over$rect = over == null ? void 0 : over.rect) != null ? _over$rect : null, activeNodeRect);
  const activeSensorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const instantiateSensor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((event, _ref2) => {
    let {
      sensor: Sensor,
      options
    } = _ref2;

    if (activeRef.current == null) {
      return;
    }

    const activeNode = draggableNodes.get(activeRef.current);

    if (!activeNode) {
      return;
    }

    const activatorEvent = event.nativeEvent;
    const sensorInstance = new Sensor({
      active: activeRef.current,
      activeNode,
      event: activatorEvent,
      options,
      // Sensors need to be instantiated with refs for arguments that change over time
      // otherwise they are frozen in time with the stale arguments
      context: sensorContext,

      onAbort(id) {
        const draggableNode = draggableNodes.get(id);

        if (!draggableNode) {
          return;
        }

        const {
          onDragAbort
        } = latestProps.current;
        const event = {
          id
        };
        onDragAbort == null ? void 0 : onDragAbort(event);
        dispatchMonitorEvent({
          type: 'onDragAbort',
          event
        });
      },

      onPending(id, constraint, initialCoordinates, offset) {
        const draggableNode = draggableNodes.get(id);

        if (!draggableNode) {
          return;
        }

        const {
          onDragPending
        } = latestProps.current;
        const event = {
          id,
          constraint,
          initialCoordinates,
          offset
        };
        onDragPending == null ? void 0 : onDragPending(event);
        dispatchMonitorEvent({
          type: 'onDragPending',
          event
        });
      },

      onStart(initialCoordinates) {
        const id = activeRef.current;

        if (id == null) {
          return;
        }

        const draggableNode = draggableNodes.get(id);

        if (!draggableNode) {
          return;
        }

        const {
          onDragStart
        } = latestProps.current;
        const event = {
          activatorEvent,
          active: {
            id,
            data: draggableNode.data,
            rect: activeRects
          }
        };
        (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates)(() => {
          onDragStart == null ? void 0 : onDragStart(event);
          setStatus(Status.Initializing);
          dispatch({
            type: Action.DragStart,
            initialCoordinates,
            active: id
          });
          dispatchMonitorEvent({
            type: 'onDragStart',
            event
          });
          setActiveSensor(activeSensorRef.current);
          setActivatorEvent(activatorEvent);
        });
      },

      onMove(coordinates) {
        dispatch({
          type: Action.DragMove,
          coordinates
        });
      },

      onEnd: createHandler(Action.DragEnd),
      onCancel: createHandler(Action.DragCancel)
    });
    activeSensorRef.current = sensorInstance;

    function createHandler(type) {
      return async function handler() {
        const {
          active,
          collisions,
          over,
          scrollAdjustedTranslate
        } = sensorContext.current;
        let event = null;

        if (active && scrollAdjustedTranslate) {
          const {
            cancelDrop
          } = latestProps.current;
          event = {
            activatorEvent,
            active: active,
            collisions,
            delta: scrollAdjustedTranslate,
            over
          };

          if (type === Action.DragEnd && typeof cancelDrop === 'function') {
            const shouldCancel = await Promise.resolve(cancelDrop(event));

            if (shouldCancel) {
              type = Action.DragCancel;
            }
          }
        }

        activeRef.current = null;
        (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates)(() => {
          dispatch({
            type
          });
          setStatus(Status.Uninitialized);
          setOver(null);
          setActiveSensor(null);
          setActivatorEvent(null);
          activeSensorRef.current = null;
          const eventName = type === Action.DragEnd ? 'onDragEnd' : 'onDragCancel';

          if (event) {
            const handler = latestProps.current[eventName];
            handler == null ? void 0 : handler(event);
            dispatchMonitorEvent({
              type: eventName,
              event
            });
          }
        });
      };
    }
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [draggableNodes]);
  const bindActivatorToSensorInstantiator = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((handler, sensor) => {
    return (event, active) => {
      const nativeEvent = event.nativeEvent;
      const activeDraggableNode = draggableNodes.get(active);

      if ( // Another sensor is already instantiating
      activeRef.current !== null || // No active draggable
      !activeDraggableNode || // Event has already been captured
      nativeEvent.dndKit || nativeEvent.defaultPrevented) {
        return;
      }

      const activationContext = {
        active: activeDraggableNode
      };
      const shouldActivate = handler(event, sensor.options, activationContext);

      if (shouldActivate === true) {
        nativeEvent.dndKit = {
          capturedBy: sensor.sensor
        };
        activeRef.current = active;
        instantiateSensor(event, sensor);
      }
    };
  }, [draggableNodes, instantiateSensor]);
  const activators = useCombineActivators(sensors, bindActivatorToSensorInstantiator);
  useSensorSetup(sensors);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    if (activeNodeRect && status === Status.Initializing) {
      setStatus(Status.Initialized);
    }
  }, [activeNodeRect, status]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      onDragMove
    } = latestProps.current;
    const {
      active,
      activatorEvent,
      collisions,
      over
    } = sensorContext.current;

    if (!active || !activatorEvent) {
      return;
    }

    const event = {
      active,
      activatorEvent,
      collisions,
      delta: {
        x: scrollAdjustedTranslate.x,
        y: scrollAdjustedTranslate.y
      },
      over
    };
    (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates)(() => {
      onDragMove == null ? void 0 : onDragMove(event);
      dispatchMonitorEvent({
        type: 'onDragMove',
        event
      });
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [scrollAdjustedTranslate.x, scrollAdjustedTranslate.y]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const {
      active,
      activatorEvent,
      collisions,
      droppableContainers,
      scrollAdjustedTranslate
    } = sensorContext.current;

    if (!active || activeRef.current == null || !activatorEvent || !scrollAdjustedTranslate) {
      return;
    }

    const {
      onDragOver
    } = latestProps.current;
    const overContainer = droppableContainers.get(overId);
    const over = overContainer && overContainer.rect.current ? {
      id: overContainer.id,
      rect: overContainer.rect.current,
      data: overContainer.data,
      disabled: overContainer.disabled
    } : null;
    const event = {
      active,
      activatorEvent,
      collisions,
      delta: {
        x: scrollAdjustedTranslate.x,
        y: scrollAdjustedTranslate.y
      },
      over
    };
    (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.unstable_batchedUpdates)(() => {
      setOver(over);
      onDragOver == null ? void 0 : onDragOver(event);
      dispatchMonitorEvent({
        type: 'onDragOver',
        event
      });
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [overId]);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    sensorContext.current = {
      activatorEvent,
      active,
      activeNode,
      collisionRect,
      collisions,
      droppableRects,
      draggableNodes,
      draggingNode,
      draggingNodeRect,
      droppableContainers,
      over,
      scrollableAncestors,
      scrollAdjustedTranslate
    };
    activeRects.current = {
      initial: draggingNodeRect,
      translated: collisionRect
    };
  }, [active, activeNode, collisions, collisionRect, draggableNodes, draggingNode, draggingNodeRect, droppableRects, droppableContainers, over, scrollableAncestors, scrollAdjustedTranslate]);
  useAutoScroller({ ...autoScrollOptions,
    delta: translate,
    draggingRect: collisionRect,
    pointerCoordinates,
    scrollableAncestors,
    scrollableAncestorRects
  });
  const publicContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const context = {
      active,
      activeNode,
      activeNodeRect,
      activatorEvent,
      collisions,
      containerNodeRect,
      dragOverlay,
      draggableNodes,
      droppableContainers,
      droppableRects,
      over,
      measureDroppableContainers,
      scrollableAncestors,
      scrollableAncestorRects,
      measuringConfiguration,
      measuringScheduled,
      windowRect
    };
    return context;
  }, [active, activeNode, activeNodeRect, activatorEvent, collisions, containerNodeRect, dragOverlay, draggableNodes, droppableContainers, droppableRects, over, measureDroppableContainers, scrollableAncestors, scrollableAncestorRects, measuringConfiguration, measuringScheduled, windowRect]);
  const internalContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const context = {
      activatorEvent,
      activators,
      active,
      activeNodeRect,
      ariaDescribedById: {
        draggable: draggableDescribedById
      },
      dispatch,
      draggableNodes,
      over,
      measureDroppableContainers
    };
    return context;
  }, [activatorEvent, activators, active, activeNodeRect, dispatch, draggableDescribedById, draggableNodes, over, measureDroppableContainers]);
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DndMonitorContext.Provider, {
    value: registerMonitorListener
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InternalContext.Provider, {
    value: internalContext
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PublicContext.Provider, {
    value: publicContext
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ActiveDraggableContext.Provider, {
    value: transform
  }, children)), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(RestoreFocus, {
    disabled: (accessibility == null ? void 0 : accessibility.restoreFocus) === false
  })), react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Accessibility, { ...accessibility,
    hiddenTextDescribedById: draggableDescribedById
  }));

  function getAutoScrollerOptions() {
    const activeSensorDisablesAutoscroll = (activeSensor == null ? void 0 : activeSensor.autoScrollEnabled) === false;
    const autoScrollGloballyDisabled = typeof autoScroll === 'object' ? autoScroll.enabled === false : autoScroll === false;
    const enabled = isInitialized && !activeSensorDisablesAutoscroll && !autoScrollGloballyDisabled;

    if (typeof autoScroll === 'object') {
      return { ...autoScroll,
        enabled
      };
    }

    return {
      enabled
    };
  }
});

const NullContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
const defaultRole = 'button';
const ID_PREFIX = 'Draggable';
function useDraggable(_ref) {
  let {
    id,
    data,
    disabled = false,
    attributes
  } = _ref;
  const key = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)(ID_PREFIX);
  const {
    activators,
    activatorEvent,
    active,
    activeNodeRect,
    ariaDescribedById,
    draggableNodes,
    over
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(InternalContext);
  const {
    role = defaultRole,
    roleDescription = 'draggable',
    tabIndex = 0
  } = attributes != null ? attributes : {};
  const isDragging = (active == null ? void 0 : active.id) === id;
  const transform = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(isDragging ? ActiveDraggableContext : NullContext);
  const [node, setNodeRef] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useNodeRef)();
  const [activatorNode, setActivatorNodeRef] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useNodeRef)();
  const listeners = useSyntheticListeners(activators, id);
  const dataRef = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(data);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    draggableNodes.set(id, {
      id,
      key,
      node,
      activatorNode,
      data: dataRef
    });
    return () => {
      const node = draggableNodes.get(id);

      if (node && node.key === key) {
        draggableNodes.delete(id);
      }
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [draggableNodes, id]);
  const memoizedAttributes = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    role,
    tabIndex,
    'aria-disabled': disabled,
    'aria-pressed': isDragging && role === defaultRole ? true : undefined,
    'aria-roledescription': roleDescription,
    'aria-describedby': ariaDescribedById.draggable
  }), [disabled, role, tabIndex, isDragging, roleDescription, ariaDescribedById.draggable]);
  return {
    active,
    activatorEvent,
    activeNodeRect,
    attributes: memoizedAttributes,
    isDragging,
    listeners: disabled ? undefined : listeners,
    node,
    over,
    setNodeRef,
    setActivatorNodeRef,
    transform
  };
}

function useDndContext() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(PublicContext);
}

const ID_PREFIX$1 = 'Droppable';
const defaultResizeObserverConfig = {
  timeout: 25
};
function useDroppable(_ref) {
  let {
    data,
    disabled = false,
    id,
    resizeObserverConfig
  } = _ref;
  const key = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)(ID_PREFIX$1);
  const {
    active,
    dispatch,
    over,
    measureDroppableContainers
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(InternalContext);
  const previous = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    disabled
  });
  const resizeObserverConnected = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const rect = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const callbackId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    disabled: resizeObserverDisabled,
    updateMeasurementsFor,
    timeout: resizeObserverTimeout
  } = { ...defaultResizeObserverConfig,
    ...resizeObserverConfig
  };
  const ids = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(updateMeasurementsFor != null ? updateMeasurementsFor : id);
  const handleResize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!resizeObserverConnected.current) {
      // ResizeObserver invokes the `handleResize` callback as soon as `observe` is called,
      // assuming the element is rendered and displayed.
      resizeObserverConnected.current = true;
      return;
    }

    if (callbackId.current != null) {
      clearTimeout(callbackId.current);
    }

    callbackId.current = setTimeout(() => {
      measureDroppableContainers(Array.isArray(ids.current) ? ids.current : [ids.current]);
      callbackId.current = null;
    }, resizeObserverTimeout);
  }, //eslint-disable-next-line react-hooks/exhaustive-deps
  [resizeObserverTimeout]);
  const resizeObserver = useResizeObserver({
    callback: handleResize,
    disabled: resizeObserverDisabled || !active
  });
  const handleNodeChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((newElement, previousElement) => {
    if (!resizeObserver) {
      return;
    }

    if (previousElement) {
      resizeObserver.unobserve(previousElement);
      resizeObserverConnected.current = false;
    }

    if (newElement) {
      resizeObserver.observe(newElement);
    }
  }, [resizeObserver]);
  const [nodeRef, setNodeRef] = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useNodeRef)(handleNodeChange);
  const dataRef = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useLatestValue)(data);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!resizeObserver || !nodeRef.current) {
      return;
    }

    resizeObserver.disconnect();
    resizeObserverConnected.current = false;
    resizeObserver.observe(nodeRef.current);
  }, [nodeRef, resizeObserver]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    dispatch({
      type: Action.RegisterDroppable,
      element: {
        id,
        key,
        disabled,
        node: nodeRef,
        rect,
        data: dataRef
      }
    });
    return () => dispatch({
      type: Action.UnregisterDroppable,
      key,
      id
    });
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [id]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (disabled !== previous.current.disabled) {
      dispatch({
        type: Action.SetDroppableDisabled,
        id,
        key,
        disabled
      });
      previous.current.disabled = disabled;
    }
  }, [id, key, disabled, dispatch]);
  return {
    active,
    rect,
    isOver: (over == null ? void 0 : over.id) === id,
    node: nodeRef,
    over,
    setNodeRef
  };
}

function AnimationManager(_ref) {
  let {
    animation,
    children
  } = _ref;
  const [clonedChildren, setClonedChildren] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [element, setElement] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const previousChildren = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.usePrevious)(children);

  if (!children && !clonedChildren && previousChildren) {
    setClonedChildren(previousChildren);
  }

  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    if (!element) {
      return;
    }

    const key = clonedChildren == null ? void 0 : clonedChildren.key;
    const id = clonedChildren == null ? void 0 : clonedChildren.props.id;

    if (key == null || id == null) {
      setClonedChildren(null);
      return;
    }

    Promise.resolve(animation(id, element)).then(() => {
      setClonedChildren(null);
    });
  }, [animation, clonedChildren, element]);
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, children, clonedChildren ? (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(clonedChildren, {
    ref: setElement
  }) : null);
}

const defaultTransform = {
  x: 0,
  y: 0,
  scaleX: 1,
  scaleY: 1
};
function NullifiedContextProvider(_ref) {
  let {
    children
  } = _ref;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(InternalContext.Provider, {
    value: defaultInternalContext
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ActiveDraggableContext.Provider, {
    value: defaultTransform
  }, children));
}

const baseStyles = {
  position: 'fixed',
  touchAction: 'none'
};

const defaultTransition = activatorEvent => {
  const isKeyboardActivator = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isKeyboardEvent)(activatorEvent);
  return isKeyboardActivator ? 'transform 250ms ease' : undefined;
};

const PositionedOverlay = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((_ref, ref) => {
  let {
    as,
    activatorEvent,
    adjustScale,
    children,
    className,
    rect,
    style,
    transform,
    transition = defaultTransition
  } = _ref;

  if (!rect) {
    return null;
  }

  const scaleAdjustedTransform = adjustScale ? transform : { ...transform,
    scaleX: 1,
    scaleY: 1
  };
  const styles = { ...baseStyles,
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    transform: _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transform.toString(scaleAdjustedTransform),
    transformOrigin: adjustScale && activatorEvent ? getRelativeTransformOrigin(activatorEvent, rect) : undefined,
    transition: typeof transition === 'function' ? transition(activatorEvent) : transition,
    ...style
  };
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(as, {
    className,
    style: styles,
    ref
  }, children);
});

const defaultDropAnimationSideEffects = options => _ref => {
  let {
    active,
    dragOverlay
  } = _ref;
  const originalStyles = {};
  const {
    styles,
    className
  } = options;

  if (styles != null && styles.active) {
    for (const [key, value] of Object.entries(styles.active)) {
      if (value === undefined) {
        continue;
      }

      originalStyles[key] = active.node.style.getPropertyValue(key);
      active.node.style.setProperty(key, value);
    }
  }

  if (styles != null && styles.dragOverlay) {
    for (const [key, value] of Object.entries(styles.dragOverlay)) {
      if (value === undefined) {
        continue;
      }

      dragOverlay.node.style.setProperty(key, value);
    }
  }

  if (className != null && className.active) {
    active.node.classList.add(className.active);
  }

  if (className != null && className.dragOverlay) {
    dragOverlay.node.classList.add(className.dragOverlay);
  }

  return function cleanup() {
    for (const [key, value] of Object.entries(originalStyles)) {
      active.node.style.setProperty(key, value);
    }

    if (className != null && className.active) {
      active.node.classList.remove(className.active);
    }
  };
};

const defaultKeyframeResolver = _ref2 => {
  let {
    transform: {
      initial,
      final
    }
  } = _ref2;
  return [{
    transform: _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transform.toString(initial)
  }, {
    transform: _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transform.toString(final)
  }];
};

const defaultDropAnimationConfiguration = {
  duration: 250,
  easing: 'ease',
  keyframes: defaultKeyframeResolver,
  sideEffects: /*#__PURE__*/defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0'
      }
    }
  })
};
function useDropAnimation(_ref3) {
  let {
    config,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  } = _ref3;
  return (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useEvent)((id, node) => {
    if (config === null) {
      return;
    }

    const activeDraggable = draggableNodes.get(id);

    if (!activeDraggable) {
      return;
    }

    const activeNode = activeDraggable.node.current;

    if (!activeNode) {
      return;
    }

    const measurableNode = getMeasurableNode(node);

    if (!measurableNode) {
      return;
    }

    const {
      transform
    } = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.getWindow)(node).getComputedStyle(node);
    const parsedTransform = parseTransform(transform);

    if (!parsedTransform) {
      return;
    }

    const animation = typeof config === 'function' ? config : createDefaultDropAnimation(config);
    scrollIntoViewIfNeeded(activeNode, measuringConfiguration.draggable.measure);
    return animation({
      active: {
        id,
        data: activeDraggable.data,
        node: activeNode,
        rect: measuringConfiguration.draggable.measure(activeNode)
      },
      draggableNodes,
      dragOverlay: {
        node,
        rect: measuringConfiguration.dragOverlay.measure(measurableNode)
      },
      droppableContainers,
      measuringConfiguration,
      transform: parsedTransform
    });
  });
}

function createDefaultDropAnimation(options) {
  const {
    duration,
    easing,
    sideEffects,
    keyframes
  } = { ...defaultDropAnimationConfiguration,
    ...options
  };
  return _ref4 => {
    let {
      active,
      dragOverlay,
      transform,
      ...rest
    } = _ref4;

    if (!duration) {
      // Do not animate if animation duration is zero.
      return;
    }

    const delta = {
      x: dragOverlay.rect.left - active.rect.left,
      y: dragOverlay.rect.top - active.rect.top
    };
    const scale = {
      scaleX: transform.scaleX !== 1 ? active.rect.width * transform.scaleX / dragOverlay.rect.width : 1,
      scaleY: transform.scaleY !== 1 ? active.rect.height * transform.scaleY / dragOverlay.rect.height : 1
    };
    const finalTransform = {
      x: transform.x - delta.x,
      y: transform.y - delta.y,
      ...scale
    };
    const animationKeyframes = keyframes({ ...rest,
      active,
      dragOverlay,
      transform: {
        initial: transform,
        final: finalTransform
      }
    });
    const [firstKeyframe] = animationKeyframes;
    const lastKeyframe = animationKeyframes[animationKeyframes.length - 1];

    if (JSON.stringify(firstKeyframe) === JSON.stringify(lastKeyframe)) {
      // The start and end keyframes are the same, infer that there is no animation needed.
      return;
    }

    const cleanup = sideEffects == null ? void 0 : sideEffects({
      active,
      dragOverlay,
      ...rest
    });
    const animation = dragOverlay.node.animate(animationKeyframes, {
      duration,
      easing,
      fill: 'forwards'
    });
    return new Promise(resolve => {
      animation.onfinish = () => {
        cleanup == null ? void 0 : cleanup();
        resolve();
      };
    });
  };
}

let key = 0;
function useKey(id) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (id == null) {
      return;
    }

    key++;
    return key;
  }, [id]);
}

const DragOverlay = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().memo(_ref => {
  let {
    adjustScale = false,
    children,
    dropAnimation: dropAnimationConfig,
    style,
    transition,
    modifiers,
    wrapperElement = 'div',
    className,
    zIndex = 999
  } = _ref;
  const {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggableNodes,
    droppableContainers,
    dragOverlay,
    over,
    measuringConfiguration,
    scrollableAncestors,
    scrollableAncestorRects,
    windowRect
  } = useDndContext();
  const transform = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ActiveDraggableContext);
  const key = useKey(active == null ? void 0 : active.id);
  const modifiedTransform = applyModifiers(modifiers, {
    activatorEvent,
    active,
    activeNodeRect,
    containerNodeRect,
    draggingNodeRect: dragOverlay.rect,
    over,
    overlayNodeRect: dragOverlay.rect,
    scrollableAncestors,
    scrollableAncestorRects,
    transform,
    windowRect
  });
  const initialRect = useInitialValue(activeNodeRect);
  const dropAnimation = useDropAnimation({
    config: dropAnimationConfig,
    draggableNodes,
    droppableContainers,
    measuringConfiguration
  }); // We need to wait for the active node to be measured before connecting the drag overlay ref
  // otherwise collisions can be computed against a mispositioned drag overlay

  const ref = initialRect ? dragOverlay.setRef : undefined;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(NullifiedContextProvider, null, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AnimationManager, {
    animation: dropAnimation
  }, active && key ? react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PositionedOverlay, {
    key: key,
    id: active.id,
    ref: ref,
    as: wrapperElement,
    activatorEvent: activatorEvent,
    adjustScale: adjustScale,
    className: className,
    transition: transition,
    rect: initialRect,
    style: {
      zIndex,
      ...style
    },
    transform: modifiedTransform
  }, children) : null));
});


//# sourceMappingURL=core.esm.js.map


/***/ }),

/***/ "./node_modules/@dnd-kit/modifiers/dist/modifiers.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dnd-kit/modifiers/dist/modifiers.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSnapModifier: () => (/* binding */ createSnapModifier),
/* harmony export */   restrictToFirstScrollableAncestor: () => (/* binding */ restrictToFirstScrollableAncestor),
/* harmony export */   restrictToHorizontalAxis: () => (/* binding */ restrictToHorizontalAxis),
/* harmony export */   restrictToParentElement: () => (/* binding */ restrictToParentElement),
/* harmony export */   restrictToVerticalAxis: () => (/* binding */ restrictToVerticalAxis),
/* harmony export */   restrictToWindowEdges: () => (/* binding */ restrictToWindowEdges),
/* harmony export */   snapCenterToCursor: () => (/* binding */ snapCenterToCursor)
/* harmony export */ });
/* harmony import */ var _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @dnd-kit/utilities */ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js");


function createSnapModifier(gridSize) {
  return _ref => {
    let {
      transform
    } = _ref;
    return { ...transform,
      x: Math.ceil(transform.x / gridSize) * gridSize,
      y: Math.ceil(transform.y / gridSize) * gridSize
    };
  };
}

const restrictToHorizontalAxis = _ref => {
  let {
    transform
  } = _ref;
  return { ...transform,
    y: 0
  };
};

function restrictToBoundingRect(transform, rect, boundingRect) {
  const value = { ...transform
  };

  if (rect.top + transform.y <= boundingRect.top) {
    value.y = boundingRect.top - rect.top;
  } else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
    value.y = boundingRect.top + boundingRect.height - rect.bottom;
  }

  if (rect.left + transform.x <= boundingRect.left) {
    value.x = boundingRect.left - rect.left;
  } else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) {
    value.x = boundingRect.left + boundingRect.width - rect.right;
  }

  return value;
}

const restrictToParentElement = _ref => {
  let {
    containerNodeRect,
    draggingNodeRect,
    transform
  } = _ref;

  if (!draggingNodeRect || !containerNodeRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, containerNodeRect);
};

const restrictToFirstScrollableAncestor = _ref => {
  let {
    draggingNodeRect,
    transform,
    scrollableAncestorRects
  } = _ref;
  const firstScrollableAncestorRect = scrollableAncestorRects[0];

  if (!draggingNodeRect || !firstScrollableAncestorRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, firstScrollableAncestorRect);
};

const restrictToVerticalAxis = _ref => {
  let {
    transform
  } = _ref;
  return { ...transform,
    x: 0
  };
};

const restrictToWindowEdges = _ref => {
  let {
    transform,
    draggingNodeRect,
    windowRect
  } = _ref;

  if (!draggingNodeRect || !windowRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, windowRect);
};

const snapCenterToCursor = _ref => {
  let {
    activatorEvent,
    draggingNodeRect,
    transform
  } = _ref;

  if (draggingNodeRect && activatorEvent) {
    const activatorCoordinates = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_0__.getEventCoordinates)(activatorEvent);

    if (!activatorCoordinates) {
      return transform;
    }

    const offsetX = activatorCoordinates.x - draggingNodeRect.left;
    const offsetY = activatorCoordinates.y - draggingNodeRect.top;
    return { ...transform,
      x: transform.x + offsetX - draggingNodeRect.width / 2,
      y: transform.y + offsetY - draggingNodeRect.height / 2
    };
  }

  return transform;
};


//# sourceMappingURL=modifiers.esm.js.map


/***/ }),

/***/ "./node_modules/@dnd-kit/sortable/dist/sortable.esm.js":
/*!*************************************************************!*\
  !*** ./node_modules/@dnd-kit/sortable/dist/sortable.esm.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SortableContext: () => (/* binding */ SortableContext),
/* harmony export */   arrayMove: () => (/* binding */ arrayMove),
/* harmony export */   arraySwap: () => (/* binding */ arraySwap),
/* harmony export */   defaultAnimateLayoutChanges: () => (/* binding */ defaultAnimateLayoutChanges),
/* harmony export */   defaultNewIndexGetter: () => (/* binding */ defaultNewIndexGetter),
/* harmony export */   hasSortableData: () => (/* binding */ hasSortableData),
/* harmony export */   horizontalListSortingStrategy: () => (/* binding */ horizontalListSortingStrategy),
/* harmony export */   rectSortingStrategy: () => (/* binding */ rectSortingStrategy),
/* harmony export */   rectSwappingStrategy: () => (/* binding */ rectSwappingStrategy),
/* harmony export */   sortableKeyboardCoordinates: () => (/* binding */ sortableKeyboardCoordinates),
/* harmony export */   useSortable: () => (/* binding */ useSortable),
/* harmony export */   verticalListSortingStrategy: () => (/* binding */ verticalListSortingStrategy)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @dnd-kit/core */ "./node_modules/@dnd-kit/core/dist/core.esm.js");
/* harmony import */ var _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dnd-kit/utilities */ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js");




/**
 * Move an array item to a different position. Returns a new array with the item moved to the new position.
 */
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}

/**
 * Swap an array item to a different position. Returns a new array with the item swapped to the new position.
 */
function arraySwap(array, from, to) {
  const newArray = array.slice();
  newArray[from] = array[to];
  newArray[to] = array[from];
  return newArray;
}

function getSortedRects(items, rects) {
  return items.reduce((accumulator, id, index) => {
    const rect = rects.get(id);

    if (rect) {
      accumulator[index] = rect;
    }

    return accumulator;
  }, Array(items.length));
}

function isValidIndex(index) {
  return index !== null && index >= 0;
}

function itemsEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function normalizeDisabled(disabled) {
  if (typeof disabled === 'boolean') {
    return {
      draggable: disabled,
      droppable: disabled
    };
  }

  return disabled;
}

// To-do: We should be calculating scale transformation
const defaultScale = {
  scaleX: 1,
  scaleY: 1
};
const horizontalListSortingStrategy = _ref => {
  var _rects$activeIndex;

  let {
    rects,
    activeNodeRect: fallbackActiveRect,
    activeIndex,
    overIndex,
    index
  } = _ref;
  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;

  if (!activeNodeRect) {
    return null;
  }

  const itemGap = getItemGap(rects, index, activeIndex);

  if (index === activeIndex) {
    const newIndexRect = rects[overIndex];

    if (!newIndexRect) {
      return null;
    }

    return {
      x: activeIndex < overIndex ? newIndexRect.left + newIndexRect.width - (activeNodeRect.left + activeNodeRect.width) : newIndexRect.left - activeNodeRect.left,
      y: 0,
      ...defaultScale
    };
  }

  if (index > activeIndex && index <= overIndex) {
    return {
      x: -activeNodeRect.width - itemGap,
      y: 0,
      ...defaultScale
    };
  }

  if (index < activeIndex && index >= overIndex) {
    return {
      x: activeNodeRect.width + itemGap,
      y: 0,
      ...defaultScale
    };
  }

  return {
    x: 0,
    y: 0,
    ...defaultScale
  };
};

function getItemGap(rects, index, activeIndex) {
  const currentRect = rects[index];
  const previousRect = rects[index - 1];
  const nextRect = rects[index + 1];

  if (!currentRect || !previousRect && !nextRect) {
    return 0;
  }

  if (activeIndex < index) {
    return previousRect ? currentRect.left - (previousRect.left + previousRect.width) : nextRect.left - (currentRect.left + currentRect.width);
  }

  return nextRect ? nextRect.left - (currentRect.left + currentRect.width) : currentRect.left - (previousRect.left + previousRect.width);
}

const rectSortingStrategy = _ref => {
  let {
    rects,
    activeIndex,
    overIndex,
    index
  } = _ref;
  const newRects = arrayMove(rects, overIndex, activeIndex);
  const oldRect = rects[index];
  const newRect = newRects[index];

  if (!newRect || !oldRect) {
    return null;
  }

  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};

const rectSwappingStrategy = _ref => {
  let {
    activeIndex,
    index,
    rects,
    overIndex
  } = _ref;
  let oldRect;
  let newRect;

  if (index === activeIndex) {
    oldRect = rects[index];
    newRect = rects[overIndex];
  }

  if (index === overIndex) {
    oldRect = rects[index];
    newRect = rects[activeIndex];
  }

  if (!newRect || !oldRect) {
    return null;
  }

  return {
    x: newRect.left - oldRect.left,
    y: newRect.top - oldRect.top,
    scaleX: newRect.width / oldRect.width,
    scaleY: newRect.height / oldRect.height
  };
};

// To-do: We should be calculating scale transformation
const defaultScale$1 = {
  scaleX: 1,
  scaleY: 1
};
const verticalListSortingStrategy = _ref => {
  var _rects$activeIndex;

  let {
    activeIndex,
    activeNodeRect: fallbackActiveRect,
    index,
    rects,
    overIndex
  } = _ref;
  const activeNodeRect = (_rects$activeIndex = rects[activeIndex]) != null ? _rects$activeIndex : fallbackActiveRect;

  if (!activeNodeRect) {
    return null;
  }

  if (index === activeIndex) {
    const overIndexRect = rects[overIndex];

    if (!overIndexRect) {
      return null;
    }

    return {
      x: 0,
      y: activeIndex < overIndex ? overIndexRect.top + overIndexRect.height - (activeNodeRect.top + activeNodeRect.height) : overIndexRect.top - activeNodeRect.top,
      ...defaultScale$1
    };
  }

  const itemGap = getItemGap$1(rects, index, activeIndex);

  if (index > activeIndex && index <= overIndex) {
    return {
      x: 0,
      y: -activeNodeRect.height - itemGap,
      ...defaultScale$1
    };
  }

  if (index < activeIndex && index >= overIndex) {
    return {
      x: 0,
      y: activeNodeRect.height + itemGap,
      ...defaultScale$1
    };
  }

  return {
    x: 0,
    y: 0,
    ...defaultScale$1
  };
};

function getItemGap$1(clientRects, index, activeIndex) {
  const currentRect = clientRects[index];
  const previousRect = clientRects[index - 1];
  const nextRect = clientRects[index + 1];

  if (!currentRect) {
    return 0;
  }

  if (activeIndex < index) {
    return previousRect ? currentRect.top - (previousRect.top + previousRect.height) : nextRect ? nextRect.top - (currentRect.top + currentRect.height) : 0;
  }

  return nextRect ? nextRect.top - (currentRect.top + currentRect.height) : previousRect ? currentRect.top - (previousRect.top + previousRect.height) : 0;
}

const ID_PREFIX = 'Sortable';
const Context = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({
  activeIndex: -1,
  containerId: ID_PREFIX,
  disableTransforms: false,
  items: [],
  overIndex: -1,
  useDragOverlay: false,
  sortedRects: [],
  strategy: rectSortingStrategy,
  disabled: {
    draggable: false,
    droppable: false
  }
});
function SortableContext(_ref) {
  let {
    children,
    id,
    items: userDefinedItems,
    strategy = rectSortingStrategy,
    disabled: disabledProp = false
  } = _ref;
  const {
    active,
    dragOverlay,
    droppableRects,
    over,
    measureDroppableContainers
  } = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.useDndContext)();
  const containerId = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useUniqueId)(ID_PREFIX, id);
  const useDragOverlay = Boolean(dragOverlay.rect !== null);
  const items = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => userDefinedItems.map(item => typeof item === 'object' && 'id' in item ? item.id : item), [userDefinedItems]);
  const isDragging = active != null;
  const activeIndex = active ? items.indexOf(active.id) : -1;
  const overIndex = over ? items.indexOf(over.id) : -1;
  const previousItemsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(items);
  const itemsHaveChanged = !itemsEqual(items, previousItemsRef.current);
  const disableTransforms = overIndex !== -1 && activeIndex === -1 || itemsHaveChanged;
  const disabled = normalizeDisabled(disabledProp);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    if (itemsHaveChanged && isDragging) {
      measureDroppableContainers(items);
    }
  }, [itemsHaveChanged, items, isDragging, measureDroppableContainers]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    previousItemsRef.current = items;
  }, [items]);
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    activeIndex,
    containerId,
    disabled,
    disableTransforms,
    items,
    overIndex,
    useDragOverlay,
    sortedRects: getSortedRects(items, droppableRects),
    strategy
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [activeIndex, containerId, disabled.draggable, disabled.droppable, disableTransforms, items, overIndex, droppableRects, useDragOverlay, strategy]);
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Context.Provider, {
    value: contextValue
  }, children);
}

const defaultNewIndexGetter = _ref => {
  let {
    id,
    items,
    activeIndex,
    overIndex
  } = _ref;
  return arrayMove(items, activeIndex, overIndex).indexOf(id);
};
const defaultAnimateLayoutChanges = _ref2 => {
  let {
    containerId,
    isSorting,
    wasDragging,
    index,
    items,
    newIndex,
    previousItems,
    previousContainerId,
    transition
  } = _ref2;

  if (!transition || !wasDragging) {
    return false;
  }

  if (previousItems !== items && index === newIndex) {
    return false;
  }

  if (isSorting) {
    return true;
  }

  return newIndex !== index && containerId === previousContainerId;
};
const defaultTransition = {
  duration: 200,
  easing: 'ease'
};
const transitionProperty = 'transform';
const disabledTransition = /*#__PURE__*/_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: 'linear'
});
const defaultAttributes = {
  roleDescription: 'sortable'
};

/*
 * When the index of an item changes while sorting,
 * we need to temporarily disable the transforms
 */

function useDerivedTransform(_ref) {
  let {
    disabled,
    index,
    node,
    rect
  } = _ref;
  const [derivedTransform, setDerivedtransform] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const previousIndex = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(index);
  (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(() => {
    if (!disabled && index !== previousIndex.current && node.current) {
      const initial = rect.current;

      if (initial) {
        const current = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.getClientRect)(node.current, {
          ignoreTransform: true
        });
        const delta = {
          x: initial.left - current.left,
          y: initial.top - current.top,
          scaleX: initial.width / current.width,
          scaleY: initial.height / current.height
        };

        if (delta.x || delta.y) {
          setDerivedtransform(delta);
        }
      }
    }

    if (index !== previousIndex.current) {
      previousIndex.current = index;
    }
  }, [disabled, index, node, rect]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (derivedTransform) {
      setDerivedtransform(null);
    }
  }, [derivedTransform]);
  return derivedTransform;
}

function useSortable(_ref) {
  let {
    animateLayoutChanges = defaultAnimateLayoutChanges,
    attributes: userDefinedAttributes,
    disabled: localDisabled,
    data: customData,
    getNewIndex = defaultNewIndexGetter,
    id,
    strategy: localStrategy,
    resizeObserverConfig,
    transition = defaultTransition
  } = _ref;
  const {
    items,
    containerId,
    activeIndex,
    disabled: globalDisabled,
    disableTransforms,
    sortedRects,
    overIndex,
    useDragOverlay,
    strategy: globalStrategy
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Context);
  const disabled = normalizeLocalDisabled(localDisabled, globalDisabled);
  const index = items.indexOf(id);
  const data = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    sortable: {
      containerId,
      index,
      items
    },
    ...customData
  }), [containerId, customData, index, items]);
  const itemsAfterCurrentSortable = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => items.slice(items.indexOf(id)), [items, id]);
  const {
    rect,
    node,
    isOver,
    setNodeRef: setDroppableNodeRef
  } = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.useDroppable)({
    id,
    data,
    disabled: disabled.droppable,
    resizeObserverConfig: {
      updateMeasurementsFor: itemsAfterCurrentSortable,
      ...resizeObserverConfig
    }
  });
  const {
    active,
    activatorEvent,
    activeNodeRect,
    attributes,
    setNodeRef: setDraggableNodeRef,
    listeners,
    isDragging,
    over,
    setActivatorNodeRef,
    transform
  } = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.useDraggable)({
    id,
    data,
    attributes: { ...defaultAttributes,
      ...userDefinedAttributes
    },
    disabled: disabled.draggable
  });
  const setNodeRef = (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.useCombinedRefs)(setDroppableNodeRef, setDraggableNodeRef);
  const isSorting = Boolean(active);
  const displaceItem = isSorting && !disableTransforms && isValidIndex(activeIndex) && isValidIndex(overIndex);
  const shouldDisplaceDragSource = !useDragOverlay && isDragging;
  const dragSourceDisplacement = shouldDisplaceDragSource && displaceItem ? transform : null;
  const strategy = localStrategy != null ? localStrategy : globalStrategy;
  const finalTransform = displaceItem ? dragSourceDisplacement != null ? dragSourceDisplacement : strategy({
    rects: sortedRects,
    activeNodeRect,
    activeIndex,
    overIndex,
    index
  }) : null;
  const newIndex = isValidIndex(activeIndex) && isValidIndex(overIndex) ? getNewIndex({
    id,
    items,
    activeIndex,
    overIndex
  }) : index;
  const activeId = active == null ? void 0 : active.id;
  const previous = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
    activeId,
    items,
    newIndex,
    containerId
  });
  const itemsHaveChanged = items !== previous.current.items;
  const shouldAnimateLayoutChanges = animateLayoutChanges({
    active,
    containerId,
    isDragging,
    isSorting,
    id,
    index,
    items,
    newIndex: previous.current.newIndex,
    previousItems: previous.current.items,
    previousContainerId: previous.current.containerId,
    transition,
    wasDragging: previous.current.activeId != null
  });
  const derivedTransform = useDerivedTransform({
    disabled: !shouldAnimateLayoutChanges,
    index,
    node,
    rect
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isSorting && previous.current.newIndex !== newIndex) {
      previous.current.newIndex = newIndex;
    }

    if (containerId !== previous.current.containerId) {
      previous.current.containerId = containerId;
    }

    if (items !== previous.current.items) {
      previous.current.items = items;
    }
  }, [isSorting, newIndex, containerId, items]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (activeId === previous.current.activeId) {
      return;
    }

    if (activeId != null && previous.current.activeId == null) {
      previous.current.activeId = activeId;
      return;
    }

    const timeoutId = setTimeout(() => {
      previous.current.activeId = activeId;
    }, 50);
    return () => clearTimeout(timeoutId);
  }, [activeId]);
  return {
    active,
    activeIndex,
    attributes,
    data,
    rect,
    index,
    newIndex,
    items,
    isOver,
    isSorting,
    isDragging,
    listeners,
    node,
    overIndex,
    over,
    setNodeRef,
    setActivatorNodeRef,
    setDroppableNodeRef,
    setDraggableNodeRef,
    transform: derivedTransform != null ? derivedTransform : finalTransform,
    transition: getTransition()
  };

  function getTransition() {
    if ( // Temporarily disable transitions for a single frame to set up derived transforms
    derivedTransform || // Or to prevent items jumping to back to their "new" position when items change
    itemsHaveChanged && previous.current.newIndex === index) {
      return disabledTransition;
    }

    if (shouldDisplaceDragSource && !(0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.isKeyboardEvent)(activatorEvent) || !transition) {
      return undefined;
    }

    if (isSorting || shouldAnimateLayoutChanges) {
      return _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.CSS.Transition.toString({ ...transition,
        property: transitionProperty
      });
    }

    return undefined;
  }
}

function normalizeLocalDisabled(localDisabled, globalDisabled) {
  var _localDisabled$dragga, _localDisabled$droppa;

  if (typeof localDisabled === 'boolean') {
    return {
      draggable: localDisabled,
      // Backwards compatibility
      droppable: false
    };
  }

  return {
    draggable: (_localDisabled$dragga = localDisabled == null ? void 0 : localDisabled.draggable) != null ? _localDisabled$dragga : globalDisabled.draggable,
    droppable: (_localDisabled$droppa = localDisabled == null ? void 0 : localDisabled.droppable) != null ? _localDisabled$droppa : globalDisabled.droppable
  };
}

function hasSortableData(entry) {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data && 'sortable' in data && typeof data.sortable === 'object' && 'containerId' in data.sortable && 'items' in data.sortable && 'index' in data.sortable) {
    return true;
  }

  return false;
}

const directions = [_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Down, _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Right, _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Up, _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Left];
const sortableKeyboardCoordinates = (event, _ref) => {
  let {
    context: {
      active,
      collisionRect,
      droppableRects,
      droppableContainers,
      over,
      scrollableAncestors
    }
  } = _ref;

  if (directions.includes(event.code)) {
    event.preventDefault();

    if (!active || !collisionRect) {
      return;
    }

    const filteredContainers = [];
    droppableContainers.getEnabled().forEach(entry => {
      if (!entry || entry != null && entry.disabled) {
        return;
      }

      const rect = droppableRects.get(entry.id);

      if (!rect) {
        return;
      }

      switch (event.code) {
        case _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            filteredContainers.push(entry);
          }

          break;

        case _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            filteredContainers.push(entry);
          }

          break;

        case _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Left:
          if (collisionRect.left > rect.left) {
            filteredContainers.push(entry);
          }

          break;

        case _dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.KeyboardCode.Right:
          if (collisionRect.left < rect.left) {
            filteredContainers.push(entry);
          }

          break;
      }
    });
    const collisions = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.closestCorners)({
      active,
      collisionRect: collisionRect,
      droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null
    });
    let closestId = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.getFirstCollision)(collisions, 'id');

    if (closestId === (over == null ? void 0 : over.id) && collisions.length > 1) {
      closestId = collisions[1].id;
    }

    if (closestId != null) {
      const activeDroppable = droppableContainers.get(active.id);
      const newDroppable = droppableContainers.get(closestId);
      const newRect = newDroppable ? droppableRects.get(newDroppable.id) : null;
      const newNode = newDroppable == null ? void 0 : newDroppable.node.current;

      if (newNode && newRect && activeDroppable && newDroppable) {
        const newScrollAncestors = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_1__.getScrollableAncestors)(newNode);
        const hasDifferentScrollAncestors = newScrollAncestors.some((element, index) => scrollableAncestors[index] !== element);
        const hasSameContainer = isSameContainer(activeDroppable, newDroppable);
        const isAfterActive = isAfter(activeDroppable, newDroppable);
        const offset = hasDifferentScrollAncestors || !hasSameContainer ? {
          x: 0,
          y: 0
        } : {
          x: isAfterActive ? collisionRect.width - newRect.width : 0,
          y: isAfterActive ? collisionRect.height - newRect.height : 0
        };
        const rectCoordinates = {
          x: newRect.left,
          y: newRect.top
        };
        const newCoordinates = offset.x && offset.y ? rectCoordinates : (0,_dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_2__.subtract)(rectCoordinates, offset);
        return newCoordinates;
      }
    }
  }

  return undefined;
};

function isSameContainer(a, b) {
  if (!hasSortableData(a) || !hasSortableData(b)) {
    return false;
  }

  return a.data.current.sortable.containerId === b.data.current.sortable.containerId;
}

function isAfter(a, b) {
  if (!hasSortableData(a) || !hasSortableData(b)) {
    return false;
  }

  if (!isSameContainer(a, b)) {
    return false;
  }

  return a.data.current.sortable.index < b.data.current.sortable.index;
}


//# sourceMappingURL=sortable.esm.js.map


/***/ }),

/***/ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js":
/*!***************************************************************!*\
  !*** ./node_modules/@dnd-kit/utilities/dist/utilities.esm.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSS: () => (/* binding */ CSS),
/* harmony export */   add: () => (/* binding */ add),
/* harmony export */   canUseDOM: () => (/* binding */ canUseDOM),
/* harmony export */   findFirstFocusableNode: () => (/* binding */ findFirstFocusableNode),
/* harmony export */   getEventCoordinates: () => (/* binding */ getEventCoordinates),
/* harmony export */   getOwnerDocument: () => (/* binding */ getOwnerDocument),
/* harmony export */   getWindow: () => (/* binding */ getWindow),
/* harmony export */   hasViewportRelativeCoordinates: () => (/* binding */ hasViewportRelativeCoordinates),
/* harmony export */   isDocument: () => (/* binding */ isDocument),
/* harmony export */   isHTMLElement: () => (/* binding */ isHTMLElement),
/* harmony export */   isKeyboardEvent: () => (/* binding */ isKeyboardEvent),
/* harmony export */   isNode: () => (/* binding */ isNode),
/* harmony export */   isSVGElement: () => (/* binding */ isSVGElement),
/* harmony export */   isTouchEvent: () => (/* binding */ isTouchEvent),
/* harmony export */   isWindow: () => (/* binding */ isWindow),
/* harmony export */   subtract: () => (/* binding */ subtract),
/* harmony export */   useCombinedRefs: () => (/* binding */ useCombinedRefs),
/* harmony export */   useEvent: () => (/* binding */ useEvent),
/* harmony export */   useInterval: () => (/* binding */ useInterval),
/* harmony export */   useIsomorphicLayoutEffect: () => (/* binding */ useIsomorphicLayoutEffect),
/* harmony export */   useLatestValue: () => (/* binding */ useLatestValue),
/* harmony export */   useLazyMemo: () => (/* binding */ useLazyMemo),
/* harmony export */   useNodeRef: () => (/* binding */ useNodeRef),
/* harmony export */   usePrevious: () => (/* binding */ usePrevious),
/* harmony export */   useUniqueId: () => (/* binding */ useUniqueId)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useCombinedRefs() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++) {
    refs[_key] = arguments[_key];
  }

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => node => {
    refs.forEach(ref => ref(node));
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  refs);
}

// https://github.com/facebook/react/blob/master/packages/shared/ExecutionEnvironment.js
const canUseDOM = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined';

function isWindow(element) {
  const elementString = Object.prototype.toString.call(element);
  return elementString === '[object Window]' || // In Electron context the Window object serializes to [object global]
  elementString === '[object global]';
}

function isNode(node) {
  return 'nodeType' in node;
}

function getWindow(target) {
  var _target$ownerDocument, _target$ownerDocument2;

  if (!target) {
    return window;
  }

  if (isWindow(target)) {
    return target;
  }

  if (!isNode(target)) {
    return window;
  }

  return (_target$ownerDocument = (_target$ownerDocument2 = target.ownerDocument) == null ? void 0 : _target$ownerDocument2.defaultView) != null ? _target$ownerDocument : window;
}

function isDocument(node) {
  const {
    Document
  } = getWindow(node);
  return node instanceof Document;
}

function isHTMLElement(node) {
  if (isWindow(node)) {
    return false;
  }

  return node instanceof getWindow(node).HTMLElement;
}

function isSVGElement(node) {
  return node instanceof getWindow(node).SVGElement;
}

function getOwnerDocument(target) {
  if (!target) {
    return document;
  }

  if (isWindow(target)) {
    return target.document;
  }

  if (!isNode(target)) {
    return document;
  }

  if (isDocument(target)) {
    return target;
  }

  if (isHTMLElement(target) || isSVGElement(target)) {
    return target.ownerDocument;
  }

  return document;
}

/**
 * A hook that resolves to useEffect on the server and useLayoutEffect on the client
 * @param callback {function} Callback function that is invoked when the dependencies of the hook change
 */

const useIsomorphicLayoutEffect = canUseDOM ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

function useEvent(handler) {
  const handlerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(handler);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return handlerRef.current == null ? void 0 : handlerRef.current(...args);
  }, []);
}

function useInterval() {
  const intervalRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const set = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((listener, duration) => {
    intervalRef.current = setInterval(listener, duration);
  }, []);
  const clear = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  return [set, clear];
}

function useLatestValue(value, dependencies) {
  if (dependencies === void 0) {
    dependencies = [value];
  }

  const valueRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(value);
  useIsomorphicLayoutEffect(() => {
    if (valueRef.current !== value) {
      valueRef.current = value;
    }
  }, dependencies);
  return valueRef;
}

function useLazyMemo(callback, dependencies) {
  const valueRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const newValue = callback(valueRef.current);
    valueRef.current = newValue;
    return newValue;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [...dependencies]);
}

function useNodeRef(onChange) {
  const onChangeHandler = useEvent(onChange);
  const node = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const setNodeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(element => {
    if (element !== node.current) {
      onChangeHandler == null ? void 0 : onChangeHandler(element, node.current);
    }

    node.current = element;
  }, //eslint-disable-next-line
  []);
  return [node, setNodeRef];
}

function usePrevious(value) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

let ids = {};
function useUniqueId(prefix, value) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (value) {
      return value;
    }

    const id = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id;
    return prefix + "-" + id;
  }, [prefix, value]);
}

function createAdjustmentFn(modifier) {
  return function (object) {
    for (var _len = arguments.length, adjustments = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      adjustments[_key - 1] = arguments[_key];
    }

    return adjustments.reduce((accumulator, adjustment) => {
      const entries = Object.entries(adjustment);

      for (const [key, valueAdjustment] of entries) {
        const value = accumulator[key];

        if (value != null) {
          accumulator[key] = value + modifier * valueAdjustment;
        }
      }

      return accumulator;
    }, { ...object
    });
  };
}

const add = /*#__PURE__*/createAdjustmentFn(1);
const subtract = /*#__PURE__*/createAdjustmentFn(-1);

function hasViewportRelativeCoordinates(event) {
  return 'clientX' in event && 'clientY' in event;
}

function isKeyboardEvent(event) {
  if (!event) {
    return false;
  }

  const {
    KeyboardEvent
  } = getWindow(event.target);
  return KeyboardEvent && event instanceof KeyboardEvent;
}

function isTouchEvent(event) {
  if (!event) {
    return false;
  }

  const {
    TouchEvent
  } = getWindow(event.target);
  return TouchEvent && event instanceof TouchEvent;
}

/**
 * Returns the normalized x and y coordinates for mouse and touch events.
 */

function getEventCoordinates(event) {
  if (isTouchEvent(event)) {
    if (event.touches && event.touches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.touches[0];
      return {
        x,
        y
      };
    } else if (event.changedTouches && event.changedTouches.length) {
      const {
        clientX: x,
        clientY: y
      } = event.changedTouches[0];
      return {
        x,
        y
      };
    }
  }

  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }

  return null;
}

const CSS = /*#__PURE__*/Object.freeze({
  Translate: {
    toString(transform) {
      if (!transform) {
        return;
      }

      const {
        x,
        y
      } = transform;
      return "translate3d(" + (x ? Math.round(x) : 0) + "px, " + (y ? Math.round(y) : 0) + "px, 0)";
    }

  },
  Scale: {
    toString(transform) {
      if (!transform) {
        return;
      }

      const {
        scaleX,
        scaleY
      } = transform;
      return "scaleX(" + scaleX + ") scaleY(" + scaleY + ")";
    }

  },
  Transform: {
    toString(transform) {
      if (!transform) {
        return;
      }

      return [CSS.Translate.toString(transform), CSS.Scale.toString(transform)].join(' ');
    }

  },
  Transition: {
    toString(_ref) {
      let {
        property,
        duration,
        easing
      } = _ref;
      return property + " " + duration + "ms " + easing;
    }

  }
});

const SELECTOR = 'a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]';
function findFirstFocusableNode(element) {
  if (element.matches(SELECTOR)) {
    return element;
  }

  return element.querySelector(SELECTOR);
}


//# sourceMappingURL=utilities.esm.js.map


/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/icon/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/icon/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps}                                 props icon is the SVG component to render
 *                                                          size is a number specifying the icon size in pixels
 *                                                          Other props will be passed to wrapped SVG component
 * @param {import('react').ForwardedRef<HTMLElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element}  Icon component
 */
function Icon({
  icon,
  size = 24,
  ...props
}, ref) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props,
    ref
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Icon));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/grid.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/grid.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "./node_modules/@wordpress/icons/node_modules/@wordpress/primitives/build-module/svg/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/**
 * WordPress dependencies
 */


const grid = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
    d: "m3 5c0-1.10457.89543-2 2-2h13.5c1.1046 0 2 .89543 2 2v13.5c0 1.1046-.8954 2-2 2h-13.5c-1.10457 0-2-.8954-2-2zm2-.5h6v6.5h-6.5v-6c0-.27614.22386-.5.5-.5zm-.5 8v6c0 .2761.22386.5.5.5h6v-6.5zm8 0v6.5h6c.2761 0 .5-.2239.5-.5v-6zm0-8v6.5h6.5v-6c0-.27614-.2239-.5-.5-.5z",
    fillRule: "evenodd",
    clipRule: "evenodd"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (grid);
//# sourceMappingURL=grid.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/node_modules/@wordpress/primitives/build-module/svg/index.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/node_modules/@wordpress/primitives/build-module/svg/index.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Circle: () => (/* binding */ Circle),
/* harmony export */   Defs: () => (/* binding */ Defs),
/* harmony export */   G: () => (/* binding */ G),
/* harmony export */   Line: () => (/* binding */ Line),
/* harmony export */   LinearGradient: () => (/* binding */ LinearGradient),
/* harmony export */   Path: () => (/* binding */ Path),
/* harmony export */   Polygon: () => (/* binding */ Polygon),
/* harmony export */   RadialGradient: () => (/* binding */ RadialGradient),
/* harmony export */   Rect: () => (/* binding */ Rect),
/* harmony export */   SVG: () => (/* binding */ SVG),
/* harmony export */   Stop: () => (/* binding */ Stop)
/* harmony export */ });
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clsx */ "./node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


/** @typedef {{isPressed?: boolean} & import('react').ComponentPropsWithoutRef<'svg'>} SVGProps */

/**
 * @param {import('react').ComponentPropsWithoutRef<'circle'>} props
 *
 * @return {JSX.Element} Circle component
 */

const Circle = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('circle', props);

/**
 * @param {import('react').ComponentPropsWithoutRef<'g'>} props
 *
 * @return {JSX.Element} G component
 */
const G = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('g', props);

/**
 * @param {import('react').ComponentPropsWithoutRef<'line'>} props
 *
 * @return {JSX.Element} Path component
 */
const Line = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('line', props);

/**
 * @param {import('react').ComponentPropsWithoutRef<'path'>} props
 *
 * @return {JSX.Element} Path component
 */
const Path = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('path', props);

/**
 * @param {import('react').ComponentPropsWithoutRef<'polygon'>} props
 *
 * @return {JSX.Element} Polygon component
 */
const Polygon = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('polygon', props);

/**
 * @param {import('react').ComponentPropsWithoutRef<'rect'>} props
 *
 * @return {JSX.Element} Rect component
 */
const Rect = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('rect', props);

/**
 * @param {import('react').ComponentPropsWithoutRef<'defs'>} props
 *
 * @return {JSX.Element} Defs component
 */
const Defs = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('defs', props);

/**
 * @param {import('react').ComponentPropsWithoutRef<'radialGradient'>} props
 *
 * @return {JSX.Element} RadialGradient component
 */
const RadialGradient = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('radialGradient', props);

/**
 * @param {import('react').ComponentPropsWithoutRef<'linearGradient'>} props
 *
 * @return {JSX.Element} LinearGradient component
 */
const LinearGradient = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('linearGradient', props);

/**
 * @param {import('react').ComponentPropsWithoutRef<'stop'>} props
 *
 * @return {JSX.Element} Stop component
 */
const Stop = props => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)('stop', props);
const SVG = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
/**
 * @param {SVGProps}                                    props isPressed indicates whether the SVG should appear as pressed.
 *                                                            Other props will be passed through to svg component.
 * @param {import('react').ForwardedRef<SVGSVGElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element} Stop component
 */
({
  className,
  isPressed,
  ...props
}, ref) => {
  const appliedProps = {
    ...props,
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_0__["default"])(className, {
      'is-pressed': isPressed
    }) || undefined,
    'aria-hidden': true,
    focusable: false
  };

  // Disable reason: We need to have a way to render HTML tag for web.
  // eslint-disable-next-line react/forbid-elements
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
    ...appliedProps,
    ref: ref
  });
});
SVG.displayName = 'SVG';
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else // removed by dead control flow
{}
}());


/***/ }),

/***/ "./node_modules/clsx/dist/clsx.mjs":
/*!*****************************************!*\
  !*** ./node_modules/clsx/dist/clsx.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "./src/admin/App.js":
/*!**************************!*\
  !*** ./src/admin/App.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.scss */ "./src/admin/index.scss");
/* harmony import */ var _components_general_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/general-settings */ "./src/admin/components/general-settings.js");
/* harmony import */ var _components_design_settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/design-settings */ "./src/admin/components/design-settings.js");
/* harmony import */ var _components_form_feild_setiings__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/form-feild-setiings */ "./src/admin/components/form-feild-setiings.js");
/* harmony import */ var _components_display_trigger_settings__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/display-trigger-settings */ "./src/admin/components/display-trigger-settings.js");
/* harmony import */ var _components_security_settings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/security-settings */ "./src/admin/components/security-settings.js");
/* harmony import */ var _components_integration_settings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/integration-settings */ "./src/admin/components/integration-settings.js");
/* harmony import */ var _components_tools_settings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/tools-settings */ "./src/admin/components/tools-settings.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }












var TABS = [{
  id: "general",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("General", "th-login"),
  icon: "admin-settings"
}, {
  id: "form-fields",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Form Fields", "th-login"),
  icon: "feedback"
}, {
  id: "design",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Design", "th-login"),
  icon: "art"
}, {
  id: "display-triggers",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Display Triggers", "th-login"),
  icon: "visibility"
}, {
  id: "integration",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Integration", "th-login"),
  icon: "admin-plugins"
}, {
  id: "security",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Security", "th-login"),
  icon: "shield"
}, {
  id: "tools",
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Tools", "th-login"),
  icon: "admin-tools"
}];
var general = {
  plugin_status: "enabled",
  form_type: 'double',
  display_mode: 'popup',
  default_register_role: 'subscriber',
  auto_login_after_registration: false,
  close_button: true,
  redirects: {
    after_login: {
      type: "current_page",
      url: ""
    },
    after_logout: {
      type: "home_page",
      url: ""
    },
    after_register: {
      type: "current_page",
      url: ""
    },
    role_based_redirects: [] // Ensure this is an array
  },
  manual_user_approval: {
    enabled: false
  }
};
var form_fields = {
  login: [{
    id: 'username',
    label: 'Username or Email',
    name: 'username',
    type: 'text',
    placeholder: 'Enter your username or email',
    required: true,
    icon: 'user',
    error_message: 'Username or email is required.',
    predefined: true
  }, {
    id: 'password',
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    icon: 'lock',
    error_message: 'Password is required.',
    predefined: true
  }, {
    id: 'remember_me',
    label: 'Remember Me',
    name: 'remember_me',
    type: 'checkbox',
    required: false,
    icon: '',
    show: true,
    error_message: '',
    predefined: true
  }],
  register: [{
    id: 'username',
    label: 'Choose a Username',
    name: 'username',
    type: 'text',
    placeholder: 'Enter your desired username',
    required: true,
    icon: 'user',
    error_message: 'Username is required.',
    predefined: true
  }, {
    id: 'email',
    label: 'Email Address',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    icon: 'email',
    error_message: 'Email address is required.',
    predefined: false
  }, {
    id: 'password',
    label: 'Create Password',
    name: 'password',
    type: 'password',
    placeholder: 'Create a strong password',
    required: true,
    icon: 'lock',
    check: {
      text: true,
      number: false,
      special_charcter: false
    },
    maxInput: 20,
    minInput: 5,
    error_message: 'Password is required.',
    predefined: true
  }, {
    id: 'confirm_password',
    label: 'Confirm Password',
    name: 'confirm_password',
    type: 'password',
    placeholder: 'Confirm your password',
    required: true,
    icon: 'lock',
    error_message: 'Please confirm your password.',
    predefined: true
  }, {
    id: 'first_name',
    label: 'First Name',
    name: 'first_name',
    type: 'text',
    placeholder: 'Your first name',
    required: false,
    icon: 'user',
    show: false,
    error_message: 'First name is required.',
    predefined: false
  }, {
    id: 'last_name',
    label: 'Last Name',
    name: 'last_name',
    type: 'text',
    placeholder: 'Your last name',
    required: false,
    icon: 'user',
    show: false,
    error_message: 'Last name is required.',
    predefined: false
  }, {
    id: 'terms_and_conditions',
    label: 'I agree to the Terms & Conditions',
    name: 'terms_and_conditions',
    type: 'checkbox',
    required: true,
    icon: '',
    show: true,
    error_message: 'You must agree to the Terms & Conditions.',
    predefined: false,
    link: ""
  }, {
    id: 'honeypot',
    label: '',
    name: 'honeypot',
    type: 'text',
    icon: '',
    show: false,
    hidden: true,
    error_message: ''
  }],
  forgot_password: [{
    id: 'user_login',
    label: 'Email Address',
    name: 'user_login',
    type: 'text',
    placeholder: 'Enter your email to reset password',
    required: true,
    icon: 'email',
    error_message: 'Email address is required to reset password.',
    predefined: true
  }]
};
var design = {
  modal: {
    layout_type: 'popup',
    modal_background: {
      type: "image",
      // 'color' | 'gradient' | 'image'
      color: "#ffffff",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      opacity: 1,
      image: {
        url: "",
        // Image URL
        position: "center center",
        // e.g. 'top left', 'center center'
        size: "cover",
        // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
    form_background: {
      type: "image",
      // 'color' | 'gradient' | 'image'
      color: "#ffffff",
      gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
      opacity: 1,
      image: {
        url: "",
        // Image URL
        position: "center center",
        // e.g. 'top left', 'center center'
        size: "cover",
        // 'cover' | 'contain' | 'auto'
        repeat: "no-repeat" // optional: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y'
      }
    },
    form_border: {
      width: {
        top: 1,
        right: 1,
        bottom: 1,
        left: 1
      },
      style: "solid",
      color: "#000000",
      radius: {
        topLeft: 6,
        topRight: 6,
        bottomRight: 6,
        bottomLeft: 6
      }
    }
  }
};
var display_triggers = {
  trigger_css_class: "th-login-trigger",
  auto_open_on_load: {
    enabled: true,
    delay_seconds: 2
  },
  auto_open_on_scroll: {
    enabled: false,
    scroll_percentage: 50
  },
  auto_open_on_exit_intent: {
    enabled: false
  },
  auto_open_on_time_on_page: {
    enabled: false,
    time_seconds: 10
  },
  auto_open_conditions: {
    for_logged_out_only: true,
    for_specific_roles: [],
    on_specific_pages: {
      enabled: false,
      page_ids: [],
      page_slugs: []
    },
    on_specific_categories: {
      enabled: false,
      category_ids: [],
      category_slugs: []
    },
    on_specific_tags: {
      enabled: false,
      tag_ids: [],
      tag_slugs: []
    },
    on_woocommerce_myaccount: false,
    on_woocommerce_checkout: false,
    device_visibility: {
      desktop: true,
      tablet: true,
      mobile: true
    },
    url_parameter_trigger: {
      enabled: false,
      param_name: "th_login",
      param_value: "open"
    },
    referrer_detection: {
      enabled: false,
      referrer_urls: []
    }
  },
  pop_up_frequency: {
    enabled: false,
    type: "session",
    days: 7
  },
  menu_integration: {
    enabled: false,
    menu_slug: "primary",
    item_text_login: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login", "th-login"),
    item_text_register: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Register", "th-login"),
    item_icon_login: "dashicons-admin-users",
    item_icon_register: "dashicons-plus-alt",
    visibility_login_logged_in: false,
    visibility_register_logged_in: false
  }
};
var security = {
  brute_force_protection: {
    enabled: true,
    max_attempts: 5,
    lockout_duration_minutes: 30,
    auto_ip_blacklist_enabled: true
  },
  recaptcha: {
    enabled: false,
    type: "v2_checkbox",
    site_key: "",
    secret_key: ""
  },
  honeypot_enabled: true
};

// Main React App Component
var App = function App() {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      general: general,
      design: design,
      form_fields: form_fields,
      display_triggers: display_triggers,
      security: security
    }),
    _useState2 = _slicedToArray(_useState, 2),
    settings = _useState2[0],
    setSettings = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isSaving = _useState6[0],
    setIsSaving = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    message = _useState8[0],
    setMessage = _useState8[1]; // { type: 'success' | 'error', text: '...' }
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState0 = _slicedToArray(_useState9, 2),
    exportedSettings = _useState0[0],
    setExportedSettings = _useState0[1];
  var _useState1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(""),
    _useState10 = _slicedToArray(_useState1, 2),
    importSettingsText = _useState10[0],
    setImportSettingsText = _useState10[1];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isResetConfirmOpen = _useState12[0],
    setIsResetConfirmOpen = _useState12[1]; // State for reset confirmation dialog
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)("general"),
    _useState14 = _slicedToArray(_useState13, 2),
    activeTab = _useState14[0],
    setActiveTab = _useState14[1];
  var importTextareaRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null); // Ref for import textarea

  // Fetch settings on component mount.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var fetchSettings = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var response, _mergedSettings$gener, mergedSettings, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
                path: "th-login/v1/settings",
                method: "POST",
                data: {
                  action: "fetch_settings"
                }
              });
            case 1:
              response = _context.v;
              if (response.success) {
                // Deep merge fetched settings with default structure to ensure all keys exist.
                mergedSettings = _deepMerge(settings, response.settings);
                if (!Array.isArray((_mergedSettings$gener = mergedSettings.general) === null || _mergedSettings$gener === void 0 || (_mergedSettings$gener = _mergedSettings$gener.redirects) === null || _mergedSettings$gener === void 0 ? void 0 : _mergedSettings$gener.role_based_redirects)) {
                  mergedSettings.general.redirects.role_based_redirects = [];
                }
                setSettings(mergedSettings);
              } else {
                setMessage({
                  type: "error",
                  text: response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to load settings.", "th-login")
                });
              }
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              console.error("Error fetching settings:", _t);
              setMessage({
                type: "error",
                text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Error loading settings. Please check console.", "th-login")
              });
            case 3:
              _context.p = 3;
              setIsLoading(false);
              return _context.f(3);
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2, 3, 4]]);
      }));
      return function fetchSettings() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchSettings();
  }, []); // Empty dependency array means this runs once on mount.

  var _deepMerge = function deepMerge(target, source) {
    var output = _objectSpread({}, target);
    if (target && _typeof(target) === "object" && source && _typeof(source) === "object") {
      Object.keys(source).forEach(function (key) {
        // Handle arrays: if source[key] is an array, replace directly.
        // Otherwise, if it's an object, deep merge.
        // Otherwise, assign directly.
        if (Array.isArray(source[key])) {
          output[key] = source[key];
        } else if (source[key] && _typeof(source[key]) === "object") {
          if (!(key in output)) {
            Object.assign(output, _defineProperty({}, key, source[key]));
          } else {
            output[key] = _deepMerge(output[key], source[key]);
          }
        } else {
          Object.assign(output, _defineProperty({}, key, source[key]));
        }
      });
    }
    return output;
  };
  var handleSettingChange = function handleSettingChange(category, path, value) {
    setSettings(function (prevSettings) {
      var newCategorySettings = _objectSpread({}, prevSettings[category]);
      var current = newCategorySettings;
      for (var i = 0; i < path.length - 1; i++) {
        var key = path[i];
        if (!current[key] || _typeof(current[key]) !== "object" || Array.isArray(current[key])) {
          current[key] = {}; // Initialize if not an object or if it's an array (should be object for path)
        }
        current = current[key];
      }
      current[path[path.length - 1]] = value;
      return _objectSpread(_objectSpread({}, prevSettings), {}, _defineProperty({}, category, newCategorySettings));
    });
  };

  // Handle saving settings.
  var handleSaveSettings = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var response, _mergedSettings$form_, _mergedSettings$gener2, fetchedSettings, mergedSettings, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            setIsSaving(true);
            setMessage(null);
            _context2.p = 1;
            _context2.n = 2;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "th-login/v1/settings",
              method: "POST",
              data: settings
            });
          case 2:
            response = _context2.v;
            if (response.success) {
              setMessage({
                type: "success",
                text: response.message
              });
              fetchedSettings = response.settings; // Deep merge again to ensure the state is fully consistent with backend and defaults.
              mergedSettings = _deepMerge(settings, fetchedSettings); // Ensure specific arrays are initialized.
              if (!Array.isArray((_mergedSettings$form_ = mergedSettings.form_fields) === null || _mergedSettings$form_ === void 0 || (_mergedSettings$form_ = _mergedSettings$form_.register) === null || _mergedSettings$form_ === void 0 ? void 0 : _mergedSettings$form_.custom_fields)) {
                mergedSettings.form_fields.register.custom_fields = [];
              }
              if (!Array.isArray((_mergedSettings$gener2 = mergedSettings.general) === null || _mergedSettings$gener2 === void 0 || (_mergedSettings$gener2 = _mergedSettings$gener2.redirects) === null || _mergedSettings$gener2 === void 0 ? void 0 : _mergedSettings$gener2.role_based_redirects)) {
                mergedSettings.general.redirects.role_based_redirects = [];
              }
              setSettings(mergedSettings);
            } else {
              setMessage({
                type: "error",
                text: response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to save settings.", "th-login")
              });
            }
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            setMessage({
              type: "error",
              text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Error saving settings. Please check console.", "th-login")
            });
            console.error("Error saving settings:", _t2);
          case 4:
            _context2.p = 4;
            setIsSaving(false);
            setTimeout(function () {
              return setMessage(null);
            }, 5000);
            return _context2.f(4);
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 3, 4, 5]]);
    }));
    return function handleSaveSettings() {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleExportSettings = function handleExportSettings() {
    // Create a copy of settings, remove sensitive info if any (e.g., reCAPTCHA secret key).
    // For now, we'll export everything.
    var settingsToExport = JSON.stringify(settings, null, 2); // Pretty print JSON
    setExportedSettings(settingsToExport);
    // Optionally, copy to clipboard automatically.
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(settingsToExport).then(function () {
        return setMessage({
          type: "success",
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Settings copied to clipboard!", "th-login")
        });
      })["catch"](function () {
        return setMessage({
          type: "error",
          text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to copy settings to clipboard. Please copy manually.", "th-login")
        });
      });
    } else {
      setMessage({
        type: "info",
        text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Please manually copy the settings from the text area below.", "th-login")
      });
      if (importTextareaRef.current) {
        importTextareaRef.current.select();
      }
    }
  };
  var handleImportSettings = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var importedData, response, _mergedSettings$form_2, _mergedSettings$gener3, fetchedSettings, mergedSettings, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            setIsSaving(true);
            setMessage(null);
            _context3.p = 1;
            importedData = JSON.parse(importSettingsText); // Basic validation to ensure it's a valid settings structure.
            if (!(_typeof(importedData) !== "object" || !importedData.general || !importedData.design)) {
              _context3.n = 2;
              break;
            }
            throw new Error((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Invalid settings format. Please provide a valid JSON object.", "th-login"));
          case 2:
            _context3.n = 3;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "th-login/v1/settings",
              method: "POST",
              data: importedData // Send the imported data directly
            });
          case 3:
            response = _context3.v;
            if (response.success) {
              setMessage({
                type: "success",
                text: response.message
              });
              fetchedSettings = response.settings;
              mergedSettings = _deepMerge(settings, fetchedSettings);
              if (!Array.isArray((_mergedSettings$form_2 = mergedSettings.form_fields) === null || _mergedSettings$form_2 === void 0 || (_mergedSettings$form_2 = _mergedSettings$form_2.register) === null || _mergedSettings$form_2 === void 0 ? void 0 : _mergedSettings$form_2.custom_fields)) {
                mergedSettings.form_fields.register.custom_fields = [];
              }
              if (!Array.isArray((_mergedSettings$gener3 = mergedSettings.general) === null || _mergedSettings$gener3 === void 0 || (_mergedSettings$gener3 = _mergedSettings$gener3.redirects) === null || _mergedSettings$gener3 === void 0 ? void 0 : _mergedSettings$gener3.role_based_redirects)) {
                mergedSettings.general.redirects.role_based_redirects = [];
              }
              setSettings(mergedSettings);
              setImportSettingsText(""); // Clear textarea after successful import
            } else {
              setMessage({
                type: "error",
                text: response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to import settings.", "th-login")
              });
            }
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            setMessage({
              type: "error",
              text: _t3.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Error parsing or importing settings. Please ensure valid JSON.", "th-login")
            });
            console.error("Error importing settings:", _t3);
          case 5:
            _context3.p = 5;
            setIsSaving(false);
            setTimeout(function () {
              return setMessage(null);
            }, 5000);
            return _context3.f(5);
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 4, 5, 6]]);
    }));
    return function handleImportSettings() {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleResetSettings = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var response, fetchResponse, _mergedSettings$form_3, _mergedSettings$gener4, mergedSettings, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            setIsResetConfirmOpen(false); // Close confirmation dialog
            setIsSaving(true);
            setMessage(null);
            _context4.p = 1;
            _context4.n = 2;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "th-login/v1/reset-settings",
              // New endpoint for reset
              method: "POST"
            });
          case 2:
            response = _context4.v;
            if (!response.success) {
              _context4.n = 4;
              break;
            }
            setMessage({
              type: "success",
              text: response.message
            });
            // Re-fetch settings to load the newly reset defaults
            _context4.n = 3;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "th-login/v1/settings",
              method: "POST",
              data: {
                action: "fetch_settings"
              }
            });
          case 3:
            fetchResponse = _context4.v;
            if (fetchResponse.success) {
              mergedSettings = _deepMerge(settings, fetchResponse.settings);
              if (!Array.isArray((_mergedSettings$form_3 = mergedSettings.form_fields) === null || _mergedSettings$form_3 === void 0 || (_mergedSettings$form_3 = _mergedSettings$form_3.register) === null || _mergedSettings$form_3 === void 0 ? void 0 : _mergedSettings$form_3.custom_fields)) {
                mergedSettings.form_fields.register.custom_fields = [];
              }
              if (!Array.isArray((_mergedSettings$gener4 = mergedSettings.general) === null || _mergedSettings$gener4 === void 0 || (_mergedSettings$gener4 = _mergedSettings$gener4.redirects) === null || _mergedSettings$gener4 === void 0 ? void 0 : _mergedSettings$gener4.role_based_redirects)) {
                mergedSettings.general.redirects.role_based_redirects = [];
              }
              setSettings(mergedSettings);
            }
            _context4.n = 5;
            break;
          case 4:
            setMessage({
              type: "error",
              text: response.message || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Failed to reset settings.", "th-login")
            });
          case 5:
            _context4.n = 7;
            break;
          case 6:
            _context4.p = 6;
            _t4 = _context4.v;
            setMessage({
              type: "error",
              text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Error resetting settings. Please check console.", "th-login")
            });
            console.error("Error resetting settings:", _t4);
          case 7:
            _context4.p = 7;
            setIsSaving(false);
            setTimeout(function () {
              return setMessage(null);
            }, 5000);
            return _context4.f(7);
          case 8:
            return _context4.a(2);
        }
      }, _callee4, null, [[1, 6, 7, 8]]);
    }));
    return function handleResetSettings() {
      return _ref4.apply(this, arguments);
    };
  }();
  if (isLoading) {
    return /*#__PURE__*/React.createElement("div", {
      className: "th-login-admin-wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader"
    }, /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader-circle"
    }), /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader-circle"
    }), /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader-circle"
    }), /*#__PURE__*/React.createElement("div", {
      className: "th-login-loader-circle"
    })), /*#__PURE__*/React.createElement("p", {
      className: "th-login-loading-text"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Loading settings...", "th-login")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "th-login-admin-modern"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-content"
  }, /*#__PURE__*/React.createElement("h2", null, /*#__PURE__*/React.createElement("span", {
    className: "th-logo"
  }, "TH"), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login Settings", "th-login")), message && /*#__PURE__*/React.createElement("div", {
    className: "notice-banner ".concat(message.type)
  }, /*#__PURE__*/React.createElement("p", null, message.text)))), /*#__PURE__*/React.createElement("div", {
    className: "admin-container"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "admin-sidebar"
  }, /*#__PURE__*/React.createElement("ul", null, TABS.map(function (tab) {
    return /*#__PURE__*/React.createElement("li", {
      key: tab.id,
      className: activeTab === tab.id ? "active" : ""
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setActiveTab(tab.id);
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "dashicons dashicons-".concat(tab.icon)
    }), tab.label));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "admin-content"
  }, activeTab === "general" && /*#__PURE__*/React.createElement(_components_general_settings__WEBPACK_IMPORTED_MODULE_5__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
  }), activeTab === "design" && /*#__PURE__*/React.createElement(_components_design_settings__WEBPACK_IMPORTED_MODULE_6__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
  }), activeTab === "form-fields" && /*#__PURE__*/React.createElement(_components_form_feild_setiings__WEBPACK_IMPORTED_MODULE_7__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
    // addCustomField={addCustomField}
    // updateCustomField={updateCustomField}
    // removeCustomField={removeCustomField}
  }), activeTab === "display-triggers" && /*#__PURE__*/React.createElement(_components_display_trigger_settings__WEBPACK_IMPORTED_MODULE_8__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
  }), activeTab === "security" && /*#__PURE__*/React.createElement(_components_security_settings__WEBPACK_IMPORTED_MODULE_9__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
  }), activeTab === "integration" && /*#__PURE__*/React.createElement(_components_integration_settings__WEBPACK_IMPORTED_MODULE_10__["default"], {
    settings: settings,
    handleSettingChange: handleSettingChange
  }), activeTab === "tools" && /*#__PURE__*/React.createElement(_components_tools_settings__WEBPACK_IMPORTED_MODULE_11__["default"], {
    settings: settings,
    exportedSettings: exportedSettings,
    setExportedSettings: setExportedSettings,
    importSettingsText: importSettingsText,
    setImportSettingsText: setImportSettingsText,
    handleExportSettings: handleExportSettings,
    handleImportSettings: handleImportSettings,
    isSaving: isSaving,
    setIsResetConfirmOpen: setIsResetConfirmOpen
  }))), /*#__PURE__*/React.createElement("div", {
    className: "save-settings"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isPrimary: true,
    onClick: handleSaveSettings,
    disabled: isSaving,
    className: "save-button"
  }, isSaving && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Spinner, null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Save Changes", "th-login"))), isResetConfirmOpen && /*#__PURE__*/React.createElement("div", {
    className: "confirmation-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reset All Settings?", "th-login")), /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("This will restore all settings to default values. This cannot be undone.", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isSecondary: true,
    onClick: function onClick() {
      return setIsResetConfirmOpen(false);
    },
    className: "cancel-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Cancel", "th-login")), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
    isDestructive: true,
    onClick: handleResetSettings,
    className: "confirm-button"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reset Settings", "th-login"))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/admin/components/accordion-section.js":
/*!***************************************************!*\
  !*** ./src/admin/components/accordion-section.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// File: AccordionSection.js



var AccordionSection = function AccordionSection(_ref) {
  var title = _ref.title,
    children = _ref.children,
    _ref$defaultOpen = _ref.defaultOpen,
    defaultOpen = _ref$defaultOpen === void 0 ? false : _ref$defaultOpen;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(defaultOpen),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  return /*#__PURE__*/React.createElement("div", {
    className: "th-accordion-section ".concat(open ? "open" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "accordion-header",
    onClick: function onClick() {
      return setOpen(!open);
    }
  }, /*#__PURE__*/React.createElement("span", null, title), /*#__PURE__*/React.createElement("span", {
    className: "accordion-icon rotated"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
    icon: "chevron-down"
  }))), open && /*#__PURE__*/React.createElement("div", {
    className: "accordion-body"
  }, children));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccordionSection);

/***/ }),

/***/ "./src/admin/components/border-box-control.js":
/*!****************************************************!*\
  !*** ./src/admin/components/border-box-control.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BorderBoxControl: () => (/* binding */ BorderBoxControl)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/grid.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }




 // Any icon, can change to 'fullscreen', 'block-table', etc.

var BorderBoxControl = function BorderBoxControl(_ref) {
  var _values$top, _values$right, _values$bottom, _values$left;
  var label = _ref.label,
    _ref$values = _ref.values,
    values = _ref$values === void 0 ? {} : _ref$values,
    onChange = _ref.onChange;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    syncAll = _useState2[0],
    setSyncAll = _useState2[1];
  var handleChange = function handleChange(side, value) {
    var cleanValue = parseInt(value) || 0;
    if (syncAll) {
      onChange({
        top: cleanValue,
        right: cleanValue,
        bottom: cleanValue,
        left: cleanValue
      });
    } else {
      onChange(_objectSpread(_objectSpread({}, values), {}, _defineProperty({}, side, cleanValue)));
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "th-border-inline-box"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "th-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "th-border-row"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
    value: (_values$top = values.top) !== null && _values$top !== void 0 ? _values$top : 0,
    type: "number",
    onChange: function onChange(val) {
      return handleChange('top', val);
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
    value: (_values$right = values.right) !== null && _values$right !== void 0 ? _values$right : 0,
    type: "number",
    onChange: function onChange(val) {
      return handleChange('right', val);
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
    value: (_values$bottom = values.bottom) !== null && _values$bottom !== void 0 ? _values$bottom : 0,
    type: "number",
    onChange: function onChange(val) {
      return handleChange('bottom', val);
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
    value: (_values$left = values.left) !== null && _values$left !== void 0 ? _values$left : 0,
    type: "number",
    onChange: function onChange(val) {
      return handleChange('left', val);
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Tooltip, {
    text: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Apply same to all sides', 'th-login')
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.IconButton, {
    icon: /*#__PURE__*/React.createElement(_wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"], {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
    }),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Apply to all sides', 'th-login'),
    isPressed: syncAll,
    onClick: function onClick() {
      return setSyncAll(!syncAll);
    }
  }))));
};

/***/ }),

/***/ "./src/admin/components/custom-select-control.js":
/*!*******************************************************!*\
  !*** ./src/admin/components/custom-select-control.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomSelectControl: () => (/* binding */ CustomSelectControl)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



var CustomSelectControl = function CustomSelectControl(_ref) {
  var _options$find;
  var label = _ref.label,
    value = _ref.value,
    options = _ref.options,
    onChange = _ref.onChange,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$help = _ref.help,
    help = _ref$help === void 0 ? '' : _ref$help,
    _ref$placeholder = _ref.placeholder,
    placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(-1),
    _useState4 = _slicedToArray(_useState3, 2),
    highlightedIndex = _useState4[0],
    setHighlightedIndex = _useState4[1];
  var selectRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  var dropdownRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);

  // Close dropdown when clicking outside
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    var handleClickOutside = function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      return document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (!isOpen) return;
    var handleKeyDown = function handleKeyDown(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex(function (prev) {
          return Math.min(prev + 1, options.length - (placeholder ? 0 : 1));
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex(function (prev) {
          return Math.max(prev - 1, 0);
        });
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        var selectedOption = options[highlightedIndex - (placeholder ? 1 : 0)];
        if (selectedOption) {
          onChange(selectedOption.value);
          setIsOpen(false);
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return function () {
      return document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, highlightedIndex, options, placeholder]);
  var selectedLabel = ((_options$find = options.find(function (opt) {
    return opt.value === value;
  })) === null || _options$find === void 0 ? void 0 : _options$find.label) || placeholder;
  return /*#__PURE__*/React.createElement("div", {
    className: "modern-select-control ".concat(className, " ").concat(isOpen ? 'is-open' : ''),
    ref: selectRef
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "modern-select-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "modern-select-trigger",
    onClick: function onClick() {
      return setIsOpen(!isOpen);
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === ' ' && setIsOpen(!isOpen);
    },
    tabIndex: "0",
    role: "button",
    "aria-haspopup": "listbox",
    "aria-expanded": isOpen
  }, /*#__PURE__*/React.createElement("span", {
    className: "modern-select-value"
  }, selectedLabel), /*#__PURE__*/React.createElement("span", {
    className: "modern-select-arrow"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
    icon: isOpen ? "arrow-up-alt2" : "arrow-down-alt2"
  }))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: "modern-select-dropdown",
    ref: dropdownRef,
    role: "listbox"
  }, placeholder && /*#__PURE__*/React.createElement("div", {
    className: "modern-select-option ".concat(!value ? 'is-selected' : ''),
    onClick: function onClick() {
      onChange('');
      setIsOpen(false);
    },
    onMouseEnter: function onMouseEnter() {
      return setHighlightedIndex(0);
    }
  }, placeholder), options.map(function (option, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: option.value,
      className: "modern-select-option ".concat(value === option.value ? 'is-selected' : '', " ").concat(highlightedIndex === index + (placeholder ? 1 : 0) ? 'is-highlighted' : ''),
      onClick: function onClick() {
        onChange(option.value);
        setIsOpen(false);
      },
      onMouseEnter: function onMouseEnter() {
        return setHighlightedIndex(index + (placeholder ? 1 : 0));
      },
      role: "option",
      "aria-selected": value === option.value
    }, option.label);
  })), help && /*#__PURE__*/React.createElement("p", {
    className: "modern-select-help"
  }, help));
};

/***/ }),

/***/ "./src/admin/components/design-settings.js":
/*!*************************************************!*\
  !*** ./src/admin/components/design-settings.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _accordion_section__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./accordion-section */ "./src/admin/components/accordion-section.js");
/* harmony import */ var _custom_select_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom-select-control */ "./src/admin/components/custom-select-control.js");
/* harmony import */ var _border_box_control__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./border-box-control */ "./src/admin/components/border-box-control.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }










var DesignEditor = function DesignEditor(_ref) {
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("login"),
    _useState2 = _slicedToArray(_useState, 2),
    activeForm = _useState2[0],
    setActiveForm = _useState2[1];
  var background = settings.design.modal.modal_background || {};
  var bgType = background.type || "color";
  var bgColor = background.color || "#ffffff";
  var bgGradient = background.gradient || "";
  var bgImage = background.image || {};
  var imageURL = bgImage.url || "";
  var position = bgImage.position || "center center";
  var size = bgImage.size || "cover";
  var repeat = bgImage.repeat || "no-repeat";
  var formBackground = settings.design.modal.form_background || {};
  var formBgType = formBackground.type || "color";
  var formBgColor = formBackground.color || "#ffffff";
  var formBgGradient = formBackground.gradient || "";
  var formBgImage = formBackground.image || {};
  var formImageURL = formBgImage.url || "";
  var formPosition = formBgImage.position || "center center";
  var formSize = formBgImage.size || "cover";
  var formRepeat = formBgImage.repeat || "no-repeat";
  var getFormBackgroundStyle = function getFormBackgroundStyle() {
    var _base$image;
    var base = settings.design.modal.form_background || {};
    var type = base.type || "color";
    if (type === "gradient") {
      return {
        backgroundImage: base.gradient,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        opacity: base.opacity
      };
    } else if (type === "image" && (_base$image = base.image) !== null && _base$image !== void 0 && _base$image.url) {
      return {
        backgroundImage: "url(".concat(base.image.url, ")"),
        backgroundSize: base.image.size || "cover",
        backgroundRepeat: base.image.repeat || "no-repeat",
        backgroundPosition: base.image.position || "center center",
        opacity: base.opacity
      };
    } else {
      return {
        backgroundColor: base.color || "#ffffff",
        opacity: base.opacity
      };
    }
  };
  var getModalBackgroundStyle = function getModalBackgroundStyle() {
    var _base$image2;
    var base = settings.design.modal.modal_background || {};
    var type = base.type || "color";
    if (type === "gradient") {
      return {
        backgroundImage: base.gradient,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        opacity: base.opacity
      };
    } else if (type === "image" && (_base$image2 = base.image) !== null && _base$image2 !== void 0 && _base$image2.url) {
      return {
        backgroundImage: "url(".concat(base.image.url, ")"),
        backgroundSize: base.image.size || "cover",
        backgroundRepeat: base.image.repeat || "no-repeat",
        backgroundPosition: base.image.position || "center center",
        opacity: base.opacity
      };
    } else {
      return {
        backgroundColor: base.color || "#ffffff",
        opacity: base.opacity
      };
    }
  };
  var getFormBorderStyle = function getFormBorderStyle() {
    var _width$top, _width$right, _width$bottom, _width$left, _radius$topLeft, _radius$topRight, _radius$bottomRight, _radius$bottomLeft;
    var border = settings.design.modal.form_border || {};
    var width = border.width || {};
    var radius = border.radius || {};
    return {
      borderTopWidth: "".concat((_width$top = width.top) !== null && _width$top !== void 0 ? _width$top : 0, "px"),
      borderRightWidth: "".concat((_width$right = width.right) !== null && _width$right !== void 0 ? _width$right : 0, "px"),
      borderBottomWidth: "".concat((_width$bottom = width.bottom) !== null && _width$bottom !== void 0 ? _width$bottom : 0, "px"),
      borderLeftWidth: "".concat((_width$left = width.left) !== null && _width$left !== void 0 ? _width$left : 0, "px"),
      borderStyle: border.style || "solid",
      borderColor: border.color || "#000000",
      borderTopLeftRadius: "".concat((_radius$topLeft = radius.topLeft) !== null && _radius$topLeft !== void 0 ? _radius$topLeft : 0, "px"),
      borderTopRightRadius: "".concat((_radius$topRight = radius.topRight) !== null && _radius$topRight !== void 0 ? _radius$topRight : 0, "px"),
      borderBottomRightRadius: "".concat((_radius$bottomRight = radius.bottomRight) !== null && _radius$bottomRight !== void 0 ? _radius$bottomRight : 0, "px"),
      borderBottomLeftRadius: "".concat((_radius$bottomLeft = radius.bottomLeft) !== null && _radius$bottomLeft !== void 0 ? _radius$bottomLeft : 0, "px"),
      borderWidth: "1px"
    };
  };
  var renderFormPreview = function renderFormPreview() {
    var formContent = function () {
      switch (activeForm) {
        case "register":
          return /*#__PURE__*/React.createElement("form", {
            className: "preview-form",
            style: getFormBackgroundStyle()
          }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Register", "th-login")), /*#__PURE__*/React.createElement("input", {
            type: "text",
            placeholder: "Username"
          }), /*#__PURE__*/React.createElement("input", {
            type: "email",
            placeholder: "Email"
          }), /*#__PURE__*/React.createElement("input", {
            type: "password",
            placeholder: "Password"
          }), /*#__PURE__*/React.createElement("input", {
            type: "password",
            placeholder: "Confirm Password"
          }), /*#__PURE__*/React.createElement("button", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Register", "th-login")));
        case "forgot":
          return /*#__PURE__*/React.createElement("form", {
            className: "preview-form",
            style: getFormBackgroundStyle()
          }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Forgot Password", "th-login")), /*#__PURE__*/React.createElement("input", {
            type: "text",
            placeholder: "Username or Email"
          }), /*#__PURE__*/React.createElement("button", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Reset Password", "th-login")));
        default:
          return /*#__PURE__*/React.createElement("form", {
            className: "preview-form",
            style: getFormBackgroundStyle()
          }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login", "th-login")), /*#__PURE__*/React.createElement("input", {
            type: "text",
            placeholder: "Username or Email"
          }), /*#__PURE__*/React.createElement("input", {
            type: "password",
            placeholder: "Password"
          }), /*#__PURE__*/React.createElement("div", {
            style: {
              textAlign: "left",
              margin: "10px 0"
            }
          }, /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", {
            type: "checkbox"
          }), " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Remember Me", "th-login"))), /*#__PURE__*/React.createElement("button", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login", "th-login")));
      }
    }();
    var layoutType = settings.design.modal.layout_type || "popup";
    var wrappedContent = /*#__PURE__*/React.createElement("div", {
      className: "form-background-preview"
    }, formContent);
    return layoutType === "sliding" ? /*#__PURE__*/React.createElement("div", {
      className: "preview-sliding-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      className: "side-panel-preview"
    }, wrappedContent)) : /*#__PURE__*/React.createElement("div", {
      className: "modal-box-preview"
    }, wrappedContent);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "design-editor-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "preview-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "preview-overlay layout-".concat(settings.design.modal.layout_type),
    style: getModalBackgroundStyle()
  }, renderFormPreview()), /*#__PURE__*/React.createElement("div", {
    className: "preview-switcher"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setActiveForm("login");
    },
    className: activeForm === "login" ? "active" : ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Login", "th-login")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setActiveForm("register");
    },
    className: activeForm === "register" ? "active" : ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Register", "th-login")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setActiveForm("forgot");
    },
    className: activeForm === "forgot" ? "active" : ""
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Forgot", "th-login")))), /*#__PURE__*/React.createElement("div", {
    className: "settings-panel"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "settings-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Design Settings", "th-login")), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
    className: "th-login-tabs",
    activeClass: "active-tab",
    tabs: [{
      name: "layout",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Modal", "th-login")
    }, {
      name: "container",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Form", "th-login")
    }, {
      name: "more",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Components", "th-login")
    }]
  }, function (tab) {
    var _background$opacity, _formBackground$opaci, _settings$design$moda, _settings$design$moda2, _settings$design$moda3, _settings$design$moda4;
    return /*#__PURE__*/React.createElement(React.Fragment, null, tab.name === "layout" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Layout", "th-login"),
      defaultOpen: false
    }, /*#__PURE__*/React.createElement("div", {
      className: "layout-style-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "layout-style-card ".concat(settings.design.modal.layout_type === "popup" ? "selected" : ""),
      onClick: function onClick() {
        return handleSettingChange("design", ["modal", "layout_type"], "popup");
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "layout-visual layout-popup"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-box"
    })), /*#__PURE__*/React.createElement("p", {
      className: "layout-name"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Popup Modal", "th-login"))), /*#__PURE__*/React.createElement("div", {
      className: "layout-style-card ".concat(settings.design.modal.layout_type === "sliding" ? "selected" : ""),
      onClick: function onClick() {
        return handleSettingChange("design", ["modal", "layout_type"], "sliding");
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "layout-visual layout-sliding"
    }, /*#__PURE__*/React.createElement("div", {
      className: "side-panel"
    })), /*#__PURE__*/React.createElement("p", {
      className: "layout-name"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Sliding Panel", "th-login"))))), /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background", "th-login"),
      defaultOpen: false
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Type", "th-login"),
      value: bgType,
      isBlock: true,
      onChange: function onChange(newType) {
        handleSettingChange("design", ["modal", "modal_background", "type"], newType);
      }
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "color",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Color", "th-login")
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "gradient",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Gradient", "th-login")
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "image",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Image", "th-login")
    })), bgType === "color" && /*#__PURE__*/React.createElement("div", {
      className: "background-color-picker"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
      color: bgColor,
      onChangeComplete: function onChangeComplete(value) {
        handleSettingChange("design", ["modal", "modal_background", "color"], value.hex);
      },
      disableAlpha: false
    })), bgType === "gradient" && /*#__PURE__*/React.createElement("div", {
      className: "background-gradient-picker"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.GradientPicker, {
      value: bgGradient,
      onChange: function onChange(value) {
        return handleSettingChange("design", ["modal", "modal_background", "gradient"], value);
      },
      gradients: [{
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Default", "th-login"),
        gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
        slug: "default"
      }, {
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Ocean Blue", "th-login"),
        gradient: "linear-gradient(135deg,#2BC0E4 0%,#EAECC6 100%)",
        slug: "ocean-blue"
      }]
    })), bgType === "image" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "image-url-input"
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Image URL", "th-login"),
      value: imageURL,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "modal_background", "image", "url"], val);
      },
      placeholder: "https://example.com/image.jpg"
    })), imageURL && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "10px"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: imageURL,
      alt: "Preview",
      style: {
        width: "100%",
        height: "auto",
        borderRadius: "6px",
        border: "1px solid #ccc",
        objectFit: "cover"
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "th-login-media-image"
    }, /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Position", "th-login"),
      value: position,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Left", "th-login"),
        value: "top left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Center", "th-login"),
        value: "top center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Right", "th-login"),
        value: "top right"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Left", "th-login"),
        value: "center left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Center", "th-login"),
        value: "center center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Right", "th-login"),
        value: "center right"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Left", "th-login"),
        value: "bottom left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Center", "th-login"),
        value: "bottom center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Right", "th-login"),
        value: "bottom right"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "modal_background", "image", "position"], val);
      }
    }), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Size", "th-login"),
      value: size,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Cover", "th-login"),
        value: "cover"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Contain", "th-login"),
        value: "contain"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Auto", "th-login"),
        value: "auto"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "modal_background", "image", "size"], val);
      }
    }), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat", "th-login"),
      value: repeat,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No Repeat", "th-login"),
        value: "no-repeat"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat", "th-login"),
        value: "repeat"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat X", "th-login"),
        value: "repeat-x"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat Y", "th-login"),
        value: "repeat-y"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "modal_background", "image", "repeat"], val);
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "background-opacity-slider",
      style: {
        marginTop: "16px"
      }
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Opacity", "th-login"),
      value: (_background$opacity = background.opacity) !== null && _background$opacity !== void 0 ? _background$opacity : 1,
      onChange: function onChange(val) {
        handleSettingChange("design", ["modal", "modal_background", "opacity"], val);
      },
      min: 0,
      max: 1,
      step: 0.1,
      withInputField: true
    })))), tab.name === "container" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background", "th-login"),
      defaultOpen: false
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Background Type", "th-login"),
      value: formBgType,
      isBlock: true,
      onChange: function onChange(newType) {
        handleSettingChange("design", ["modal", "form_background", "type"], newType);
      }
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "color",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Color", "th-login")
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "gradient",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Gradient", "th-login")
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalToggleGroupControlOption, {
      value: "image",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Image", "th-login")
    })), formBgType === "color" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
      color: formBgColor,
      onChangeComplete: function onChangeComplete(val) {
        return handleSettingChange("design", ["modal", "form_background", "color"], val.hex);
      },
      disableAlpha: false
    }), formBgType === "gradient" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.GradientPicker, {
      value: formBgGradient,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "gradient"], val);
      },
      gradients: [{
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Default", "th-login"),
        gradient: "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
        slug: "default"
      }, {
        name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Ocean Blue", "th-login"),
        gradient: "linear-gradient(135deg,#2BC0E4 0%,#EAECC6 100%)",
        slug: "ocean-blue"
      }]
    }), formBgType === "image" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Image URL", "th-login"),
      value: formImageURL,
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "image", "url"], val);
      }
    }), formImageURL && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("img", {
      src: formImageURL,
      alt: "Form Background Preview",
      style: {
        width: "100%",
        height: "auto",
        borderRadius: "6px",
        border: "1px solid #ccc",
        objectFit: "cover",
        marginTop: "10px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "th-login-media-image"
    }, /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Position", "th-login"),
      value: formPosition,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Left", "th-login"),
        value: "top left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Center", "th-login"),
        value: "top center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Top Right", "th-login"),
        value: "top right"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Left", "th-login"),
        value: "center left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Center", "th-login"),
        value: "center center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Center Right", "th-login"),
        value: "center right"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Left", "th-login"),
        value: "bottom left"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Center", "th-login"),
        value: "bottom center"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Bottom Right", "th-login"),
        value: "bottom right"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "image", "position"], val);
      }
    }), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Size", "th-login"),
      value: formSize,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Cover", "th-login"),
        value: "cover"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Contain", "th-login"),
        value: "contain"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Auto", "th-login"),
        value: "auto"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "image", "size"], val);
      }
    }), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat", "th-login"),
      value: formRepeat,
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("No Repeat", "th-login"),
        value: "no-repeat"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat", "th-login"),
        value: "repeat"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat X", "th-login"),
        value: "repeat-x"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Repeat Y", "th-login"),
        value: "repeat-y"
      }],
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_background", "image", "repeat"], val);
      }
    })))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Opacity", "th-login"),
      value: (_formBackground$opaci = formBackground.opacity) !== null && _formBackground$opaci !== void 0 ? _formBackground$opaci : 1,
      onChange: function onChange(val) {
        handleSettingChange("design", ["modal", "form_background", "opacity"], val);
      },
      min: 0,
      max: 1,
      step: 0.1,
      withInputField: true
    })), /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Border", "th-login"),
      defaultOpen: false
    }, /*#__PURE__*/React.createElement("div", {
      className: "th-login-border-controls"
    }, /*#__PURE__*/React.createElement(_border_box_control__WEBPACK_IMPORTED_MODULE_5__.BorderBoxControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Border Width", "th-login"),
      values: ((_settings$design$moda = settings.design.modal.form_border) === null || _settings$design$moda === void 0 ? void 0 : _settings$design$moda.width) || {},
      onChange: function onChange(newVal) {
        return handleSettingChange("design", ["modal", "form_border", "width"], newVal);
      },
      min: 0,
      max: 20
    })), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_4__.CustomSelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Style", "th-login"),
      value: ((_settings$design$moda2 = settings.design.modal.form_border) === null || _settings$design$moda2 === void 0 ? void 0 : _settings$design$moda2.style) || "solid",
      options: [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Solid", "th-login"),
        value: "solid"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Dashed", "th-login"),
        value: "dashed"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Dotted", "th-login"),
        value: "dotted"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Double", "th-login"),
        value: "double"
      }, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("None", "th-login"),
        value: "none"
      }],
      className: "modern-border-select-control",
      onChange: function onChange(val) {
        return handleSettingChange("design", ["modal", "form_border", "style"], val);
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPicker, {
      color: ((_settings$design$moda3 = settings.design.modal.form_border) === null || _settings$design$moda3 === void 0 ? void 0 : _settings$design$moda3.color) || "#000000",
      onChangeComplete: function onChangeComplete(val) {
        return handleSettingChange("design", ["modal", "form_border", "color"], val.hex);
      },
      disableAlpha: false
    }), /*#__PURE__*/React.createElement("hr", {
      style: {
        margin: "16px 0"
      }
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalBorderRadiusControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Border Radius", "th-login"),
      values: ((_settings$design$moda4 = settings.design.modal.form_border) === null || _settings$design$moda4 === void 0 ? void 0 : _settings$design$moda4.radius) || {},
      onChange: function onChange(newRadius) {
        return handleSettingChange("design", ["modal", "form_border", "radius"], newRadius);
      }
    }))), tab.name === "more" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Heading", "th-login"),
      defaultOpen: false
    }), /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Input", "th-login"),
      defaultOpen: false
    }), /*#__PURE__*/React.createElement(_accordion_section__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Button", "th-login"),
      defaultOpen: false
    })));
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DesignEditor);

/***/ }),

/***/ "./src/admin/components/display-trigger-settings.js":
/*!**********************************************************!*\
  !*** ./src/admin/components/display-trigger-settings.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var DisplayTriggersSettings = function DisplayTriggersSettings(_ref) {
  var _settings$display_tri, _settings$display_tri2, _settings$display_tri3, _settings$display_tri4, _settings$display_tri5, _settings$display_tri6, _settings$display_tri7, _settings$display_tri8, _settings$display_tri9, _settings$display_tri0, _settings$display_tri1, _settings$display_tri10, _settings$display_tri11, _settings$display_tri12, _settings$display_tri13, _settings$display_tri14, _settings$display_tri15, _settings$display_tri16, _settings$display_tri17, _settings$display_tri18, _settings$display_tri19, _settings$display_tri20, _settings$display_tri21, _settings$display_tri22, _settings$display_tri23, _settings$display_tri24, _settings$display_tri25, _settings$display_tri26, _settings$display_tri27, _settings$display_tri28, _settings$display_tri29, _settings$display_tri30, _settings$display_tri31, _settings$display_tri32, _settings$display_tri33, _settings$display_tri34, _settings$display_tri35, _settings$display_tri36, _settings$display_tri37, _settings$display_tri38, _settings$display_tri39, _settings$display_tri40, _settings$display_tri41, _settings$display_tri42, _settings$display_tri43, _settings$display_tri44, _settings$display_tri45, _settings$display_tri46, _settings$display_tri47, _settings$display_tri48;
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-visibility"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Display Triggers", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Trigger Methods", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("CSS Class Trigger", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Class name to trigger the modal", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: settings.display_triggers.trigger_css_class || "th-login-trigger",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["trigger_css_class"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Shortcode", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Use [th_login_popup_link] to generate trigger links", "th-login"))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Open Conditions", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("On Page Load", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open when page loads", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri = settings.display_triggers.auto_open_on_load) === null || _settings$display_tri === void 0 ? void 0 : _settings$display_tri.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_on_load", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri2 = settings.display_triggers.auto_open_on_load) === null || _settings$display_tri2 === void 0 ? void 0 : _settings$display_tri2.enabled) && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Delay (seconds)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Delay before showing the modal", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "0",
    value: ((_settings$display_tri3 = settings.display_triggers.auto_open_on_load) === null || _settings$display_tri3 === void 0 ? void 0 : _settings$display_tri3.delay_seconds) || 0,
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_on_load", "delay_seconds"], parseInt(newValue, 10));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Open on Scroll", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal when the user scrolls down a certain percentage of the page.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri4 = settings.display_triggers.auto_open_on_scroll) === null || _settings$display_tri4 === void 0 ? void 0 : _settings$display_tri4.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_on_scroll', 'enabled'], isChecked);
    }
  }))), ((_settings$display_tri5 = settings.display_triggers.auto_open_on_scroll) === null || _settings$display_tri5 === void 0 ? void 0 : _settings$display_tri5.enabled) && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Scroll Percentage (%)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Percentage of the page scrolled before the modal opens.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    max: "100",
    value: ((_settings$display_tri6 = settings.display_triggers.auto_open_on_scroll) === null || _settings$display_tri6 === void 0 ? void 0 : _settings$display_tri6.scroll_percentage) || 50,
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_on_scroll', 'scroll_percentage'], parseInt(newValue, 10));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Open on Exit Intent", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal when the user's mouse leaves the browser viewport (e.g., trying to close the tab).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri7 = settings.display_triggers.auto_open_on_exit_intent) === null || _settings$display_tri7 === void 0 ? void 0 : _settings$display_tri7.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_on_exit_intent', 'enabled'], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Open on Time on Page", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal after the user spends a specified amount of time on the page.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri8 = settings.display_triggers.auto_open_on_time_on_page) === null || _settings$display_tri8 === void 0 ? void 0 : _settings$display_tri8.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_on_time_on_page', 'enabled'], isChecked);
    }
  }))), ((_settings$display_tri9 = settings.display_triggers.auto_open_on_time_on_page) === null || _settings$display_tri9 === void 0 ? void 0 : _settings$display_tri9.enabled) && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Time on Page (seconds)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Time in seconds before the modal opens.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    value: ((_settings$display_tri0 = settings.display_triggers.auto_open_on_time_on_page) === null || _settings$display_tri0 === void 0 ? void 0 : _settings$display_tri0.time_seconds) || 10,
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_on_time_on_page', 'time_seconds'], parseInt(newValue, 10));
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Audience Conditions", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Logged Out Users Only", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Only show to logged out users", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri1 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri1 === void 0 ? void 0 : _settings$display_tri1.for_logged_out_only) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "for_logged_out_only"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show for Specific User Roles (comma-separated slugs)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter user role slugs (e.g., administrator, editor, subscriber). Leave empty for all roles.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri10 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri10 === void 0 || (_settings$display_tri10 = _settings$display_tri10.for_specific_roles) === null || _settings$display_tri10 === void 0 ? void 0 : _settings$display_tri10.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'for_specific_roles'], newValue.split(',').map(function (s) {
        return s.trim();
      }));
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Page & Content Conditions", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Specific Pages/Posts", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on specific pages or posts", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri11 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri11 === void 0 || (_settings$display_tri11 = _settings$display_tri11.on_specific_pages) === null || _settings$display_tri11 === void 0 ? void 0 : _settings$display_tri11.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "on_specific_pages", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri12 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri12 === void 0 || (_settings$display_tri12 = _settings$display_tri12.on_specific_pages) === null || _settings$display_tri12 === void 0 ? void 0 : _settings$display_tri12.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Page/Post IDs", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comma-separated list of IDs", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri13 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri13 === void 0 || (_settings$display_tri13 = _settings$display_tri13.on_specific_pages) === null || _settings$display_tri13 === void 0 || (_settings$display_tri13 = _settings$display_tri13.page_ids) === null || _settings$display_tri13 === void 0 ? void 0 : _settings$display_tri13.join(", ")) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "on_specific_pages", "page_ids"], newValue.split(",").map(function (s) {
        return parseInt(s.trim(), 10);
      }).filter(function (id) {
        return !isNaN(id);
      }));
    },
    placeholder: "10, 25, 30"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Page/Post Slugs", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Comma-separated list of slugs", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri14 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri14 === void 0 || (_settings$display_tri14 = _settings$display_tri14.on_specific_pages) === null || _settings$display_tri14 === void 0 || (_settings$display_tri14 = _settings$display_tri14.page_slugs) === null || _settings$display_tri14 === void 0 ? void 0 : _settings$display_tri14.join(", ")) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "on_specific_pages", "page_slugs"], newValue.split(",").map(function (s) {
        return s.trim();
      }));
    },
    placeholder: "about-us, contact"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on Specific Categories", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Control modal display on posts within specific categories.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri15 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri15 === void 0 || (_settings$display_tri15 = _settings$display_tri15.on_specific_categories) === null || _settings$display_tri15 === void 0 ? void 0 : _settings$display_tri15.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'enabled'], isChecked);
    }
  }))), ((_settings$display_tri16 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri16 === void 0 || (_settings$display_tri16 = _settings$display_tri16.on_specific_categories) === null || _settings$display_tri16 === void 0 ? void 0 : _settings$display_tri16.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Category IDs (comma-separated)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter category IDs (e.g., 5, 12).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri17 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri17 === void 0 || (_settings$display_tri17 = _settings$display_tri17.on_specific_categories) === null || _settings$display_tri17 === void 0 || (_settings$display_tri17 = _settings$display_tri17.category_ids) === null || _settings$display_tri17 === void 0 ? void 0 : _settings$display_tri17.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'category_ids'], newValue.split(',').map(function (s) {
        return parseInt(s.trim(), 10);
      }).filter(function (id) {
        return !isNaN(id);
      }));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Category Slugs (comma-separated)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter category slugs (e.g., news, blog).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri18 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri18 === void 0 || (_settings$display_tri18 = _settings$display_tri18.on_specific_categories) === null || _settings$display_tri18 === void 0 || (_settings$display_tri18 = _settings$display_tri18.category_slugs) === null || _settings$display_tri18 === void 0 ? void 0 : _settings$display_tri18.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_categories', 'category_slugs'], newValue.split(',').map(function (s) {
        return s.trim();
      }));
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on Specific Tags", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Control modal display on posts with specific tags.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri19 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri19 === void 0 || (_settings$display_tri19 = _settings$display_tri19.on_specific_tags) === null || _settings$display_tri19 === void 0 ? void 0 : _settings$display_tri19.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'enabled'], isChecked);
    }
  }))), ((_settings$display_tri20 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri20 === void 0 || (_settings$display_tri20 = _settings$display_tri20.on_specific_tags) === null || _settings$display_tri20 === void 0 ? void 0 : _settings$display_tri20.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tag IDs (comma-separated)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter tag IDs (e.g., 7, 15).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri21 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri21 === void 0 || (_settings$display_tri21 = _settings$display_tri21.on_specific_tags) === null || _settings$display_tri21 === void 0 || (_settings$display_tri21 = _settings$display_tri21.tag_ids) === null || _settings$display_tri21 === void 0 ? void 0 : _settings$display_tri21.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'tag_ids'], newValue.split(',').map(function (s) {
        return parseInt(s.trim(), 10);
      }).filter(function (id) {
        return !isNaN(id);
      }));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tag Slugs (comma-separated)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enter tag slugs (e.g., featured, popular).", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri22 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri22 === void 0 || (_settings$display_tri22 = _settings$display_tri22.on_specific_tags) === null || _settings$display_tri22 === void 0 || (_settings$display_tri22 = _settings$display_tri22.tag_slugs) === null || _settings$display_tri22 === void 0 ? void 0 : _settings$display_tri22.join(', ')) || '',
    onChange: function onChange(newValue) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_specific_tags', 'tag_slugs'], newValue.split(',').map(function (s) {
        return s.trim();
      }));
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on WooCommerce My Account Page", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal on the WooCommerce My Account page.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri23 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri23 === void 0 ? void 0 : _settings$display_tri23.on_woocommerce_myaccount) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_woocommerce_myaccount'], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on WooCommerce Checkout Page", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically open the modal on the WooCommerce Checkout page.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri24 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri24 === void 0 ? void 0 : _settings$display_tri24.on_woocommerce_checkout) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange('display_triggers', ['auto_open_conditions', 'on_woocommerce_checkout'], isChecked);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Device Visibility", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Desktop", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on desktop devices", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri25 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri25 === void 0 || (_settings$display_tri25 = _settings$display_tri25.device_visibility) === null || _settings$display_tri25 === void 0 ? void 0 : _settings$display_tri25.desktop) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "device_visibility", "desktop"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tablet", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on tablet devices", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri26 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri26 === void 0 || (_settings$display_tri26 = _settings$display_tri26.device_visibility) === null || _settings$display_tri26 === void 0 ? void 0 : _settings$display_tri26.tablet) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "device_visibility", "tablet"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Mobile", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show on mobile devices", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri27 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri27 === void 0 || (_settings$display_tri27 = _settings$display_tri27.device_visibility) === null || _settings$display_tri27 === void 0 ? void 0 : _settings$display_tri27.mobile) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "device_visibility", "mobile"], isChecked);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Advanced Triggers", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("URL Parameter Trigger", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open when specific URL parameter is present", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri28 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri28 === void 0 || (_settings$display_tri28 = _settings$display_tri28.url_parameter_trigger) === null || _settings$display_tri28 === void 0 ? void 0 : _settings$display_tri28.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "url_parameter_trigger", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri29 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri29 === void 0 || (_settings$display_tri29 = _settings$display_tri29.url_parameter_trigger) === null || _settings$display_tri29 === void 0 ? void 0 : _settings$display_tri29.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Parameter Name", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("URL parameter name", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri30 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri30 === void 0 || (_settings$display_tri30 = _settings$display_tri30.url_parameter_trigger) === null || _settings$display_tri30 === void 0 ? void 0 : _settings$display_tri30.param_name) || "th_login",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "url_parameter_trigger", "param_name"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Parameter Value", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("URL parameter value", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri31 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri31 === void 0 || (_settings$display_tri31 = _settings$display_tri31.url_parameter_trigger) === null || _settings$display_tri31 === void 0 ? void 0 : _settings$display_tri31.param_value) || "open",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "url_parameter_trigger", "param_value"], newValue);
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Referrer Detection", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Open when arriving from specific referrers", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri32 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri32 === void 0 || (_settings$display_tri32 = _settings$display_tri32.referrer_detection) === null || _settings$display_tri32 === void 0 ? void 0 : _settings$display_tri32.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "referrer_detection", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri33 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri33 === void 0 || (_settings$display_tri33 = _settings$display_tri33.referrer_detection) === null || _settings$display_tri33 === void 0 ? void 0 : _settings$display_tri33.enabled) && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Referrer URLs", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("One URL per line", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    value: ((_settings$display_tri34 = settings.display_triggers.auto_open_conditions) === null || _settings$display_tri34 === void 0 || (_settings$display_tri34 = _settings$display_tri34.referrer_detection) === null || _settings$display_tri34 === void 0 || (_settings$display_tri34 = _settings$display_tri34.referrer_urls) === null || _settings$display_tri34 === void 0 ? void 0 : _settings$display_tri34.join("\n")) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["auto_open_conditions", "referrer_detection", "referrer_urls"], newValue.split("\n").map(function (s) {
        return s.trim();
      }).filter(function (s) {
        return s !== "";
      }));
    },
    rows: 5
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pop-up Frequency", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Frequency Control", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Control how often pop-up appears", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri35 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri35 === void 0 ? void 0 : _settings$display_tri35.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["pop_up_frequency", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri36 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri36 === void 0 ? void 0 : _settings$display_tri36.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Frequency Type", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("How to limit pop-up frequency", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement("select", {
    value: ((_settings$display_tri37 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri37 === void 0 ? void 0 : _settings$display_tri37.type) || "session",
    onChange: function onChange(e) {
      return handleSettingChange("display_triggers", ["pop_up_frequency", "type"], e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "session"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Once per session", "th-login")), /*#__PURE__*/React.createElement("option", {
    value: "days"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Once every X days", "th-login"))))), ((_settings$display_tri38 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri38 === void 0 ? void 0 : _settings$display_tri38.type) === "days" && /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Days to Hide", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Days before showing again", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    value: ((_settings$display_tri39 = settings.display_triggers.pop_up_frequency) === null || _settings$display_tri39 === void 0 ? void 0 : _settings$display_tri39.days) || 7,
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["pop_up_frequency", "days"], parseInt(newValue, 10));
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Menu Integration", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Menu Items", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add login/register links to menus", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri40 = settings.display_triggers.menu_integration) === null || _settings$display_tri40 === void 0 ? void 0 : _settings$display_tri40.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["menu_integration", "enabled"], isChecked);
    }
  }))), ((_settings$display_tri41 = settings.display_triggers.menu_integration) === null || _settings$display_tri41 === void 0 ? void 0 : _settings$display_tri41.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Menu Slug", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Menu to add items to (or "all")', "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri42 = settings.display_triggers.menu_integration) === null || _settings$display_tri42 === void 0 ? void 0 : _settings$display_tri42.menu_slug) || "primary",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "menu_slug"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login Item Text", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text for login menu item", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri43 = settings.display_triggers.menu_integration) === null || _settings$display_tri43 === void 0 ? void 0 : _settings$display_tri43.item_text_login) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login", "th-login"),
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "item_text_login"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login Item Icon", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dashicon for login menu item", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri44 = settings.display_triggers.menu_integration) === null || _settings$display_tri44 === void 0 ? void 0 : _settings$display_tri44.item_icon_login) || "dashicons-admin-users",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "item_icon_login"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide Login When Logged In", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide login item for logged in users", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri45 = settings.display_triggers.menu_integration) === null || _settings$display_tri45 === void 0 ? void 0 : _settings$display_tri45.visibility_login_logged_in) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["menu_integration", "visibility_login_logged_in"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Register Item Text", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Text for register menu item", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri46 = settings.display_triggers.menu_integration) === null || _settings$display_tri46 === void 0 ? void 0 : _settings$display_tri46.item_text_register) || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Register", "th-login"),
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "item_text_register"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Register Item Icon", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dashicon for register menu item", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$display_tri47 = settings.display_triggers.menu_integration) === null || _settings$display_tri47 === void 0 ? void 0 : _settings$display_tri47.item_icon_register) || "dashicons-plus-alt",
    onChange: function onChange(newValue) {
      return handleSettingChange("display_triggers", ["menu_integration", "item_icon_register"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide Register When Logged In", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hide register item for logged in users", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$display_tri48 = settings.display_triggers.menu_integration) === null || _settings$display_tri48 === void 0 ? void 0 : _settings$display_tri48.visibility_register_logged_in) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("display_triggers", ["menu_integration", "visibility_register_logged_in"], isChecked);
    }
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DisplayTriggersSettings);

/***/ }),

/***/ "./src/admin/components/form-feild-setiings.js":
/*!*****************************************************!*\
  !*** ./src/admin/components/form-feild-setiings.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @dnd-kit/core */ "./node_modules/@dnd-kit/core/dist/core.esm.js");
/* harmony import */ var _dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @dnd-kit/sortable */ "./node_modules/@dnd-kit/sortable/dist/sortable.esm.js");
/* harmony import */ var _dnd_kit_modifiers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @dnd-kit/modifiers */ "./node_modules/@dnd-kit/modifiers/dist/modifiers.esm.js");
/* harmony import */ var _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @dnd-kit/utilities */ "./node_modules/@dnd-kit/utilities/dist/utilities.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./icons */ "./src/admin/components/icons.js");
/* harmony import */ var _custom_select_control__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./custom-select-control */ "./src/admin/components/custom-select-control.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }










var TAB_KEYS = {
  login: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login", "th-login"),
  register: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Register", "th-login"),
  forgot_password: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Forgot Password", "th-login")
};
var DEFAULT_FIELD = function DEFAULT_FIELD() {
  return {
    id: "ff_" + Math.random().toString(36).substring(2, 9),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("New Field", "th-login"),
    placeholder: "",
    icon: "admin-users",
    required: false,
    name: "",
    type: "text",
    show: true,
    predefined: false
  };
};
var ToastNotice = function ToastNotice(_ref) {
  var message = _ref.message,
    onClose = _ref.onClose;
  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(function () {
    var timer = setTimeout(function () {
      onClose();
    }, 2000);
    return function () {
      return clearTimeout(timer);
    };
  }, [onClose]);
  return /*#__PURE__*/React.createElement("div", {
    className: "thl-toast-notice"
  }, message);
};
var SortableFieldItem = function SortableFieldItem(_ref2) {
  var field = _ref2.field,
    _onClick = _ref2.onClick,
    onDelete = _ref2.onDelete;
  var _useSortable = (0,_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__.useSortable)({
      id: field.id
    }),
    attributes = _useSortable.attributes,
    listeners = _useSortable.listeners,
    setNodeRef = _useSortable.setNodeRef,
    transform = _useSortable.transform,
    transition = _useSortable.transition;
  var style = {
    transform: _dnd_kit_utilities__WEBPACK_IMPORTED_MODULE_5__.CSS.Transform.toString(transform),
    transition: transition
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: setNodeRef,
    style: style,
    className: "field-item",
    onClick: function onClick() {
      return _onClick === null || _onClick === void 0 ? void 0 : _onClick(field);
    }
  }, /*#__PURE__*/React.createElement("span", _extends({
    className: "field-drag-handle"
  }, attributes, listeners), /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-move"
  })), /*#__PURE__*/React.createElement("div", {
    className: "selected-icon",
    dangerouslySetInnerHTML: {
      __html: _icons__WEBPACK_IMPORTED_MODULE_8__.THL_ICONS[field.icon] || ""
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "field-label",
    dangerouslySetInnerHTML: {
      __html: field.label || field.placeholder
    }
  }), field.predefined ? /*#__PURE__*/React.createElement("span", {
    className: "field-action-icon lock",
    title: "Predefined field (locked)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-lock"
  })) : /*#__PURE__*/React.createElement("span", {
    className: "field-action-icon delete",
    title: "Delete field",
    onClick: function onClick(e) {
      e.stopPropagation();
      onDelete(field.id);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-trash"
  })));
};
var FormFieldsSettings = function FormFieldsSettings(_ref3) {
  var _settings$form_fields, _selectedField$check, _selectedField$check2, _selectedField$check3;
  var settings = _ref3.settings,
    handleSettingChange = _ref3.handleSettingChange;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)("login"),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedField = _useState4[0],
    setSelectedField = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    iconPickerOpen = _useState6[0],
    setIconPickerOpen = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(""),
    _useState8 = _slicedToArray(_useState7, 2),
    toastMessage = _useState8[0],
    setToastMessage = _useState8[1];
  var sensors = (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useSensors)((0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useSensor)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.PointerSensor), (0,_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.useSensor)(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.KeyboardSensor, {
    coordinateGetter: _dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__.sortableKeyboardCoordinates
  }));
  var fields = (((_settings$form_fields = settings.form_fields) === null || _settings$form_fields === void 0 ? void 0 : _settings$form_fields[activeTab]) || []).filter(function (f) {
    return !f.hidden;
  });
  var updateFields = function updateFields(newFields) {
    handleSettingChange("form_fields", [activeTab], newFields);
  };
  var handleDragEnd = function handleDragEnd(event) {
    var active = event.active,
      over = event.over;
    if (active.id !== (over === null || over === void 0 ? void 0 : over.id)) {
      var oldIndex = fields.findIndex(function (f) {
        return f.id === active.id;
      });
      var newIndex = fields.findIndex(function (f) {
        return f.id === over.id;
      });
      var reordered = (0,_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__.arrayMove)(fields, oldIndex, newIndex);
      updateFields(reordered);
    }
  };
  var handleAddField = function handleAddField() {
    var newField = DEFAULT_FIELD();
    updateFields([].concat(_toConsumableArray(fields), [newField]));
    setToastMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Field added successfully!", "th-login"));
  };
  var handleDeleteField = function handleDeleteField(fieldId) {
    var filtered = fields.filter(function (f) {
      return f.id !== fieldId;
    });
    updateFields(filtered);
    if ((selectedField === null || selectedField === void 0 ? void 0 : selectedField.id) === fieldId) setSelectedField(null);
    setToastMessage((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Field deleted", "th-login"));
  };
  var handleFieldChange = function handleFieldChange(key, value) {
    if (!selectedField) return;
    var updated = fields.map(function (f) {
      return f.id === selectedField.id ? _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, key, value)) : f;
    });
    updateFields(updated);
    setSelectedField(function (prev) {
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, key, value));
    });
  };
  var handleCheckToggle = function handleCheckToggle(key) {
    var current = selectedField.check || {
      text: false,
      number: false,
      special_character: false
    };
    var updated = _objectSpread(_objectSpread({}, current), {}, _defineProperty({}, key, !current[key]));
    handleFieldChange("check", updated);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(function () {
    var firstVisible = fields[0] || null;
    setSelectedField(firstVisible);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "thl-form-fields-settings"
  }, /*#__PURE__*/React.createElement("div", {
    className: "thl-left-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tabs"
  }, Object.keys(TAB_KEYS).map(function (key) {
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      className: classnames__WEBPACK_IMPORTED_MODULE_7___default()("tab-button", {
        active: key === activeTab
      }),
      onClick: function onClick() {
        var _settings$form_fields2;
        setActiveTab(key);
        setSelectedField((((_settings$form_fields2 = settings.form_fields) === null || _settings$form_fields2 === void 0 ? void 0 : _settings$form_fields2[key]) || []).find(function (f) {
          return !f.hidden;
        }) || null);
      }
    }, TAB_KEYS[key]);
  })), /*#__PURE__*/React.createElement("div", {
    className: "fields-list scrollable"
  }, /*#__PURE__*/React.createElement(_dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.DndContext, {
    sensors: sensors,
    collisionDetection: _dnd_kit_core__WEBPACK_IMPORTED_MODULE_2__.closestCenter,
    modifiers: [_dnd_kit_modifiers__WEBPACK_IMPORTED_MODULE_4__.restrictToVerticalAxis],
    onDragEnd: handleDragEnd
  }, /*#__PURE__*/React.createElement(_dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__.SortableContext, {
    items: fields.map(function (f) {
      return f.id;
    }),
    strategy: _dnd_kit_sortable__WEBPACK_IMPORTED_MODULE_3__.verticalListSortingStrategy
  }, /*#__PURE__*/React.createElement("div", {
    className: "fields-group"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "fields-group-title"
  }, TAB_KEYS[activeTab], " ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Fields", "th-login")), fields.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "no-fields"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("No fields yet.", "th-login")) : fields.map(function (field) {
    return /*#__PURE__*/React.createElement("div", {
      key: field.id,
      className: classnames__WEBPACK_IMPORTED_MODULE_7___default()("sortable-field-wrapper", {
        selected: (selectedField === null || selectedField === void 0 ? void 0 : selectedField.id) === field.id // ✅ Highlight selected field
      })
    }, /*#__PURE__*/React.createElement(SortableFieldItem, {
      key: field.id,
      field: field,
      onClick: setSelectedField,
      onDelete: handleDeleteField
    }));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "add-field-button-wrapper"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isSecondary: true,
    onClick: handleAddField
  }, "+ ", (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add Field", "th-login")))), /*#__PURE__*/React.createElement("div", {
    className: "thl-right-panel"
  }, selectedField ? /*#__PURE__*/React.createElement("div", {
    className: "field-editor"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "field-editor-title"
  }, selectedField.label || selectedField.id), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Label", "th-login"),
    value: selectedField.label,
    onChange: function onChange(val) {
      return handleFieldChange("label", val);
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Placeholder", "th-login"),
    value: selectedField.placeholder || "",
    onChange: function onChange(val) {
      return handleFieldChange("placeholder", val);
    }
  }), selectedField.type === "checkbox" && selectedField.id === "terms_and_conditions" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Terms & Conditions Link", "th-login"),
    placeholder: "https://example.com/terms",
    value: selectedField.link || "",
    onChange: function onChange(val) {
      return handleFieldChange("link", val);
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Error Message", "th-login"),
    value: selectedField.error_message || "",
    onChange: function onChange(val) {
      return handleFieldChange("error_message", val);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "thl-icon-picker"
  }, /*#__PURE__*/React.createElement("label", {
    className: "components-base-control__label"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Choose Icon", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "icon-picker-trigger",
    onClick: function onClick() {
      return setIconPickerOpen(function (open) {
        return !open;
      });
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "selected-icon",
    dangerouslySetInnerHTML: {
      __html: _icons__WEBPACK_IMPORTED_MODULE_8__.THL_ICONS[selectedField.icon] || ""
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "icon-name"
  }, selectedField.icon), /*#__PURE__*/React.createElement("span", {
    className: "icon-caret"
  }, "\u25BE")), iconPickerOpen && /*#__PURE__*/React.createElement("div", {
    className: "icon-picker-dropdown"
  }, Object.keys(_icons__WEBPACK_IMPORTED_MODULE_8__.THL_ICONS).map(function (key) {
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "icon-option ".concat(selectedField.icon === key ? "active" : ""),
      onClick: function onClick() {
        handleFieldChange("icon", key);
        setIconPickerOpen(false);
      },
      title: key,
      dangerouslySetInnerHTML: {
        __html: _icons__WEBPACK_IMPORTED_MODULE_8__.THL_ICONS[key]
      }
    });
  }))), !selectedField.predefined && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Name", "th-login"),
    value: selectedField.name || "",
    onChange: function onChange(val) {
      return handleFieldChange("name", val);
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("ID", "th-login"),
    value: selectedField.id || "",
    onChange: function onChange(val) {
      return handleFieldChange("id", val);
    }
  }), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_9__.CustomSelectControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Field Type", "th-login"),
    value: selectedField.type || "text",
    options: [{
      label: "Text",
      value: "text"
    }, {
      label: "Email",
      value: "email"
    }, {
      label: "Checkbox",
      value: "checkbox"
    }],
    onChange: function onChange(val) {
      return handleFieldChange("type", val);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "th-login-toggle-one-line"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Required", "th-login"),
    checked: selectedField.required,
    onChange: function onChange(val) {
      return handleFieldChange("required", val);
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Show Field", "th-login"),
    checked: selectedField.show !== false,
    onChange: function onChange(val) {
      return handleFieldChange("show", val);
    }
  }))), activeTab === "register" && selectedField.type === "password" && selectedField.predefined && selectedField.id !== "confirm_password" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Minimum Length", "th-login"),
    type: "number",
    value: selectedField.minInput || "",
    onChange: function onChange(val) {
      return handleFieldChange("minInput", parseInt(val));
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Maximum Length", "th-login"),
    type: "number",
    value: selectedField.maxInput || "",
    onChange: function onChange(val) {
      return handleFieldChange("maxInput", parseInt(val));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "check-group"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Require Letters (A-Z)", "th-login"),
    checked: ((_selectedField$check = selectedField.check) === null || _selectedField$check === void 0 ? void 0 : _selectedField$check.text) || false,
    onChange: function onChange() {
      return handleCheckToggle("text");
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Require Numbers (0-9)", "th-login"),
    checked: ((_selectedField$check2 = selectedField.check) === null || _selectedField$check2 === void 0 ? void 0 : _selectedField$check2.number) || false,
    onChange: function onChange() {
      return handleCheckToggle("number");
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Require Special Characters", "th-login"),
    checked: ((_selectedField$check3 = selectedField.check) === null || _selectedField$check3 === void 0 ? void 0 : _selectedField$check3.special_character) || false,
    onChange: function onChange() {
      return handleCheckToggle("special_character");
    }
  })))) : /*#__PURE__*/React.createElement("div", {
    className: "placeholder"
  }, /*#__PURE__*/React.createElement("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Click a field to edit its settings", "th-login")))), toastMessage && /*#__PURE__*/React.createElement(ToastNotice, {
    message: toastMessage,
    onClose: function onClose() {
      return setToastMessage("");
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormFieldsSettings);

/***/ }),

/***/ "./src/admin/components/general-settings.js":
/*!**************************************************!*\
  !*** ./src/admin/components/general-settings.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _custom_select_control__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-select-control */ "./src/admin/components/custom-select-control.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var GeneralSettings = function GeneralSettings(_ref) {
  var _settings$general$man, _settings$general$red, _settings$general$red2, _settings$general$red3, _settings$general$red4, _settings$general$red5, _settings$general$red6;
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange;
  var displayMode = settings.general.display_mode || "popup";
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)([{
      label: "Subscriber",
      value: "subscriber"
    } // fallback
    ]),
    _useState2 = _slicedToArray(_useState, 2),
    availableRoles = _useState2[0],
    setAvailableRoles = _useState2[1];
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
      path: "/th-login/v1/roles"
    }).then(function (roles) {
      setAvailableRoles(roles);
    });
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-admin-settings"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("General Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("General", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Plugin Status", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, settings.general.plugin_status === "enabled" ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Th Login Plugin is active", "th-login") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Th Login Plugin is inactive", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.general.plugin_status === "enabled",
    onChange: function onChange(isChecked) {
      return handleSettingChange("general", ["plugin_status"], isChecked ? "enabled" : "disabled");
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group th-login-modalchoose-form"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login Form Type", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "form-type-options"
  }, [{
    type: "single",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Single Form", "th-login"),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Only login form will be shown", "th-login")
  }, {
    type: "double",
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Double Form", "th-login"),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Users can toggle between Login and Register forms", "th-login")
  }].map(function (_ref2) {
    var type = _ref2.type,
      label = _ref2.label,
      description = _ref2.description;
    return /*#__PURE__*/React.createElement("div", {
      key: type,
      className: "form-type-card ".concat(settings.general.form_type === type ? "active" : ""),
      onClick: function onClick() {
        return handleSettingChange("general", ["form_type"], type);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-type-mockup"
    }, type === "single" ? /*#__PURE__*/React.createElement("div", {
      className: "mockup-box"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mockup-header"
    }, "Login"), /*#__PURE__*/React.createElement("div", {
      className: "mockup-line short"
    }), /*#__PURE__*/React.createElement("div", {
      className: "mockup-line"
    }), /*#__PURE__*/React.createElement("div", {
      className: "mockup-button"
    })) : /*#__PURE__*/React.createElement("div", {
      className: "mockup-box"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mockup-tab-row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "tab active"
    }, "Login"), /*#__PURE__*/React.createElement("div", {
      className: "tab"
    }, "Register")), /*#__PURE__*/React.createElement("div", {
      className: "mockup-line short"
    }), /*#__PURE__*/React.createElement("div", {
      className: "mockup-line"
    }), /*#__PURE__*/React.createElement("div", {
      className: "mockup-button"
    }))), /*#__PURE__*/React.createElement("h5", {
      className: "form-type-label"
    }, label), /*#__PURE__*/React.createElement("p", {
      className: "form-type-description"
    }, description));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group th-login-modalchoose-form"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login Display Mode", "th-login")), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    value: displayMode,
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Popup", "th-login"),
      value: "popup"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Slide-in-left", "th-login"),
      value: "slide_in_left"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Slide-in-right", "th-login"),
      value: "slide_in_right"
    }],
    onChange: function onChange(value) {
      return handleSettingChange("general", ["display_mode"], value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "settings-group th-login-modalchoose-form"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Register user with role", "th-login"))), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    value: settings.general.default_register_role || "subscriber",
    options: availableRoles,
    onChange: function onChange(value) {
      return handleSettingChange("general", ["default_register_role"], value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Manual User Approval", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Require admin approval for new registrations", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$general$man = settings.general.manual_user_approval) === null || _settings$general$man === void 0 ? void 0 : _settings$general$man.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("general", ["manual_user_approval", "enabled"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Close Button", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("If true without user login the panel can close.", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.general.close_button || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("general", ["close_button"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Redirect", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "redirection-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "redirection-card"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Login", "th-login")), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    value: ((_settings$general$red = settings.general.redirects) === null || _settings$general$red === void 0 || (_settings$general$red = _settings$general$red.after_login) === null || _settings$general$red === void 0 ? void 0 : _settings$general$red.type) || "current_page",
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Current Page", "th-login"),
      value: "current_page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dashboard", "th-login"),
      value: "dashboard"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Home Page", "th-login"),
      value: "home_page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom URL", "th-login"),
      value: "custom_url"
    }],
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_login", "type"], newValue);
    }
  }), ((_settings$general$red2 = settings.general.redirects) === null || _settings$general$red2 === void 0 || (_settings$general$red2 = _settings$general$red2.after_login) === null || _settings$general$red2 === void 0 ? void 0 : _settings$general$red2.type) === "custom_url" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: settings.general.redirects.after_login.url || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_login", "url"], newValue);
    },
    placeholder: "https://example.com/welcome"
  })), /*#__PURE__*/React.createElement("div", {
    className: "redirection-card"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Logout", "th-login")), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    value: ((_settings$general$red3 = settings.general.redirects) === null || _settings$general$red3 === void 0 || (_settings$general$red3 = _settings$general$red3.after_logout) === null || _settings$general$red3 === void 0 ? void 0 : _settings$general$red3.type) || "home_page",
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Home Page", "th-login"),
      value: "home_page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom URL", "th-login"),
      value: "custom_url"
    }],
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_logout", "type"], newValue);
    }
  }), ((_settings$general$red4 = settings.general.redirects) === null || _settings$general$red4 === void 0 || (_settings$general$red4 = _settings$general$red4.after_logout) === null || _settings$general$red4 === void 0 ? void 0 : _settings$general$red4.type) === "custom_url" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: settings.general.redirects.after_logout.url || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_logout", "url"], newValue);
    },
    placeholder: "https://example.com/goodbye"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row settings-manage-toggle-resitartion"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto-Login After Registration", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically log users in after registration", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.general.auto_login_after_registration || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("general", ["auto_login_after_registration"], isChecked);
    }
  }), settings.general.auto_login_after_registration && /*#__PURE__*/React.createElement("div", {
    className: "redirection-card th-inline-registration-redirect",
    style: {
      marginTop: "12px"
    }
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Registration", "th-login")), /*#__PURE__*/React.createElement(_custom_select_control__WEBPACK_IMPORTED_MODULE_2__.CustomSelectControl, {
    value: ((_settings$general$red5 = settings.general.redirects) === null || _settings$general$red5 === void 0 || (_settings$general$red5 = _settings$general$red5.after_register) === null || _settings$general$red5 === void 0 ? void 0 : _settings$general$red5.type) || "dashboard",
    options: [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dashboard", "th-login"),
      value: "dashboard"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Current Page", "th-login"),
      value: "current_page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Home Page", "th-login"),
      value: "home_page"
    }, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Custom URL", "th-login"),
      value: "custom_url"
    }],
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_register", "type"], newValue);
    }
  }), ((_settings$general$red6 = settings.general.redirects) === null || _settings$general$red6 === void 0 || (_settings$general$red6 = _settings$general$red6.after_register) === null || _settings$general$red6 === void 0 ? void 0 : _settings$general$red6.type) === "custom_url" && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: settings.general.redirects.after_register.url || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("general", ["redirects", "after_register", "url"], newValue);
    },
    placeholder: "https://example.com/registration-success"
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GeneralSettings);

/***/ }),

/***/ "./src/admin/components/icons.js":
/*!***************************************!*\
  !*** ./src/admin/components/icons.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   THL_ICONS: () => (/* binding */ THL_ICONS)
/* harmony export */ });
var THL_ICONS = {
  user: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 12c2.7 0 4.5-2.1 4.5-4.5S14.7 3 12 3 7.5 5.1 7.5 7.5 9.3 12 12 12zm0 1.5c-3 0-9 1.5-9 4.5V21h18v-3c0-3-6-4.5-9-4.5z\"/></svg>",
  email: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M4 4h16v16H4z\" fill=\"none\"/><path d=\"M4 4l8 8 8-8\" /></svg>",
  lock: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M12 17a2 2 0 100-4 2 2 0 000 4z\" /><path d=\"M5 10V8a7 7 0 0114 0v2m-4 0h4a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h4\" /></svg>",
  eye: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>",
  hide: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M3 3l18 18\"/><path d=\"M10.58 10.58a2 2 0 002.83 2.83\"/><path d=\"M9.88 9.88a3 3 0 014.24 4.24\"/><path d=\"M1 12s4-7 11-7a10.45 10.45 0 016.73 2.25M23 12s-4 7-11 7a10.45 10.45 0 01-6.73-2.25\"/></svg>",
  phone: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M3 5a2 2 0 012-2h2a1 1 0 011 1v3l-1 1a12 12 0 005 5l1-1h3a1 1 0 011 1v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5z\"/></svg>",
  calendar: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"/><path d=\"M16 2v4M8 2v4m-5 4h18\"/></svg>",
  check: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M5 13l4 4L19 7\"/></svg>",
  alert: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 8v4m0 4h.01\"/></svg>",
  plus: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M12 4v16m8-8H4\"/></svg>",
  minus: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M20 12H4\"/></svg>",
  close: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M6 18L18 6M6 6l12 12\"/></svg>",
  upload: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2\"/><path d=\"M7 9l5-5 5 5M12 4v12\"/></svg>",
  download: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2\"/><path d=\"M7 11l5 5 5-5M12 4v12\"/></svg>",
  search: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"M21 21l-4.35-4.35\"/></svg>",
  settings: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z\"/></svg>",
  info: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4m0-4h.01\"/></svg>",
  warning: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M10.29 3.86l-8.2 14.14A1 1 0 003 20h18a1 1 0 00.91-1.45l-8.2-14.14a1 1 0 00-1.72 0z\"/><path d=\"M12 9v4m0 4h.01\"/></svg>",
  arrowRight: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M14 5l7 7m0 0l-7 7m7-7H3\"/></svg>",
  arrowLeft: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M10 19l-7-7m0 0l7-7m-7 7h18\"/></svg>",
  chevronDown: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M19 9l-7 7-7-7\"/></svg>",
  chevronUp: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M5 15l7-7 7 7\"/></svg>",
  filter: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z\"/></svg>",
  sort: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M8 9l4-4 4 4m0 6l-4 4-4-4\"/></svg>",
  refresh: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M4 4v5h5m11 6v-5h-5m-6 5l7-7m-7 0l7 7\"/></svg>",
  home: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\"/></svg>",
  link: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1\"/></svg>",
  external: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14\"/></svg>",
  copy: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z\"/></svg>",
  edit: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z\"/></svg>",
  trash: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\"/></svg>",
  heart: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z\"/></svg>",
  star: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z\"/></svg>",
  bookmark: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z\"/></svg>",
  share: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z\"/></svg>",
  menu: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M4 6h16M4 12h16M4 18h16\"/></svg>",
  dotsVertical: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z\"/></svg>",
  attachment: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13\"/></svg>",
  clock: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 8v4l3 3\"/></svg>",
  creditCard: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><rect width=\"18\" height=\"14\" x=\"3\" y=\"5\" rx=\"2\"/><path d=\"M3 10h18M7 15h2m4 0h2\"/></svg>",
  bell: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9\"/></svg>",
  chart: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M9 19v-6m6 6V9m-3 10V5m9 14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14z\"/></svg>",
  database: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4\"/></svg>",
  cloud: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M8 15h8m-8-4h8m-8-4h8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\"/></svg>",
  gift: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M12 8v13m0-13V3m0 5H8.5a2.5 2.5 0 010-5H12m0 5h3.5a2.5 2.5 0 000-5H12m-6 8h14a1 1 0 011 1v3a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 011-1z\"/></svg>",
  tag: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M7 7h.01M7 3h5a2 2 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z\"/></svg>",
  printer: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z\"/></svg>",
  camera: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z\"/><path d=\"M15 13a3 3 0 11-6 0 3 3 0 016 0z\"/></svg>",
  video: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z\"/></svg>",
  mic: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z\"/></svg>",
  headphones: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z\"/></svg>",
  battery: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z\"/></svg>",
  wifi: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0\"/></svg>",
  bluetooth: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M6 18L18 6M6 6l6 6-6 6 6 6\"/></svg>",
  compass: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z\"/><path d=\"M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z\"/></svg>",
  map: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7\"/></svg>",
  globe: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z\"/></svg>",
  umbrella: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z\"/></svg>",
  shield: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path d=\"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z\"/></svg>"
};

/***/ }),

/***/ "./src/admin/components/integration-settings.js":
/*!******************************************************!*\
  !*** ./src/admin/components/integration-settings.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var IntegrationSettings = function IntegrationSettings(_ref) {
  var _settings$integration, _settings$integration2;
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-admin-plugins"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Integration Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("WooCommerce Integration", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable WooCommerce Integration", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Integrate with WooCommerce features", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$integration = settings.integration) === null || _settings$integration === void 0 || (_settings$integration = _settings$integration.woocommerce) === null || _settings$integration === void 0 ? void 0 : _settings$integration.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("integration", ["woocommerce", "enabled"], isChecked);
    }
  }))), ((_settings$integration2 = settings.integration) === null || _settings$integration2 === void 0 || (_settings$integration2 = _settings$integration2.woocommerce) === null || _settings$integration2 === void 0 ? void 0 : _settings$integration2.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Replace WooCommerce Login", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Use this login form for WooCommerce", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.integration.woocommerce.replace_login || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("integration", ["woocommerce", "replace_login"], isChecked);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Replace WooCommerce Registration", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Use this registration form for WooCommerce", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.integration.woocommerce.replace_registration || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("integration", ["woocommerce", "replace_registration"], isChecked);
    }
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IntegrationSettings);

/***/ }),

/***/ "./src/admin/components/security-settings.js":
/*!***************************************************!*\
  !*** ./src/admin/components/security-settings.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var SecuritySettings = function SecuritySettings(_ref) {
  var _settings$security$br, _settings$security$br2, _settings$security$br3, _settings$security$br4, _settings$security$br5, _settings$security$re, _settings$security$re2, _settings$security$re3, _settings$security$re4, _settings$security$re5;
  var settings = _ref.settings,
    handleSettingChange = _ref.handleSettingChange;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-shield"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Security Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Brute Force Protection", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Protection", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Prevent brute force login attacks", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$security$br = settings.security.brute_force_protection) === null || _settings$security$br === void 0 ? void 0 : _settings$security$br.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("security", ["brute_force_protection", "enabled"], isChecked);
    }
  }))), ((_settings$security$br2 = settings.security.brute_force_protection) === null || _settings$security$br2 === void 0 ? void 0 : _settings$security$br2.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Max Login Attempts", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Allowed failed attempts before lockout", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    value: ((_settings$security$br3 = settings.security.brute_force_protection) === null || _settings$security$br3 === void 0 ? void 0 : _settings$security$br3.max_attempts) || 5,
    onChange: function onChange(newValue) {
      return handleSettingChange("security", ["brute_force_protection", "max_attempts"], parseInt(newValue, 10));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Lockout Duration (minutes)", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Time before another attempt is allowed", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    type: "number",
    min: "1",
    value: ((_settings$security$br4 = settings.security.brute_force_protection) === null || _settings$security$br4 === void 0 ? void 0 : _settings$security$br4.lockout_duration_minutes) || 30,
    onChange: function onChange(newValue) {
      return handleSettingChange("security", ["brute_force_protection", "lockout_duration_minutes"], parseInt(newValue, 10));
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Auto IP Blacklisting", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Automatically blacklist repeat offenders", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$security$br5 = settings.security.brute_force_protection) === null || _settings$security$br5 === void 0 ? void 0 : _settings$security$br5.auto_ip_blacklist_enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("security", ["brute_force_protection", "auto_ip_blacklist_enabled"], isChecked);
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("reCAPTCHA Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable reCAPTCHA", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add Google reCAPTCHA to forms", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: ((_settings$security$re = settings.security.recaptcha) === null || _settings$security$re === void 0 ? void 0 : _settings$security$re.enabled) || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("security", ["recaptcha", "enabled"], isChecked);
    }
  }))), ((_settings$security$re2 = settings.security.recaptcha) === null || _settings$security$re2 === void 0 ? void 0 : _settings$security$re2.enabled) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("reCAPTCHA Type", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Version of reCAPTCHA to use", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement("select", {
    value: ((_settings$security$re3 = settings.security.recaptcha) === null || _settings$security$re3 === void 0 ? void 0 : _settings$security$re3.type) || "v2_checkbox",
    onChange: function onChange(e) {
      return handleSettingChange("security", ["recaptcha", "type"], e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "v2_checkbox"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("reCAPTCHA v2 Checkbox", "th-login")), /*#__PURE__*/React.createElement("option", {
    value: "v3_invisible"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("reCAPTCHA v3 Invisible", "th-login"))))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Site Key", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Your reCAPTCHA site key", "th-login"), ' ', /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ExternalLink, {
    href: "https://www.google.com/recaptcha/admin"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Google reCAPTCHA Admin", "th-login")))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$security$re4 = settings.security.recaptcha) === null || _settings$security$re4 === void 0 ? void 0 : _settings$security$re4.site_key) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("security", ["recaptcha", "site_key"], newValue);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Secret Key", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Your reCAPTCHA secret key", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    value: ((_settings$security$re5 = settings.security.recaptcha) === null || _settings$security$re5 === void 0 ? void 0 : _settings$security$re5.secret_key) || "",
    onChange: function onChange(newValue) {
      return handleSettingChange("security", ["recaptcha", "secret_key"], newValue);
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Honeypot Protection", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Enable Honeypot", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Add hidden field to catch bots", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: settings.security.honeypot_enabled || false,
    onChange: function onChange(isChecked) {
      return handleSettingChange("security", ["honeypot_enabled"], isChecked);
    }
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SecuritySettings);

/***/ }),

/***/ "./src/admin/components/tools-settings.js":
/*!************************************************!*\
  !*** ./src/admin/components/tools-settings.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


var ToolsSettings = function ToolsSettings(_ref) {
  var settings = _ref.settings,
    exportedSettings = _ref.exportedSettings,
    setExportedSettings = _ref.setExportedSettings,
    importSettingsText = _ref.importSettingsText,
    setImportSettingsText = _ref.setImportSettingsText,
    handleExportSettings = _ref.handleExportSettings,
    handleImportSettings = _ref.handleImportSettings,
    isSaving = _ref.isSaving,
    setIsResetConfirmOpen = _ref.setIsResetConfirmOpen;
  return /*#__PURE__*/React.createElement("section", {
    className: "settings-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-card"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("i", {
    className: "dashicons dashicons-admin-tools"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Tools", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Export Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Export Current Settings", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Backup your current configuration", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isSecondary: true,
    onClick: handleExportSettings
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
    icon: "download"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Export Settings", "th-login")))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Exported Settings", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Copy this JSON to save your settings", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    value: exportedSettings,
    readOnly: true,
    rows: 10,
    className: "export-textarea"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Import Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Import Settings", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Paste previously exported settings JSON", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    value: importSettingsText,
    onChange: function onChange(newValue) {
      return setImportSettingsText(newValue);
    },
    rows: 10,
    className: "import-textarea"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isPrimary: true,
    onClick: handleImportSettings,
    disabled: isSaving || !importSettingsText.trim()
  }, isSaving ? /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
    icon: "upload"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Import Settings", "th-login")))))), /*#__PURE__*/React.createElement("div", {
    className: "settings-group"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "group-title"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Reset Settings", "th-login")), /*#__PURE__*/React.createElement("div", {
    className: "setting-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "setting-label"
  }, /*#__PURE__*/React.createElement("h4", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Reset All Settings", "th-login")), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Restore all settings to default values", "th-login"))), /*#__PURE__*/React.createElement("div", {
    className: "setting-control"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    isDestructive: true,
    onClick: function onClick() {
      return setIsResetConfirmOpen(true);
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Dashicon, {
    icon: "undo"
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Reset Settings", "th-login")))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolsSettings);

/***/ }),

/***/ "./src/admin/index.scss":
/*!******************************!*\
  !*** ./src/admin/index.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/api-fetch":
/*!******************************!*\
  !*** external "wp.apiFetch" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = wp.apiFetch;

/***/ }),

/***/ "@wordpress/components":
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = wp.components;

/***/ }),

/***/ "@wordpress/element":
/*!*****************************!*\
  !*** external "wp.element" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = wp.element;

/***/ }),

/***/ "@wordpress/i18n":
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = wp.i18n;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = ReactDOM;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/admin/App.js");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.scss */ "./src/admin/index.scss");




// Render the main App component into the root element.
document.addEventListener('DOMContentLoaded', function () {
  var rootElement = document.getElementById('th-login-admin-root');
  if (rootElement) {
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_App__WEBPACK_IMPORTED_MODULE_1__["default"]), rootElement);
  } else {
    console.error('TH Login Admin: Root element #th-login-admin-root not found.');
  }
});
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map