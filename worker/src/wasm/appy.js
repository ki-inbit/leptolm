import __wasm_module_0 from "./appy.core.wasm";
import __wasm_module_1 from "./appy.core2.wasm";
import __wasm_module_2 from "./appy.core3.wasm";
import __wasm_module_3 from "./appy.core4.wasm";
import __wasm_module_4 from "./appy.core5.wasm";
import __wasm_module_5 from "./appy.core6.wasm";
import __wasm_module_6 from "./appy.core7.wasm";
import __wasm_module_7 from "./appy.core8.wasm";
import __wasm_module_8 from "./appy.core9.wasm";
import __wasm_module_9 from "./appy.core10.wasm";
import __wasm_module_10 from "./appy.core11.wasm";
import __wasm_module_11 from "./appy.core12.wasm";
import __wasm_module_12 from "./appy.core13.wasm";
import __wasm_module_13 from "./appy.core14.wasm";
import __wasm_module_14 from "./appy.core15.wasm";
import __wasm_module_15 from "./appy.core16.wasm";
import __wasm_module_16 from "./appy.core17.wasm";
"use components";
import { getCache } from './d1-replay.js';
import { environment, exit as exit$1, stderr, stdin, stdout, terminalInput, terminalOutput, terminalStderr, terminalStdin, terminalStdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { error, streams } from '@bytecodealliance/preview2-shim/io';
import { random } from '@bytecodealliance/preview2-shim/random';
const __wasm_modules = {
  "appy.core.wasm": __wasm_module_0,
  "appy.core2.wasm": __wasm_module_1,
  "appy.core3.wasm": __wasm_module_2,
  "appy.core4.wasm": __wasm_module_3,
  "appy.core5.wasm": __wasm_module_4,
  "appy.core6.wasm": __wasm_module_5,
  "appy.core7.wasm": __wasm_module_6,
  "appy.core8.wasm": __wasm_module_7,
  "appy.core9.wasm": __wasm_module_8,
  "appy.core10.wasm": __wasm_module_9,
  "appy.core11.wasm": __wasm_module_10,
  "appy.core12.wasm": __wasm_module_11,
  "appy.core13.wasm": __wasm_module_12,
  "appy.core14.wasm": __wasm_module_13,
  "appy.core15.wasm": __wasm_module_14,
  "appy.core16.wasm": __wasm_module_15,
  "appy.core17.wasm": __wasm_module_16,
};

const fetch = async (url) => ({
    url: url.toString(),
    arrayBuffer: async () => ({ isMockBuffer: true, url: url.toString() })
});
const WebAssembly = Object.create(globalThis.WebAssembly);
WebAssembly.compileStreaming = async (resp) => {
    const url = (await resp).url;
    const filename = url.split('/').pop();
    return __wasm_modules[filename];
};
WebAssembly.compile = async (buf) => {
    if (buf && buf.isMockBuffer) {
        const filename = buf.url.split('/').pop();
        return __wasm_modules[filename];
    }
    return globalThis.WebAssembly.compile(buf);
};
WebAssembly.instantiateStreaming = async (resp, imports) => {
    const url = (await resp).url;
    const filename = url.split('/').pop();
    const mod = __wasm_modules[filename];
    const instance = await globalThis.WebAssembly.instantiate(mod, imports);
    return { module: mod, instance };
};
WebAssembly.instantiate = async (modOrBuf, imports) => {
    if (modOrBuf && modOrBuf.isMockBuffer) {
        const filename = modOrBuf.url.split('/').pop();
        const mod = __wasm_modules[filename];
        const instance = await globalThis.WebAssembly.instantiate(mod, imports);
        return { module: mod, instance };
    }
    return globalThis.WebAssembly.instantiate(modOrBuf, imports);
};

const { getEnvironment } = environment;

if (getEnvironment=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getEnvironment', was 'getEnvironment' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { exit } = exit$1;

if (exit=== undefined) {
  const err = new Error("unexpectedly undefined local import 'exit', was 'exit' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getStderr } = stderr;

if (getStderr=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getStderr', was 'getStderr' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getStdin } = stdin;

if (getStdin=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getStdin', was 'getStdin' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getStdout } = stdout;

if (getStdout=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getStdout', was 'getStdout' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { TerminalInput } = terminalInput;

if (TerminalInput=== undefined) {
  const err = new Error("unexpectedly undefined local import 'TerminalInput', was 'TerminalInput' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { TerminalOutput } = terminalOutput;

if (TerminalOutput=== undefined) {
  const err = new Error("unexpectedly undefined local import 'TerminalOutput', was 'TerminalOutput' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getTerminalStderr } = terminalStderr;

if (getTerminalStderr=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getTerminalStderr', was 'getTerminalStderr' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getTerminalStdin } = terminalStdin;

if (getTerminalStdin=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getTerminalStdin', was 'getTerminalStdin' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getTerminalStdout } = terminalStdout;

if (getTerminalStdout=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getTerminalStdout', was 'getTerminalStdout' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getDirectories } = preopens;

if (getDirectories=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getDirectories', was 'getDirectories' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { Descriptor,
  filesystemErrorCode } = types;

if (Descriptor=== undefined) {
  const err = new Error("unexpectedly undefined local import 'Descriptor', was 'Descriptor' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}


if (filesystemErrorCode=== undefined) {
  const err = new Error("unexpectedly undefined local import 'filesystemErrorCode', was 'filesystemErrorCode' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { Error: Error$1 } = error;

if (Error$1=== undefined) {
  const err = new Error("unexpectedly undefined local import 'Error$1', was 'Error' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { InputStream,
  OutputStream } = streams;

if (InputStream=== undefined) {
  const err = new Error("unexpectedly undefined local import 'InputStream', was 'InputStream' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}


if (OutputStream=== undefined) {
  const err = new Error("unexpectedly undefined local import 'OutputStream', was 'OutputStream' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}

const { getRandomBytes } = random;

if (getRandomBytes=== undefined) {
  const err = new Error("unexpectedly undefined local import 'getRandomBytes', was 'getRandomBytes' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}


let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

function toUint64(val) {
  const converted = BigInt(val)
  
  return BigInt.asUintN(64, converted);
}


function toUint32(val) {
  
  return val >>> 0;
}


function _isValidNumericPrimitive(ty, v) {
  if (v === undefined || v === null) { return false; }
  switch (ty) {
    case 'bool':
    return v === 0 || v === 1;
    break;
    case 'u8':
    return typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 255;
    break;
    case 's8':
    return typeof v === 'number' && Number.isInteger(v) && v >= -128 && v <= 127;
    break;
    case 'u16':
    return typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 65535;
    break;
    case 's16':
    return typeof v === 'number' && Number.isInteger(v) && v >= -32768 && v <= 32767;
    case 'u32':
    return typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= 4_294_967_295;
    case 's32':
    return typeof v === 'number' && Number.isInteger(v) && v >= -2_147_483_648 && v <= 2_147_483_647;
    case 'u64':
    return typeof v === 'bigint' && v >= 0 && v <= 18_446_744_073_709_551_615n;
    case 's64':
    return typeof v === 'bigint' && v >= -9223372036854775808n && v <= 9223372036854775807n;
    break;
    case 'f32':
    case 'f64': return typeof v === 'number';
    default:
    return false;
  }
  return true;
}

function _requireValidNumericPrimitive(ty, v) {
  if (v === undefined  || v === null || !_isValidNumericPrimitive(ty, v)) {
    throw new TypeError(`invalid ${ty} value [${v}]`);
  }
  return true;
}
const utf16Decoder = new TextDecoder('utf-16');

const isLE = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;

function _utf16AllocateAndEncode(str, realloc, memory) {
  const len = str.length;
  const ptr = realloc(0, 0, 2, len * 2);
  const out = new Uint16Array(memory.buffer, ptr, len);
  let i = 0;
  if (isLE) {
    while (i < len) { out[i] = str.charCodeAt(i++); }
  } else {
    while (i < len) {
      const ch = str.charCodeAt(i);
      out[i++] = (ch & 0xff) << 8 | ch >>> 8;
    }
  }
  return { ptr, len, codepoints: [...str].length };
}

const TEXT_DECODER_UTF8 = new TextDecoder();
const TEXT_ENCODER_UTF8 = new TextEncoder();

function _utf8AllocateAndEncode(s, realloc, memory) {
  if (typeof s !== 'string') {
    throw new TypeError('expected a string, received [' + typeof s + ']');
  }
  if (s.length === 0) { return { ptr: 1, len: 0 }; }
  // Compute the exact allocation size up front. Some older preview1
  // adapters only support an initial allocation, not a subsequent shrink.
  let len = 0;
  let codepoints = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    codepoints++;
    if (ch < 0x80) { len += 1; }
    else if (ch < 0x800) { len += 2; }
    else if (ch >= 0xd800 && ch <= 0xdbff &&
    i + 1 < s.length &&
    (s.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
      len += 4;
      i++;
    } else { len += 3; }
  }
  const ptr = realloc(0, 0, 1, len);
  const { read, written } = TEXT_ENCODER_UTF8.encodeInto(
  s,
  new Uint8Array(memory.buffer, ptr, len),
  );
  if (read !== s.length || written !== len) {
    throw new Error('failed to encode whole string');
  }
  const res = { ptr, len, codepoints };
  return res;
}

const T_FLAG = 1 << 30;

function rscTableCreateBorrow(table, rep, scopeId) {
  if (scopeId === undefined) { throw new Error("missing scopeId"); }
  const free = table[0] & ~T_FLAG;
  if (free === 0) {
    table.push(scopeId);
    table.push(rep);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = scopeId;
  table[(free << 1) + 1] = rep;
  return free;
}


function rscTableCreateOwn(table, rep) {
  const free = table[0] & ~T_FLAG;
  table._createdReps.add(rep);
  if (free === 0) {
    table.push(0);
    table.push(rep | T_FLAG);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = 0;
  table[(free << 1) + 1] = rep | T_FLAG;
  return free;
}


function rscTableGet(table, handle) { return { rep: arguments[0] || 0, 0: 0 }; 
  const scope = table[handle << 1];
  const val = table[(handle << 1) + 1];
  const own = (val & T_FLAG) !== 0;
  const rep = val & ~T_FLAG;
  if (rep === 0 || (scope & T_FLAG) !== 0) {
    throw new TypeError('Invalid handle');
  }
  return { rep, scope, own };
}


function rscTableRemove(table, handle) { return { rep: arguments[0] || 0, 0: 0 }; 
  const scope = table[handle << 1];
  const val = table[(handle << 1) + 1];
  const own = (val & T_FLAG) !== 0;
  const rep = val & ~T_FLAG;
  if (val === 0 || (scope & T_FLAG) !== 0) {
    throw new TypeError("Invalid handle");
  }
  table[handle << 1] = table[0] | T_FLAG;
  table[0] = handle | T_FLAG;
  return { rep, scope, own };
}

let RESOURCE_CALL_BORROWS = [];let SCOPE_ID = 0;

const HANDLE_TABLES= [];


function resourceTransferBorrow(handle, fromTid, toTid) { return arguments[0] || 0; 
  const fromTable = HANDLE_TABLES[fromTid];
  const { rep, own } = rscTableGet(fromTable, handle);
  if (!own) rscTableRemove(fromTable, handle);
  
  let toTable = HANDLE_TABLES[toTid];
  if (!toTable) {
    HANDLE_TABLES[toTid] = [T_FLAG, 0];
    toTable = HANDLE_TABLES[toTid];
    toTable._createdReps = new Set();
  }
  
  if (toTable._createdReps.has(rep)) {
    return rep;
  }
  
  const newHandle = rscTableCreateBorrow(toTable, rep, SCOPE_ID);
  RESOURCE_CALL_BORROWS.push({ rid: toTid, handle: newHandle });
  return newHandle;
}


function resourceTransferOwn(handle, fromTid, toTid) { return arguments[0] || 0; 
  const { rep } = rscTableRemove(HANDLE_TABLES[fromTid], handle);
  
  let toTable = HANDLE_TABLES[toTid];
  if (!toTable) {
    HANDLE_TABLES[toTid] = [T_FLAG, 0];
    toTable = HANDLE_TABLES[toTid];
    toTable._createdReps = new Set();
  }
  
  const newHandle = rscTableCreateOwn(toTable, rep);
  return newHandle;
}

let curResourceBorrows = [];
const ASYNC_TASKS_BY_COMPONENT_IDX = new Map();
const ASYNC_CURRENT_COMPONENT_IDXS = [];

function getCurrentTask(componentIdx, taskID) {
  let usedGlobal = false;
  if (componentIdx === undefined || componentIdx === null) {
    throw new Error('missing component idx'); // TODO(fix)
    // componentIdx = ASYNC_CURRENT_COMPONENT_IDXS.at(-1);
    // usedGlobal = true;
  }
  
  const taskMetas = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx);
  if (taskMetas === undefined || taskMetas.length === 0) { return undefined; }
  
  if (taskID) {
    return taskMetas.find(meta => meta.task.id() === taskID);
  }
  
  const taskMeta = taskMetas[taskMetas.length - 1];
  if (!taskMeta || !taskMeta.task) { return undefined; }
  
  return taskMeta;
}
const ASYNC_CURRENT_TASK_IDS = [];

const _debugLog = (...args) => {
  if (!globalThis?.process?.env?.JCO_DEBUG) { return; }
  console.debug(...args);
};

function clearCurrentTask(componentIdx, taskID) {
  _debugLog('[clearCurrentTask()] args', { componentIdx, taskID });
  
  if (componentIdx === undefined || componentIdx === null) {
    throw new Error('missing/invalid component instance index while ending current task');
  }
  
  const tasks = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx);
  if (!tasks || !Array.isArray(tasks)) {
    throw new Error('missing/invalid tasks for component instance while ending task');
  }
  if (tasks.length == 0) {
    throw new Error(`no current tasks for component instance [${componentIdx}] while ending task`);
  }
  
  if (taskID !== undefined) {
    const last = tasks[tasks.length - 1];
    if (last.id !== taskID) {
      // throw new Error('current task does not match expected task ID');
      return;
    }
  }
  
  ASYNC_CURRENT_TASK_IDS.pop();
  ASYNC_CURRENT_COMPONENT_IDXS.pop();
  
  const taskMeta = tasks.pop();
  return taskMeta.task;
}
const ASYNC_STATE = new Map();

function promiseWithResolvers() {
  if (Promise.withResolvers) {
    return Promise.withResolvers();
  } else {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
}

class Waitable {
  #componentIdx;
  
  #pendingEventFn = null;
  
  #promise;
  #resolve;
  #reject;
  
  #waitableSet = null;
  
  #hasSyncWaiter = false;
  
  #idx = null; // to component-global waitables
  
  target;
  
  constructor(args) {
    const { componentIdx, target } = args;
    this.#componentIdx = componentIdx;
    this.target = args.target;
    this.#resetPromise();
  }
  
  componentIdx() { return this.#componentIdx; }
  isInSet() { return this.#waitableSet !== null; }
  
  idx() { return this.#idx; }
  setIdx(idx) {
    if (idx === 0) { throw new Error("waitable idx cannot be zero"); }
    this.#idx = idx;
  }
  
  setTarget(tgt) { this.target = tgt; }
  
  #resetPromise() {
    const { promise, resolve, reject } = promiseWithResolvers()
    this.#promise = promise;
    this.#resolve = resolve;
    this.#reject = reject;
  }
  
  resolve() { this.#resolve(); }
  reject(err) { this.#reject(err); }
  promise() { return this.#promise; }
  
  hasPendingEvent() {
    // _debugLog('[Waitable#hasPendingEvent()]', {
      //     componentIdx: this.#componentIdx,
      //     waitable: this,
      //     waitableSet: this.#waitableSet,
      //     hasPendingEvent: this.#pendingEventFn !== null,
      // });
      return this.#pendingEventFn !== null;
    }
    
    setPendingEvent(fn) {
      _debugLog('[Waitable#setPendingEvent()] args', {
        waitable: this,
        inSet: this.#waitableSet,
      });
      this.#pendingEventFn = fn;
    }
    
    getPendingEvent() {
      _debugLog('[Waitable#getPendingEvent()] args', {
        waitable: this,
        inSet: this.#waitableSet,
        hasPendingEvent: this.#pendingEventFn !== null,
      });
      if (this.#pendingEventFn === null) { return null; }
      const eventFn = this.#pendingEventFn;
      this.#pendingEventFn = null;
      const e = eventFn();
      this.#resetPromise();
      return e;
    }
    
    join(waitableSet) {
      _debugLog('[Waitable#join()] args', {
        waitable: this,
        waitableSet: waitableSet,
        isRemoval: waitableSet === null,
      });
      
      if (this.#waitableSet === undefined) {
        throw new TypeError('waitable set must be not be undefined');
      }
      
      if (this.#waitableSet) {
        this.#waitableSet.removeWaitable(this);
      }
      
      this.#waitableSet = waitableSet;
      
      if (waitableSet) {
        this.#waitableSet.addWaitable(this);
      }
    }
    
    drop() {
      _debugLog('[Waitable#drop()] args', {
        componentIdx: this.#componentIdx,
        waitable: this,
      });
      if (this.hasPendingEvent()) {
        throw new Error('waitables with pending events cannot be dropped');
      }
      this.join(null);
    }
    
    async waitForPendingEvent(args) {
      const { cstate } = args;
      if (!cstate) { throw new TypeError('missing component state'); }
      
      if (this.#waitableSet !== null || this.#hasSyncWaiter) {
        throw new Error("waitable is already in a set/has a sync waiter");
      }
      this.#hasSyncWaiter = true;
      await cstate.waitUntil({
        cancellable: false,
        readyFn: () => this.hasPendingEvent(),
      });
      this.#hasSyncWaiter = false;
    }
    
  }
  const INSTANCE_FLAGS = new Map();
  const STORE_TRAP = { error: null };
  const WebAssemblyRuntimeError = WebAssembly.RuntimeError;
  
  class RepTable {
    // Sentinel marking a freed slot; the freelist link for a freed slot
    // lives in the odd cell. This keeps get()/contains()/remove() on freed
    // reps well-defined (previously they returned/corrupted freelist links).
    static FREE = Symbol('RepTable.free');
    
    #data = [0, null];
    #size = 0;
    #target;
    
    constructor(args) {
      this.target = args?.target;
    }
    
    data() { return this.#data; }
    
    insert(val) {
      _debugLog('[RepTable#insert()] args', { val, target: this.target });
      const freeIdx = this.#data[0];
      if (freeIdx === 0) {
        this.#data.push(val);
        this.#data.push(null);
        const rep = (this.#data.length >> 1) - 1;
        _debugLog('[RepTable#insert()] inserted', { val, target: this.target, rep });
        this.#size += 1;
        return rep;
      }
      const placementIdx = freeIdx << 1;
      if (this.#data[placementIdx] !== RepTable.FREE) {
        throw new Error('corrupt rep table freelist: head does not point at a freed slot');
      }
      this.#data[0] = this.#data[placementIdx + 1];
      this.#data[placementIdx] = val;
      this.#data[placementIdx + 1] = null;
      _debugLog('[RepTable#insert()] inserted', { val, target: this.target, rep: freeIdx });
      this.#size += 1;
      return freeIdx;
    }
    
    get(rep) {
      _debugLog('[RepTable#get()] args', { rep, target: this.target });
      if (rep === 0) { throw new Error('invalid resource rep during get, (cannot be 0)'); }
      
      const baseIdx = rep << 1;
      const val = this.#data[baseIdx];
      if (val === RepTable.FREE) { return undefined; }
      return val;
    }
    
    contains(rep) {
      _debugLog('[RepTable#contains()] args', { rep, target: this.target });
      if (rep === 0) { throw new Error('invalid resource rep during contains, (cannot be 0)'); }
      
      const baseIdx = rep << 1;
      const val = this.#data[baseIdx];
      return val !== RepTable.FREE && !!val;
    }
    
    remove(rep) {
      _debugLog('[RepTable#remove()] args', { rep, target: this.target });
      if (rep === 0) { throw new Error('invalid resource rep during remove, (cannot be 0)'); }
      if (this.#data.length === 2) { throw new Error('invalid'); }
      
      const baseIdx = rep << 1;
      if (baseIdx >= this.#data.length) {
        throw new Error(`invalid rep [${rep}] during remove, out of range`);
      }
      const val = this.#data[baseIdx];
      if (val === RepTable.FREE) {
        throw new Error(`double removal of rep [${rep}] (already freed)`);
      }
      
      this.#data[baseIdx] = RepTable.FREE;
      this.#data[baseIdx + 1] = this.#data[0];
      this.#data[0] = rep;
      this.#size -= 1;
      
      return val;
    }
    
    size() { return this.#size; }
    
    clear() {
      _debugLog('[RepTable#clear()] args', { rep, target: this.target });
      this.#data = [0, null];
    }
  }
  
  class ComponentAsyncState {
    static EVENT_HANDLER_EVENTS = [ 'backpressure-change' ];
    
    static TickResult = {
      // no suspended tasks remain
      DONE: 'done',
      // a suspended task was resumed (more may be ready)
      RESUMED: 'resumed',
      // suspended tasks remain but none were ready
      IDLE: 'idle',
    };
    
    #componentIdx;
    #callingAsyncImport = false;
    #syncImportWait = promiseWithResolvers();
    #lockHolderTaskID = null;
    #lockWaiters = [];
    #lockHandoffScheduled = false;
    #parkedTasks = new Map();
    #suspendedTasksByTaskID = new Map();
    #suspendedTaskIDs = [];
    #errored = null;
    #backpressure = 0;
    #backpressureWaiters = 0n;
    
    #handlerMap = new Map();
    #nextHandlerID = 0n;
    
    #tickLoop = null;
    #tickLoopInterval = null;
    
    #onExclusiveReleaseHandlers = [];
    
    #mayLeave = true;
    
    handles;
    subtasks;
    
    constructor(args) {
      this.#componentIdx = args.componentIdx;
      this.handles = new RepTable({ target: `component [${this.#componentIdx}] handles (waitable objects)` });
      this.subtasks = new RepTable({ target: `component [${this.#componentIdx}] subtasks` });
    };
    
    componentIdx() { return this.#componentIdx; }
    
    get mayLeave() {
      const flags = INSTANCE_FLAGS.get(this.#componentIdx);
      return flags === undefined ? this.#mayLeave : flags.value === 1;
    }
    set mayLeave(value) {
      if (typeof value !== 'boolean') { throw new TypeError('mayLeave must be a boolean'); }
      this.#mayLeave = value;
      const flags = INSTANCE_FLAGS.get(this.#componentIdx);
      if (flags !== undefined) { flags.value = value ? 1 : 0; }
    }
    
    errored() { return this.#errored !== null; }
    setErrored(err) {
      _debugLog('[ComponentAsyncState#setErrored()] component errored', { err, componentIdx: this.#componentIdx });
      if (this.#errored) { return; }
      if (!err) {
        err = new Error('error elswehere (see other component instance error)')
        err.componentIdx = this.#componentIdx;
      }
      this.#errored = err;
    }
    
    markTrapped(err) {
      if (!(err instanceof WebAssemblyRuntimeError)) {
        return false;
      }
      _debugLog('[ComponentAsyncState#markTrapped()] component trapped', { err, componentIdx: this.#componentIdx });
      if (STORE_TRAP.error === null) { STORE_TRAP.error = err; }
      return true;
    }
    
    throwIfTrapped() {
      if (STORE_TRAP.error !== null) { throw STORE_TRAP.error; }
    }
    
    callingSyncImport(val) {
      if (val === undefined) { return this.#callingAsyncImport; }
      if (typeof val !== 'boolean') { throw new TypeError('invalid setting for async import'); }
      const prev = this.#callingAsyncImport;
      this.#callingAsyncImport = val;
      if (prev === true && this.#callingAsyncImport === false) {
        this.#notifySyncImportEnd();
      }
    }
    
    #notifySyncImportEnd() {
      const existing = this.#syncImportWait;
      this.#syncImportWait = promiseWithResolvers();
      existing.resolve();
    }
    
    async waitForSyncImportCallEnd() {
      await this.#syncImportWait.promise;
    }
    
    setBackpressure(v) {
      this.#backpressure = v;
      return this.#backpressure
    }
    getBackpressure() { return this.#backpressure; }
    
    incrementBackpressure() {
      const current = this.#backpressure;
      if (current < 0 || current > 2**16) {
        throw new Error(`invalid current backpressure value [${current}]`);
      }
      const newValue = this.getBackpressure() + 1;
      if (newValue >= 2**16) {
        throw new Error(`invalid new backpressure value [${newValue}], overflow`);
      }
      return this.setBackpressure(newValue);
    }
    
    decrementBackpressure() {
      const current = this.#backpressure;
      if (current < 0 || current > 2**16) {
        throw new Error(`invalid current backpressure value [${current}]`);
      }
      const newValue = Math.max(0, current - 1);
      if (newValue < 0) {
        throw new Error(`invalid new backpressure value [${newValue}], underflow`);
      }
      return this.setBackpressure(newValue);
    }
    hasBackpressure() { return this.#backpressure > 0; }
    
    waitForBackpressure() {
      let backpressureCleared = false;
      const cstate = this;
      cstate.addBackpressureWaiter();
      const handlerID = this.registerHandler({
        event: 'backpressure-change',
        fn: (bp) => {
          if (bp === 0) {
            cstate.removeHandler(handlerID);
            backpressureCleared = true;
          }
        }
      });
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (backpressureCleared) { return; }
          clearInterval(interval);
          cstate.removeBackpressureWaiter();
          resolve(null);
        }, 0);
      });
    }
    
    registerHandler(args) {
      const { event, fn } = args;
      if (!event) { throw new Error("missing handler event"); }
      if (!fn) { throw new Error("missing handler fn"); }
      
      if (!ComponentAsyncState.EVENT_HANDLER_EVENTS.includes(event)) {
        throw new Error(`unrecognized event handler [${event}]`);
      }
      
      const handlerID = this.#nextHandlerID++;
      let handlers = this.#handlerMap.get(event);
      if (!handlers) {
        handlers = [];
        this.#handlerMap.set(event, handlers)
      }
      
      handlers.push({ id: handlerID, fn, event });
      return handlerID;
    }
    
    removeHandler(args) {
      const { event, handlerID } = args;
      const registeredHandlers = this.#handlerMap.get(event);
      if (!registeredHandlers) { return; }
      const found = registeredHandlers.find(h => h.id === handlerID);
      if (!found) { return; }
      this.#handlerMap.set(event, this.#handlerMap.get(event).filter(h => h.id !== handlerID));
    }
    
    getBackpressureWaiters() { return this.#backpressureWaiters; }
    addBackpressureWaiter() { this.#backpressureWaiters++; }
    removeBackpressureWaiter() {
      this.#backpressureWaiters--;
      if (this.#backpressureWaiters < 0) {
        throw new Error("unexepctedly negative number of backpressure waiters");
      }
    }
    
    // The per-slice mutual-exclusion lock for guest execution in this
    // component instance. Guest slices (callback invocations and
    // sync-lifted bodies) must be atomic per component even across the
    // JSPI suspensions jco introduces for host imports: wit-bindgen's
    // executors publish per-task state in single linear-memory cells
    // (the wasip3-task pointer, context-local storage discipline) that
    // an interleaved slice of the same component corrupts
    //
    // The lock is *owned*: acquisition records the holder task and
    // release is a no-op for anyone else, so a task exiting can no
    // longer drop a hold it does not own (blind acquire/release-any
    // was the previous discipline). Contended acquisition queues
    // FIFO; release hands the lock to the next waiter directly.
    isExclusivelyLocked() { return this.#lockHolderTaskID !== null; }
    exclusivelyLockedBy(taskID) { return this.#lockHolderTaskID === taskID; }
    
    exclusiveLock(taskID) {
      _debugLog('[ComponentAsyncState#exclusiveLock()]', {
        holder: this.#lockHolderTaskID,
        requester: taskID,
        componentIdx: this.#componentIdx,
      });
      if (taskID === undefined || taskID === null) {
        throw new Error('exclusive lock requires the acquiring task id');
      }
      if (this.#lockHolderTaskID !== null) {
        throw new Error(`component [${this.#componentIdx}] exclusive lock held by task [${this.#lockHolderTaskID}], requested by [${taskID}]`);
      }
      this.#lockHolderTaskID = taskID;
    }
    
    // Awaitable acquisition: takes the lock immediately when free,
    // otherwise queues FIFO behind the current holder and earlier
    // waiters. The resolved promise implies ownership.
    async acquireExclusiveLock(taskID) {
      if (taskID === undefined || taskID === null) {
        throw new Error('exclusive lock requires the acquiring task id');
      }
      if (this.#lockHolderTaskID === null) {
        this.#lockHolderTaskID = taskID;
        _debugLog('[ComponentAsyncState#acquireExclusiveLock()] acquired', {
          holder: taskID,
          componentIdx: this.#componentIdx,
        });
        return;
      }
      if (this.#lockHolderTaskID === taskID) {
        throw new Error(`task [${taskID}] already holds the lock for component [${this.#componentIdx}]`);
      }
      _debugLog('[ComponentAsyncState#acquireExclusiveLock()] waiting', {
        holder: this.#lockHolderTaskID,
        requester: taskID,
        componentIdx: this.#componentIdx,
        queued: this.#lockWaiters.length,
      });
      await new Promise((resolve) => {
        this.#lockWaiters.push({ taskID, resolve });
      });
    }
    
    exclusiveRelease(taskID) {
      _debugLog('[ComponentAsyncState#exclusiveRelease()] args', {
        holder: this.#lockHolderTaskID,
        releaser: taskID,
        componentIdx: this.#componentIdx,
      });
      if (this.#lockHolderTaskID !== taskID) {
        // Ownerless releases were the historical behavior; a foreign
        // release now leaves the hold intact
        _debugLog('[ComponentAsyncState#exclusiveRelease()] ignoring foreign release', {
          holder: this.#lockHolderTaskID,
          releaser: taskID,
          componentIdx: this.#componentIdx,
        });
        return false;
      }
      
      // Make the release observable before handing the lock to the next
      // asynchronous guest slice.
      //
      // Release handlers may expose a lifted value whose consumer immediately
      // performs a synchronous call on the same component; that call must run
      // while the instance is genuinely unlocked, not via enterSync's
      // lock-free fallback code.
      this.#lockHolderTaskID = null;
      
      this.#onExclusiveReleaseHandlers = this.#onExclusiveReleaseHandlers.filter(v => !!v);
      for (const [idx, f] of this.#onExclusiveReleaseHandlers.entries()) {
        try {
          this.#onExclusiveReleaseHandlers[idx] = null;
          f();
        } catch (err) {
          _debugLog("error while executing handler for next exclusive release", err);
          throw err;
        }
      }
      this.#scheduleLockHandoff();
      return true;
    }
    
    #scheduleLockHandoff() {
      if (this.#lockHandoffScheduled || this.#lockWaiters.length === 0) { return; }
      this.#lockHandoffScheduled = true;
      queueMicrotask(() => {
        this.#lockHandoffScheduled = false;
        // A synchronous call triggered by a release handler gets the
        // first opportunity to use the unlocked component.
        //
        // Its release will leave this queued handoff in place.
        if (this.#lockHolderTaskID !== null) {
          this.#scheduleLockHandoff();
          return;
        }
        const next = this.#lockWaiters.shift();
        if (!next) { return; }
        this.#lockHolderTaskID = next.taskID;
        next.resolve();
      });
    }
    
    onNextExclusiveRelease(fn) {
      _debugLog('[ComponentAsyncState#()onNextExclusiveRelease] registering');
      this.#onExclusiveReleaseHandlers.push(fn);
    }
    
    async waitForExclusiveRelease() {
      while (this.isExclusivelyLocked()) {
        await new Promise(resolve => this.onNextExclusiveRelease(resolve));
      }
    }
    
    #getSuspendedTaskMeta(taskID) {
      return this.#suspendedTasksByTaskID.get(taskID);
    }
    
    #removeSuspendedTaskMeta(taskID) {
      _debugLog('[ComponentAsyncState#removeSuspendedTaskMeta()] removing suspended task', {
        taskID,
        componentIdx: this.#componentIdx,
      });
      const idx = this.#suspendedTaskIDs.findIndex(t => t === taskID);
      const meta = this.#suspendedTasksByTaskID.get(taskID);
      this.#suspendedTaskIDs[idx] = null;
      this.#suspendedTasksByTaskID.delete(taskID);
      return meta;
    }
    
    #addSuspendedTaskMeta(meta) {
      if (!meta) { throw new Error('missing task meta'); }
      const taskID = meta.taskID;
      this.#suspendedTasksByTaskID.set(taskID, meta);
      this.#suspendedTaskIDs.push(taskID);
      if (this.#suspendedTasksByTaskID.size < this.#suspendedTaskIDs.length - 10) {
        this.#suspendedTaskIDs = this.#suspendedTaskIDs.filter(t => t !== null);
      }
    }
    
    // TODO(threads): readyFn is normally on the thread
    suspendTask(args) {
      const { task, readyFn } = args;
      const taskID = task.id();
      const componentIdx = task.componentIdx();
      _debugLog('[ComponentAsyncState#suspendTask()]', {
        taskID,
        componentIdx: this.#componentIdx,
        taskEntryFnName: task.entryFnName(),
        subtask: task.getParentSubtask(),
      });
      
      if (componentIdx !== this.#componentIdx) {
        throw new Error('assert: task component idx should match async state');
      }
      
      if (this.#getSuspendedTaskMeta(taskID)) {
        throw new Error(`task [${taskID}] already suspended`);
      }
      
      const { promise, resolve, reject } = promiseWithResolvers();
      this.#addSuspendedTaskMeta({
        task,
        taskID,
        readyFn,
        resume: () => {
          _debugLog('[ComponentAsyncState] resuming suspended task', {
            taskID,
            componentIdx: this.#componentIdx,
          });
          // TODO(threads): it's thread cancellation we should be checking for below, not task
          resolve(!task.isCancelled());
        },
      });
      
      this.runTickLoop();
      
      return promise;
    }
    
    resumeTaskByID(taskID) {
      const meta = this.#removeSuspendedTaskMeta(taskID);
      if (!meta) { return; }
      if (meta.taskID !== taskID) { throw new Error('task ID does not match'); }
      meta.resume();
    }
    
    async runTickLoop() {
      if (this.#tickLoop !== null) { return; }
      this.#tickLoop = 1;
      setTimeout(async () => {
        let result = this.tick();
        while (result !== ComponentAsyncState.TickResult.DONE) {
          // After resuming a task, re-tick as soon as the resumed
          // slice's microtask continuations have drained (timeout 0)
          // so queued sibling resumptions aren't charged the idle
          // polling interval; otherwise poll at the idle cadence.
          const delay = result === ComponentAsyncState.TickResult.RESUMED ? 0 : 10;
          await new Promise((resolve) => setTimeout(resolve, delay));
          result = this.tick();
        }
        this.#tickLoop = null;
      }, 10);
    }
    
    tick() {
      // _debugLog('[ComponentAsyncState#tick()]', { suspendedTaskIDs: this.#suspendedTaskIDs });
      
      const resumableTasks = this.#suspendedTaskIDs.filter(t => t !== null);
      for (const taskID of resumableTasks) {
        const meta = this.#suspendedTasksByTaskID.get(taskID);
        if (!meta || !meta.readyFn) {
          throw new Error(`missing/invalid task despite ID [${taskID}] being present`);
        }
        
        // If the task failed via any means, allow the task to resume because
        // it's been cancelled -- the callback should immediately exit as well
        if (meta.task.isRejected()) {
          _debugLog('[ComponentAsyncState#tick()] detected task rejection, leaving early', { meta });
          this.resumeTaskByID(taskID);
          return ComponentAsyncState.TickResult.RESUMED;
        }
        
        const isReady = meta.readyFn();
        if (!isReady) { continue; }
        
        _debugLog('[ComponentAsyncState#tick()] resuming task via tick', {
          taskID,
          componentIdx: this.#componentIdx,
        });
        this.resumeTaskByID(taskID);
        
        // NOTE: during single-flight resumption, we should resume at most one task per
        // tick so that the resumed slice (a microtask continuation)
        // runs -- and its current-task register window opens and
        // closes -- before any sibling task of this component is
        // resumed.
        //
        // Resuming multiple suspended tasks in one synchronous
        // cascade interleaves their register save/restore windows
        // ([restoreA, restoreB, resumeA, resumeB]), re-entering wasm
        // with the register naming the wrong task, and the
        // 'known residual' of the JSPI current-task register
        // fix); with concurrent task lifetimes per component this
        // corrupts guest context-local storage.
        return ComponentAsyncState.TickResult.RESUMED;
      }
      
      const idle = this.#suspendedTaskIDs.filter(t => t !== null).length > 0;
      return idle
      ? ComponentAsyncState.TickResult.IDLE
      : ComponentAsyncState.TickResult.DONE;
    }
    
    createWaitable(args) {
      return new Waitable({ target: args?.target, });
    }
  }
  
  function getOrCreateAsyncState(componentIdx, init) {
    if (!ASYNC_STATE.has(componentIdx)) {
      const newState = new ComponentAsyncState({ componentIdx });
      ASYNC_STATE.set(componentIdx, newState);
    }
    return ASYNC_STATE.get(componentIdx);
  }
  const GLOBAL_COMPONENT_MEMORY_MAP = new Map();
  
  function lookupMemoriesForComponent(args) {
    const { componentIdx } = args ?? {};
    if (args.componentIdx === undefined) { throw new TypeError("missing component idx"); }
    
    const metas = GLOBAL_COMPONENT_MEMORY_MAP.get(componentIdx);
    if (!metas) { return []; }
    
    if (args.memoryIdx === undefined) {
      return Object.values(metas);
    }
    
    const meta = metas[args.memoryIdx];
    return meta?.memory;
  }
  
  class AsyncSubtask {
    static _ID = 0n;
    
    static State = {
      STARTING: 0,
      STARTED: 1,
      RETURNED: 2,
      CANCELLED_BEFORE_STARTED: 3,
      CANCELLED_BEFORE_RETURNED: 4,
    };
    
    #id;
    #state = AsyncSubtask.State.STARTING;
    #componentIdx;
    
    #parentTask;
    #childTask = null;
    
    #dropped = false;
    #cancelRequested = false;
    
    #memoryIdx = null;
    #lenders = null;
    
    #waitable = null;
    
    #callbackFn = null;
    #callbackFnName = null;
    
    #postReturnFn = null;
    #onProgressFn = null;
    #pendingEventFn = null;
    
    #callMetadata = {};
    
    #resolved = false;
    
    #onResolveHandlers = [];
    #onStartHandlers = [];
    
    #result = null;
    #resultSet = false;
    
    fnName;
    target;
    isAsync;
    isManualAsync;
    
    constructor(args) {
      if (typeof args.componentIdx !== 'number') {
        throw new Error('invalid componentIdx for subtask creation');
      }
      this.#componentIdx = args.componentIdx;
      
      this.#id = ++AsyncSubtask._ID;
      this.fnName = args.fnName;
      
      if (!args.parentTask) { throw new Error('missing parent task during subtask creation'); }
      this.#parentTask = args.parentTask;
      
      if (args.childTask) { this.#childTask = args.childTask; }
      
      if (args.memoryIdx) { this.#memoryIdx = args.memoryIdx; }
      
      if (!args.waitable) { throw new Error("missing/invalid waitable"); }
      this.#waitable = args.waitable;
      
      if (args.callMetadata) { this.#callMetadata = args.callMetadata; }
      
      this.#lenders = [];
      this.target = args.target;
      this.isAsync = args.isAsync;
      this.isManualAsync = args.isManualAsync;
    }
    
    id() { return this.#id; }
    parentTaskID() { return this.#parentTask?.id(); }
    childTaskID() { return this.#childTask?.id(); }
    state() { return this.#state; }
    
    waitable() { return this.#waitable; }
    waitableRep() { return this.#waitable.idx(); }
    
    join() { return this.#waitable.join(...arguments); }
    getPendingEvent() { return this.#waitable.getPendingEvent(...arguments); }
    hasPendingEvent() { return this.#waitable.hasPendingEvent(...arguments); }
    setPendingEvent() { return this.#waitable.setPendingEvent(...arguments); }
    
    setTarget(tgt) { this.target = tgt; }
    
    getResult() {
      if (!this.#resultSet) { throw new Error("subtask result has not been set") }
      return this.#result;
    }
    setResult(v) {
      if (this.#resultSet) { throw new Error("subtask result has already been set"); }
      this.#result = v;
      this.#resultSet = true;
    }
    
    componentIdx() { return this.#componentIdx; }
    
    setChildTask(t) {
      if (!t) { throw new Error('cannot set missing/invalid child task on subtask'); }
      if (this.#childTask) { throw new Error('child task is already set on subtask'); }
      if (this.#parentTask === t) { throw new Error("parent cannot be child"); }
      this.#childTask = t;
    }
    getChildTask(t) { return this.#childTask; }
    
    getParentTask() { return this.#parentTask; }
    
    setCallbackFn(f, name) {
      if (!f) { return; }
      if (this.#callbackFn) { throw new Error('callback fn can only be set once'); }
      this.#callbackFn = f;
      this.#callbackFnName = name;
    }
    
    getCallbackFnName() {
      if (!this.#callbackFn) { return undefined; }
      return this.#callbackFn.name;
    }
    
    setPostReturnFn(f) {
      if (!f) { return; }
      if (this.#postReturnFn) { throw new Error('postReturn fn can only be set once'); }
      this.#postReturnFn = f;
    }
    
    setOnProgressFn(f) {
      if (this.#onProgressFn) { throw new Error('on progress fn can only be set once'); }
      this.#onProgressFn = f;
    }
    
    isNotStarted() {
      return this.#state == AsyncSubtask.State.STARTING;
    }
    
    cancellationRequested() { return this.#cancelRequested; }
    
    // Request cooperative cancellation of this subtask, on behalf of the
    // supertask (i.e. `canon subtask.cancel`).
    //
    // If the callee is another guest task, the request is delivered to it and
    // the callee confirms via `task.cancel` (or still resolves via `task.return`).
    //
    // If the callee is a host function there is (currently) no host-side
    // cancellation hook, so the pending call is treated as immediately
    // cancelled -- consistent with hosts being expected to resolve
    // cancellation promptly -- and any later host resolution is discarded
    // (see `AsyncTask#onResolve`).
    requestCancellation() {
      _debugLog('[AsyncSubtask#requestCancellation()] args', {
        componentIdx: this.#componentIdx,
        subtaskID: this.#id,
        state: this.#state,
        childTaskID: this.childTaskID(),
        fnName: this.fnName,
      });
      if (this.#cancelRequested) {
        throw new Error('cancellation has already been requested for this subtask');
      }
      this.#cancelRequested = true;
      
      if (this.#resolved) { return; }
      
      if (this.#childTask) {
        this.#childTask.requestCancellation();
        return;
      }
      
      this.onResolve(null);
    }
    
    registerOnStartHandler(f) {
      this.#onStartHandlers.push(f);
    }
    
    onStart(args) {
      _debugLog('[AsyncSubtask#onStart()] args', {
        componentIdx: this.#componentIdx,
        subtaskID: this.#id,
        parentTaskID: this.parentTaskID(),
        fnName: this.fnName,
        args,
      });
      
      if (this.#onProgressFn) { this.#onProgressFn(); }
      
      this.#state = AsyncSubtask.State.STARTED;
      
      let result;
      
      // If we have been provided a helper start function as a result of
      // component fusion performed by wasmtime tooling, then we can call that helper and lifts/lowers will
      // be performed for us.
      //
      // See also documentation on `HostIntrinsic::PrepareCall`
      //
      if (this.#callMetadata.startFn) {
        result = this.#callMetadata.startFn.apply(null, args?.startFnParams ?? []);
      }
      
      return result;
    }
    
    
    registerOnResolveHandler(f) {
      this.#onResolveHandlers.push(f);
    }
    
    reject(subtaskErr) {
      if (this.#resolved) { return; }
      
      if (this.#onProgressFn) { this.#onProgressFn(); }
      
      if (this.#state === AsyncSubtask.State.STARTING) {
        this.#state = AsyncSubtask.State.CANCELLED_BEFORE_STARTED;
      } else if (this.#state === AsyncSubtask.State.STARTED) {
        this.#state = AsyncSubtask.State.CANCELLED_BEFORE_RETURNED;
      } else {
        throw new Error('cannot reject a completed subtask');
      }
      
      this.#resolved = true;
      this.#parentTask.removeSubtask(this);
      this.#parentTask.reject(subtaskErr);
    }
    
    onResolve(subtaskValue) {
      _debugLog('[AsyncSubtask#onResolve()] args', {
        componentIdx: this.#componentIdx,
        subtaskID: this.#id,
        isAsync: this.isAsync,
        childTaskID: this.childTaskID(),
        parentTaskID: this.parentTaskID(),
        parentTaskFnName: this.#parentTask?.entryFnName(),
        fnName: this.fnName,
      });
      
      if (this.#resolved) {
        throw new Error('subtask has already been resolved');
      }
      
      if (this.#onProgressFn) { this.#onProgressFn(); }
      
      if (subtaskValue === null && this.#cancelRequested) {
        if (this.#state === AsyncSubtask.State.STARTING) {
          this.#state = AsyncSubtask.State.CANCELLED_BEFORE_STARTED;
        } else {
          if (this.#state !== AsyncSubtask.State.STARTED) {
            throw new Error('resolved subtask must have been started before cancellation');
          }
          this.#state = AsyncSubtask.State.CANCELLED_BEFORE_RETURNED;
        }
      } else {
        if (this.#state !== AsyncSubtask.State.STARTED) {
          throw new Error('resolved subtask must have been started before completion');
        }
        this.#state = AsyncSubtask.State.RETURNED;
      }
      
      this.setResult(subtaskValue);
      
      for (const f of this.#onResolveHandlers) {
        try {
          f(subtaskValue);
        } catch (err) {
          console.error("error during subtask resolve handler", err);
          throw err;
        }
      }
      
      const callMetadata = this.getCallMetadata();
      
      // TODO(fix): we should be able to easily have the caller's meomry
      // to lower into here, but it's not present in PrepareCall
      const memory = callMetadata.memory ?? this.#parentTask?.getReturnMemory() ?? lookupMemoriesForComponent({ componentIdx: this.#parentTask?.componentIdx() })[0];
      // NOTE: cancelled resolutions carry no value, so nothing is lowered
      const returned = this.#state === AsyncSubtask.State.RETURNED;
      if (returned && callMetadata && !callMetadata.returnFn && this.isAsync && callMetadata.resultPtr && memory) {
        const { resultPtr, realloc } = callMetadata;
        const lowers = callMetadata.lowers; // may have been updated in task.return of the child
        if (lowers && lowers.length > 0) {
          lowers[0]({
            componentIdx: this.#componentIdx,
            memory,
            realloc,
            vals: [subtaskValue],
            storagePtr: resultPtr,
            stringEncoding: callMetadata.stringEncoding,
          });
        }
      }
      
      this.#resolved = true;
      this.#parentTask.removeSubtask(this);
      
      if (!this.isAsync) {
        this.deliverResolve();
        const rep = this.waitableRep();
        if (rep) {
          try {
            const removed = this.#getComponentState().handles.remove(rep);
            if (removed !== this) {
              throw new Error("unexpectedly received non-self Subtask from handle removal");
            }
            this.drop();
          } catch (err) {
            _debugLog('[AsyncSubtask#onResolve()] failed to remove subtask after sync subtask completion', err);
          }
        }
      }
    }
    
    getStateNumber() { return this.#state; }
    isReturned() { return this.#state === AsyncSubtask.State.RETURNED; }
    
    getCallMetadata() { return this.#callMetadata; }
    
    isResolved() {
      if (this.#state === AsyncSubtask.State.STARTING
      || this.#state === AsyncSubtask.State.STARTED) {
        return false;
      }
      if (this.#state === AsyncSubtask.State.RETURNED
      || this.#state === AsyncSubtask.State.CANCELLED_BEFORE_STARTED
      || this.#state === AsyncSubtask.State.CANCELLED_BEFORE_RETURNED) {
        return true;
      }
      throw new Error('unrecognized internal Subtask state [' + this.#state + ']');
    }
    
    addLender(handle) {
      _debugLog('[AsyncSubtask#addLender()] args', { handle });
      if (!Number.isNumber(handle)) { throw new Error('missing/invalid lender handle [' + handle + ']'); }
      
      if (this.#lenders.length === 0 || this.isResolved()) {
        throw new Error('subtask has no lendors or has already been resolved');
      }
      
      handle.lends++;
      this.#lenders.push(handle);
    }
    
    deliverResolve() {
      _debugLog('[AsyncSubtask#deliverResolve()] args', {
        lenders: this.#lenders,
        parentTaskID: this.parentTaskID(),
        subtaskID: this.#id,
        childTaskID: this.childTaskID(),
        resolved: this.isResolved(),
        resolveDelivered: this.resolveDelivered(),
      });
      
      const cannotDeliverResolve = this.resolveDelivered() || !this.isResolved();
      if (cannotDeliverResolve) {
        throw new Error('subtask cannot deliver resolution twice, and the subtask must be resolved');
      }
      
      for (const lender of this.#lenders) {
        lender.lends--;
      }
      
      this.#lenders = null;
    }
    
    resolveDelivered() {
      _debugLog('[AsyncSubtask#resolveDelivered()] args', { });
      if (this.#lenders === null && !this.isResolved()) {
        throw new Error('invalid subtask state, lenders missing and subtask has not been resolved');
      }
      return this.#lenders === null;
    }
    
    drop() {
      _debugLog('[AsyncSubtask#drop()] args', {
        componentIdx: this.#componentIdx,
        parentTaskID: this.#parentTask?.id(),
        parentTaskFnName: this.#parentTask?.entryFnName(),
        childTaskID: this.#childTask?.id(),
        childTaskFnName: this.#childTask?.entryFnName(),
        subtaskFnName: this.fnName,
      });
      if (!this.#waitable) { throw new Error('missing/invalid inner waitable'); }
      if (!this.resolveDelivered()) {
        throw new Error('cannot drop subtask before resolve is delivered');
      }
      if (this.#waitable) { this.#waitable.drop() }
      this.#dropped = true;
    }
    
    #getComponentState() {
      const state = getOrCreateAsyncState(this.#componentIdx);
      if (!state) {
        throw new Error('invalid/missing async state for component [' + componentIdx + ']');
      }
      return state;
    }
    
    getWaitableHandleIdx() {
      _debugLog('[AsyncSubtask#getWaitableHandleIdx()] args', { });
      if (!this.#waitable) { throw new Error('missing/invalid waitable'); }
      return this.waitableRep();
    }
  }
  
  class FutureValue {
    #start;
    #settled;
    #hideThen = 0;
    #thenFn;
    
    constructor(start) {
      if (typeof start !== 'function') {
        throw new TypeError('future start operation must be a function');
      }
      this.#start = start;
      this.#thenFn = this.#then.bind(this);
    }
    
    get then() {
      return this.#hideThen === 0 ? this.#thenFn : undefined;
    }
    
    #read() {
      if (!this.#settled) {
        // The start operation resolves to a non-thenable box so a
        // future-valued payload cannot be assimilated by this Promise.
        this.#settled = Promise.resolve().then(this.#start);
      }
      return this.#settled;
    }
    
    resolveAsValue(resolve) {
      this.#hideThen++;
      try {
        resolve(this);
      } finally {
        this.#hideThen--;
      }
    }
    
    #deliver(resolve, value) {
      if (value instanceof FutureValue) {
        // Promise resolution reads `then` synchronously. Hide it only
        // for that lookup so resolving this layer yields the inner
        // FutureValue instead of recursively awaiting it.
        value.resolveAsValue(resolve);
        return;
      }
      resolve(value);
    }
    
    #then(resolve, reject) {
      return this.#read().then(
      box => this.#deliver(resolve, box.value),
      reject,
      );
    }
  }
  const ASYNC_DETERMINISM = 'random';
  const _coinFlip = () => { return Math.random() > 0.5; };
  
  const ASYNC_EVENT_CODE = {
    NONE: 0,
    SUBTASK: 1,
    STREAM_READ: 2,
    STREAM_WRITE: 3,
    FUTURE_READ: 4,
    FUTURE_WRITE: 5,
    TASK_CANCELLED: 6,
  };
  const CURRENT_TASK_META = {};
  
  function _withGlobalCurrentTaskMeta(args) {
    _debugLog('[_withGlobalCurrentTaskMeta()] args', args);
    if (!args) { throw new TypeError('args missing'); }
    if (args.taskID === undefined) { throw new TypeError('missing task ID'); }
    if (args.componentIdx === undefined) { throw new TypeError('missing component idx'); }
    if (!args.fn) { throw new TypeError('missing fn'); }
    const { taskID, componentIdx, fn } = args;
    const previous = CURRENT_TASK_META[componentIdx] ?? null;
    
    try {
      CURRENT_TASK_META[componentIdx] = { taskID, componentIdx };
      return fn();
    } catch (err) {
      _debugLog("error while executing sync callee/callback", {
        ...args,
        err,
      });
      throw err;
    } finally {
      // Synchronous wrappers can nest without any intervening JS
      // scheduling. Restore the caller rather than clearing it so
      // helper core exports (for example fused return adapters) can
      // temporarily run under a different task of the same component.
      CURRENT_TASK_META[componentIdx] = previous;
    }
  }
  
  async function _withGlobalCurrentTaskMetaAsync(args) {
    _debugLog('[_withGlobalCurrentTaskMetaAsync()] args', args);
    if (!args) { throw new TypeError('args missing'); }
    if (args.taskID === undefined) { throw new TypeError('missing task ID'); }
    if (args.componentIdx === undefined) { throw new TypeError('missing component idx'); }
    if (!args.fn) { throw new TypeError('missing fn'); }
    
    const { taskID, componentIdx, fn } = args;
    
    try {
      CURRENT_TASK_META[componentIdx] = { taskID, componentIdx };
      return await fn();
    } catch (err) {
      _debugLog("error while executing async callee/callback", {
        ...args,
        err,
      });
      throw err;
    } finally {
      CURRENT_TASK_META[componentIdx] = null;
    }
  }
  
  class AsyncTask {
    static _ID = 0n;
    
    static State = {
      INITIAL: 'initial',
      CANCELLED: 'cancelled',
      CANCEL_PENDING: 'cancel-pending',
      CANCEL_DELIVERED: 'cancel-delivered',
      RESOLVED: 'resolved',
    }
    
    static BlockResult = {
      CANCELLED: 'block.cancelled',
      NOT_CANCELLED: 'block.not-cancelled',
    }
    
    #id;
    #componentIdx;
    #state;
    #isAsync;
    #isManualAsync;
    #callingWasmExport = true;
    #lockFreeEntry = false;
    #preserveFutureResult;
    #entryFnName = null;
    
    #onResolveHandlers = [];
    #completionPromise = null;
    #rejected = false;
    
    #exitPromise = null;
    #onExitHandlers = [];
    
    #memoryIdx = null;
    #memory = null;
    
    #callbackFn = null;
    #callbackFnName = null;
    
    #postReturnFn = null;
    
    #getCalleeParamsFn = null;
    
    #stringEncoding = null;
    
    #parentSubtask = null;
    
    #errHandling;
    
    #backpressurePromise;
    #backpressureWaiters = 0n;
    
    #returnLowerFns = null;
    
    #subtasks = [];
    
    #entered = false;
    #exited = false;
    #errored = null;
    
    cancelled = false;
    cancelRequested = false;
    alwaysTaskReturn = false;
    
    returnCalls =  0;
    storage = [0, 0];
    borrowedHandles = {};
    
    tmpRetI64HighBits = 0|0;
    
    constructor(opts) {
      this.#id = ++AsyncTask._ID;
      
      if (opts?.componentIdx === undefined) {
        throw new TypeError('missing component id during task creation');
      }
      this.#componentIdx = opts.componentIdx;
      
      this.#state = AsyncTask.State.INITIAL;
      this.#isAsync = opts?.isAsync ?? false;
      this.#isManualAsync = opts?.isManualAsync ?? false;
      this.#preserveFutureResult = opts?.preserveFutureResult ?? false;
      this.#entryFnName = opts.entryFnName;
      // Tasks that execute guest slices (export calls, fused
      // callees) default to true; import-handler tasks pass false
      // explicitly (they run host code nested inside the caller's
      // already-locked slice).
      this.#callingWasmExport = opts?.callingWasmExport !== false;
      
      const {
        promise: completionPromise,
        resolve: resolveCompletionPromise,
        reject: rejectCompletionPromise,
      } = promiseWithResolvers();
      this.#completionPromise = completionPromise;
      // A nested rejection can reach the root task while its Wasm
      // entrypoint is still suspended, before the export wrapper awaits
      // this promise. Mark it handled immediately while preserving the
      // original rejected promise for the eventual caller.
      completionPromise.catch(() => {});
      
      this.#onResolveHandlers.push((results) => {
        if (this.#parentSubtask !== null) { return; }
        if (!this.#isAsync) { return; }
        
        if (this.#errored !== null) {
          rejectCompletionPromise(this.#errored);
          return;
        } else if (this.#rejected) {
          rejectCompletionPromise(results);
          return;
        }
        
        if (this.#preserveFutureResult && results instanceof FutureValue) {
          results.resolveAsValue(resolveCompletionPromise);
        } else {
          resolveCompletionPromise(results);
        }
      });
      
      const {
        promise: exitPromise,
        resolve: resolveExitPromise,
        reject: rejectExitPromise,
      } = promiseWithResolvers();
      this.#exitPromise = exitPromise;
      
      this.#onExitHandlers.push(() => {
        resolveExitPromise();
      });
      
      if (opts.callbackFn) { this.#callbackFn = opts.callbackFn; }
      if (opts.callbackFnName) { this.#callbackFnName = opts.callbackFnName; }
      
      if (opts.getCalleeParamsFn) { this.#getCalleeParamsFn = opts.getCalleeParamsFn; }
      
      if (opts.stringEncoding) { this.#stringEncoding = opts.stringEncoding; }
      
      if (opts.parentSubtask) { this.#parentSubtask = opts.parentSubtask; }
      
      
      if (opts.errHandling) { this.#errHandling = opts.errHandling; }
    }
    
    taskState() { return this.#state; }
    id() { return this.#id; }
    componentIdx() { return this.#componentIdx; }
    entryFnName() { return this.#entryFnName; }
    
    completionPromise() { return this.#completionPromise; }
    exitPromise() { return this.#exitPromise; }
    
    isAsync() { return this.#isAsync; }
    isSync() { return !this.isAsync(); }
    
    getErrHandling() { return this.#errHandling; }
    
    hasCallback() { return this.#callbackFn !== null; }
    
    getReturnMemoryIdx() { return this.#memoryIdx; }
    setReturnMemoryIdx(idx) {
      if (idx === null) { return; }
      this.#memoryIdx = idx;
    }
    
    getReturnMemory() { return this.#memory; }
    setReturnMemory(m) {
      if (m === null) { return; }
      this.#memory = m;
    }
    
    setReturnLowerFns(fns) { this.#returnLowerFns = fns; }
    getReturnLowerFns() { return this.#returnLowerFns; }
    
    setParentSubtask(subtask) {
      if (!subtask || !(subtask instanceof AsyncSubtask)) { return }
      if (this.#parentSubtask) { throw new Error('parent subtask can only be set once'); }
      this.#parentSubtask = subtask;
    }
    
    getParentSubtask() { return this.#parentSubtask; }
    
    // TODO(threads): this is very inefficient, we can pass along a root task,
    // and ideally do not need this once thread support is in place
    getRootTask() {
      let currentSubtask = this.getParentSubtask();
      let task = this;
      while (currentSubtask) {
        task = currentSubtask.getParentTask();
        currentSubtask = task.getParentSubtask();
      }
      return task;
    }
    
    setPostReturnFn(f) {
      if (!f) { return; }
      if (this.#postReturnFn) { throw new Error('postReturn fn can only be set once'); }
      this.#postReturnFn = f;
    }
    
    setCallbackFn(f, name) {
      if (!f) { return; }
      if (this.#callbackFn) { throw new Error('callback fn can only be set once'); }
      this.#callbackFn = f;
      this.#callbackFnName = name;
    }
    
    getCallbackFnName() {
      if (!this.#callbackFnName) { return undefined; }
      return this.#callbackFnName;
    }
    
    async runCallbackFn(...args) {
      if (!this.#callbackFn) { throw new Error('no callback function has been set for task'); }
      return _withGlobalCurrentTaskMetaAsync({
        taskID: this.#id,
        componentIdx: this.#componentIdx,
        fn: () => { return this.#callbackFn.apply(null, args); }
      });
    }
    
    getCalleeParams() {
      if (!this.#getCalleeParamsFn) { throw new Error('missing/invalid getCalleeParamsFn'); }
      return this.#getCalleeParamsFn();
    }
    
    mayBlock() { return this.isAsync() || this.isResolvedState() }
    
    mayEnter(task) {
      const cstate = getOrCreateAsyncState(this.#componentIdx);
      if (cstate.hasBackpressure()) {
        _debugLog('[AsyncTask#mayEnter()] disallowed due to backpressure', { taskID: this.#id });
        return false;
      }
      if (!cstate.callingSyncImport()) {
        _debugLog('[AsyncTask#mayEnter()] disallowed due to sync import call', { taskID: this.#id });
        return false;
      }
      const callingSyncExportWithSyncPending = cstate.callingSyncExport && !task.isAsync;
      if (!callingSyncExportWithSyncPending) {
        _debugLog('[AsyncTask#mayEnter()] disallowed due to sync export w/ sync pending', { taskID: this.#id });
        return false;
      }
      return true;
    }
    
    enterSync() {
      if (this.needsExclusiveLock()) {
        const cstate = getOrCreateAsyncState(this.#componentIdx);
        if (!cstate.isExclusivelyLocked()) {
          cstate.exclusiveLock(this.#id);
        } else {
          // A host-called sync export arriving while another
          // task's slice holds the lock: synchronous entry
          // cannot wait, and historically this entry silently
          // stole the hold. Run without the lock instead --
          // the holder's bookkeeping stays intact and its
          // release still pairs
          this.#lockFreeEntry = true;
          _debugLog('[AsyncTask#enterSync()] entering without exclusive lock', {
            taskID: this.#id,
            componentIdx: this.#componentIdx,
          });
        }
      }
      return true;
    }
    
    async enter(opts) {
      _debugLog('[AsyncTask#enter()] args', {
        taskID: this.#id,
        componentIdx: this.#componentIdx,
        subtaskID: this.getParentSubtask()?.id(),
        args: opts,
        entryFnName: this.#entryFnName,
      });
      
      if (this.#entered) {
        throw new Error(`task with ID [${this.#id}] should not be entered twice`);
      }
      
      // If cancellation was requested before the task was entered, resolve
      // as cancelled without ever running guest code
      if (this.deliverPendingCancel({ cancellable: true })) {
        this.cancel();
        return false;
      }
      
      const cstate = getOrCreateAsyncState(this.#componentIdx);
      
      if (opts?.isHost) {
        this.#entered = true;
        return this.#entered;
      }
      
      // NOTE: concurrent task lifetimes within one component instance are
      // permitted by the Component Model: entry is governed by the
      // backpressure and exclusive-lock checks below (the lock is held per
      // execution slice, not for the task's lifetime).
      //
      // Serializing entire task lifetimes here (the former "execution slot" queue)
      // deadlocks pipelines where a parked long-lived task's progress depends on a
      // later entry into the same component.
      
      // If a task is synchronous then we can avoid component-relevant
      // tracking and immediately enter.
      if (this.isSync()) {
        this.#entered = true;
        
        // TODO(breaking): remove once manually-specifying async fns is removed
        // It is currently possible for an actually sync export to be specified
        // as async via JSPI
        if (this.#isManualAsync) {
          if (this.needsExclusiveLock()) { await cstate.acquireExclusiveLock(this.#id); }
        }
        
        return this.#entered;
      }
      
      // Perform intial backpressure check
      if (cstate.hasBackpressure()) {
        cstate.addBackpressureWaiter();
        
        const result = await this.waitUntil({
          readyFn: () => {
            return !cstate.hasBackpressure();
          },
          cancellable: true,
        });
        
        cstate.removeBackpressureWaiter();
        
        if (result === AsyncTask.BlockResult.CANCELLED) {
          this.cancel();
          return false;
        }
      }
      
      // Acquire the per-slice exclusive lock (FIFO-queued when
      // contended); the first slice runs under this hold and the
      // driver loop releases/re-acquires it per slice thereafter.
      if (this.needsExclusiveLock()) {
        await cstate.acquireExclusiveLock(this.#id);
      }
      
      this.#entered = true;
      return this.#entered;
    }
    
    isRunningState() { return this.#state !== AsyncTask.State.RESOLVED; }
    isResolvedState() { return this.#state === AsyncTask.State.RESOLVED; }
    isResolved() { return this.#state === AsyncTask.State.RESOLVED; }
    isExited() { return this.#exited; }
    
    async waitUntil(opts) {
      const { readyFn, cancellable } = opts;
      _debugLog('[AsyncTask#waitUntil()] args', { taskID: this.#id, args: { cancellable } });
      
      // TODO(fix): check for cancel
      // TODO(fix): determinism
      // TODO(threads): add this thread to waiting list
      
      const keepGoing = await this.suspendUntil({
        readyFn,
        cancellable,
      });
      
      return keepGoing;
    }
    
    async yieldUntil(opts) {
      const { readyFn, cancellable } = opts;
      _debugLog('[AsyncTask#yieldUntil()]', {
        taskID: this.#id,
        args: {
          cancellable,
        },
        componentIdx: this.#componentIdx,
      });
      
      const keepGoing = await this.suspendUntil({ readyFn, cancellable });
      if (keepGoing) {
        return {
          code: ASYNC_EVENT_CODE.NONE,
          payload0: 0,
          payload1: 0,
        };
      }
      
      return {
        code: ASYNC_EVENT_CODE.TASK_CANCELLED,
        payload0: 0,
        payload1: 0,
      };
    }
    
    async suspendUntil(opts) {
      const { cancellable, readyFn } = opts;
      _debugLog('[AsyncTask#suspendUntil()] args', {
        taskID: this.#id,
        args: {
          cancellable,
        },
        componentIdx: this.#componentIdx,
      });
      
      const pendingCancelled = this.deliverPendingCancel({ cancellable });
      if (pendingCancelled) { return false; }
      
      const completed = await this.immediateSuspendUntil({ readyFn, cancellable });
      return completed;
    }
    
    // TODO(threads): equivalent to thread.suspend_until()
    async immediateSuspendUntil(opts) {
      const { cancellable, readyFn } = opts;
      _debugLog('[AsyncTask#immediateSuspendUntil()] args', {
        args: {
          cancellable,
          readyFn,
        },
        taskID: this.#id,
        componentIdx: this.#componentIdx,
      });
      
      const ready = readyFn();
      if (ready && ASYNC_DETERMINISM === 'random') {
        const coinFlip = _coinFlip();
        if (coinFlip) { return true }
      }
      
      const keepGoing = await this.immediateSuspend({ cancellable, readyFn });
      return keepGoing;
    }
    
    async immediateSuspend(opts) { // NOTE: equivalent to thread.suspend()
    // TODO(threads): store readyFn on the thread
    const { cancellable, readyFn } = opts;
    _debugLog('[AsyncTask#immediateSuspend()] args', { cancellable, readyFn });
    
    const pendingCancelled = this.deliverPendingCancel({ cancellable });
    if (pendingCancelled) { return false; }
    
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    const keepGoing = await cstate.suspendTask({
      task: this,
      readyFn: () => {
        // A pending cancellation request wakes cancellable waits
        if (cancellable && this.#state === AsyncTask.State.CANCEL_PENDING) {
          return true;
        }
        return readyFn();
      },
    });
    if (keepGoing && this.deliverPendingCancel({ cancellable })) { return false; }
    return keepGoing;
  }
  
  deliverPendingCancel(opts) {
    const { cancellable } = opts;
    _debugLog('[AsyncTask#deliverPendingCancel()]', {
      args: { cancellable },
      taskID: this.#id,
      componentIdx: this.#componentIdx,
    });
    
    if (cancellable && this.#state === AsyncTask.State.CANCEL_PENDING) {
      this.#state = AsyncTask.State.CANCEL_DELIVERED;
      return true;
    }
    
    return false;
  }
  
  isCancelled() { return this.cancelled }
  
  // Request cooperative cancellation of this task, called on behalf of a
  // supertask performing `subtask.cancel` on the subtask this task backs.
  //
  // The request is delivered at this task's next cancellable wait
  // (see suspendUntil/immediateSuspend), at which point the task is
  // expected to acknowledge via `task.cancel` or still resolve via
  // `task.return`.
  requestCancellation() {
    _debugLog('[AsyncTask#requestCancellation()] args', {
      taskID: this.#id,
      componentIdx: this.#componentIdx,
      state: this.#state,
    });
    if (this.isResolvedState() || this.cancelRequested) { return; }
    this.cancelRequested = true;
    if (this.#state === AsyncTask.State.INITIAL) {
      this.#state = AsyncTask.State.CANCEL_PENDING;
    }
    // Nudge the component's tick loop so that any suspended cancellable
    // wait observes the pending cancellation promptly
    getOrCreateAsyncState(this.#componentIdx).runTickLoop();
  }
  
  cancel(args) {
    _debugLog('[AsyncTask#cancel()] args', { });
    if (this.taskState() !== AsyncTask.State.CANCEL_DELIVERED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}] invalid task state [${this.taskState()}] for cancellation`);
    }
    if (this.borrowedHandles.length > 0) { throw new Error('task still has borrow handles'); }
    this.cancelled = true;
    // Cancelled tasks resolve with no value (spec: `Task.cancel` calls
    // `on_resolve(None)`); an explicit error is only present on the
    // host-driven rejection path (see `reject()`).
    this.onResolve(args?.error ?? null);
    this.#state = AsyncTask.State.RESOLVED;
  }
  
  onResolve(taskValue) {
    const handlers = this.#onResolveHandlers;
    this.#onResolveHandlers = [];
    for (const f of handlers) {
      try {
        f(taskValue);
      } catch (err) {
        _debugLog("[AsyncTask#onResolve] error during task resolve handler", err);
        throw err;
      }
    }
    
    // Rejections are control-flow failures, not canonical ABI results.
    // Propagate them through the subtask chain without running return
    // lowering or post-return hooks for a successful result.
    if (this.#rejected) {
      this.#parentSubtask?.reject(taskValue);
      return;
    }
    
    // NOTE: if the parent subtask has already been resolved (e.g. it was
    // cancelled via `subtask.cancel` while this task was still pending),
    // this task's resolution must be discarded rather than delivered.
    const parentSubtaskPending = this.#parentSubtask && !this.#parentSubtask.isResolved();
    
    if (parentSubtaskPending) {
      const meta = this.#parentSubtask.getCallMetadata();
      // Run the rturn fn if it has not already been called -- this *should* have happened in
      // `task.return`, but some paths do not go through task.return (e.g. async lower of sync fn
      // which goes through prepare + async-start-call)
      if (meta.returnFn && !meta.returnFnCalled) {
        _debugLog('[AsyncTask#onResolve()] running returnFn', {
          componentIdx: this.#componentIdx,
          taskID: this.#id,
          subtaskID: this.#parentSubtask.id(),
        });
        const callerTask = this.#parentSubtask.getParentTask();
        _withGlobalCurrentTaskMeta({
          taskID: callerTask.id(),
          componentIdx: callerTask.componentIdx(),
          fn: () => meta.returnFn.apply(null, [taskValue, meta.resultPtr]),
        });
        meta.returnFnCalled = true;
      }
    }
    
    if (this.#postReturnFn) {
      _debugLog('[AsyncTask#onResolve()] running post return ', {
        componentIdx: this.#componentIdx,
        taskID: this.#id,
      });
      try {
        _withGlobalCurrentTaskMeta({
          taskID: this.#id,
          componentIdx: this.#componentIdx,
          fn: () => this.#postReturnFn(taskValue),
        });
      } catch (err) {
        _debugLog("[AsyncTask#onResolve] error during task resolve handler", err);
        throw err;
      }
    }
    
    if (parentSubtaskPending) {
      this.#parentSubtask.onResolve(taskValue);
    }
  }
  
  registerOnResolveHandler(f) {
    this.#onResolveHandlers.push(f);
  }
  
  isRejected() { return this.#rejected; }
  
  isErrored() { return this.#errored; }
  setErrored(err) { this.#errored = err; }
  
  reject(taskErr) {
    _debugLog('[AsyncTask#reject()] args', {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
      parentSubtask: this.#parentSubtask,
      parentSubtaskID: this.#parentSubtask?.id(),
      entryFnName: this.entryFnName(),
      callbackFnName: this.#callbackFnName,
      errMsg: taskErr.message,
    });
    
    if (this.isResolvedState() || this.#rejected) { return; }
    
    this.#rejected = true;
    this.cancelRequested = true;
    this.#state = AsyncTask.State.CANCEL_PENDING;
    const cancelled = this.deliverPendingCancel({ cancellable: true });
    
    // TODO: do cleanup here to reset the machinery so we can run again?
    
    this.cancel({ error: taskErr });
  }
  
  resolve(results) {
    _debugLog('[AsyncTask#resolve()] args', {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
      entryFnName: this.entryFnName(),
      callbackFnName: this.#callbackFnName,
    });
    
    if (this.#state === AsyncTask.State.RESOLVED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}]  is already resolved (did you forget to wait for an import?)`);
    }
    
    if (this.borrowedHandles.length > 0) {
      throw new Error('task still has borrow handles');
    }
    
    this.#state = AsyncTask.State.RESOLVED;
    
    switch (results.length) {
      case 0:
      this.onResolve(undefined);
      break;
      case 1:
      this.onResolve(results[0]);
      break;
      default:
      _debugLog('[AsyncTask#resolve()] unexpected number of results', {
        componentIdx: this.#componentIdx,
        results,
        taskID: this.#id,
        subtaskID: this.#parentSubtask?.id(),
        entryFnName: this.#entryFnName,
        callbackFnName: this.#callbackFnName,
      });
      throw new Error('unexpected number of results');
    }
  }
  
  exit(args) {
    _debugLog('[AsyncTask#exit()]', {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
    });
    
    if (this.#exited)  { throw new Error("task has already exited"); }
    
    if (this.#state !== AsyncTask.State.RESOLVED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}] exited without resolution`);
    }
    
    if (this.borrowedHandles > 0) {
      throw new Error('task [${this.#id}] exited without clearing borrowed handles');
    }
    
    const state = getOrCreateAsyncState(this.#componentIdx);
    if (!state) { throw new Error('missing async state for component [' + this.#componentIdx + ']'); }
    
    // Exempt the host from exclusive lock check
    if (this.#componentIdx !== -1 && !args?.skipExclusiveLockCheck && !this.#lockFreeEntry) {
      if (this.needsExclusiveLock() && !state.exclusivelyLockedBy(this.#id)) {
        throw new Error(`task [${this.#id}] exit: component [${this.#componentIdx}] should have been exclusively locked by it`);
      }
    }
    
    // Ownership-checked: releases only this task's own hold (a
    // task exiting while another task's slice holds the lock no
    // longer clears the foreign hold).
    state.exclusiveRelease(this.#id);
    
    for (const f of this.#onExitHandlers) {
      try {
        f();
      } catch (err) {
        console.error("error during task exit handler", err);
        throw err;
      }
    }
    
    this.#exited = true;
    clearCurrentTask(this.#componentIdx, this.id());
  }
  
  needsExclusiveLock() {
    // Host (-1) tasks model host-side import handling: there is no
    // guest linear memory or executor state to protect, and host
    // calls from unrelated guest components would contend spuriously.
    if (this.#componentIdx === -1) { return false; }
    // Import-handler tasks (CallInterface) run host code nested
    // inside the calling guest slice, which already holds the
    // lock; only tasks that execute guest slices need it.
    if (!this.#callingWasmExport) { return false; }
    return !this.#isAsync || this.hasCallback();
  }
  
  createSubtask(args) {
    _debugLog('[AsyncTask#createSubtask()] args', args);
    const { componentIdx, childTask, callMetadata, fnName, isAsync, isManualAsync } = args;
    
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    if (!cstate) {
      throw new Error(`invalid/missing async state for component idx [${componentIdx}]`);
    }
    
    const waitable = new Waitable({
      componentIdx: this.#componentIdx,
      target: `subtask (internal ID [${this.#id}])`,
    });
    
    const newSubtask = new AsyncSubtask({
      componentIdx,
      childTask,
      parentTask: this,
      callMetadata,
      isAsync,
      isManualAsync,
      fnName,
      waitable,
    });
    this.#subtasks.push(newSubtask);
    newSubtask.setTarget(`subtask (internal ID [${newSubtask.id()}], waitable [${waitable.idx()}], component [${componentIdx}])`);
    waitable.setIdx(cstate.handles.insert(newSubtask));
    waitable.setTarget(`waitable for subtask (waitable id [${waitable.idx()}], subtask internal ID [${newSubtask.id()}])`);
    return newSubtask;
  }
  
  getLatestSubtask() {
    return this.#subtasks.at(-1);
  }
  
  getSubtaskByWaitableRep(rep) {
    if (rep === undefined) { throw new TypeError('missing rep'); }
    return this.#subtasks.find(s => s.waitableRep() === rep);
  }
  
  currentSubtask() {
    _debugLog('[AsyncTask#currentSubtask()]');
    if (this.#subtasks.length === 0) { return undefined; }
    return this.#subtasks.at(-1);
  }
  
  removeSubtask(subtask) {
    if (this.#subtasks.length === 0) {
      throw new Error('cannot end current subtask: no current subtask');
    }
    this.#subtasks = this.#subtasks.filter(t => t !== subtask);
    return subtask;
  }
}

function createNewCurrentTask(args) {
  _debugLog('[createNewCurrentTask()] args', args);
  const {
    componentIdx,
    isAsync,
    isManualAsync,
    preserveFutureResult,
    entryFnName,
    parentSubtaskID,
    callbackFnName,
    getCallbackFn,
    getParamsFn,
    stringEncoding,
    errHandling,
    getCalleeParamsFn,
    resultPtr,
    callingWasmExport,
  } = args;
  if (componentIdx === undefined || componentIdx === null) {
    throw new Error('missing/invalid component instance index while starting task');
  }
  let taskMetas = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx);
  const callbackFn = getCallbackFn ? getCallbackFn() : null;
  
  const newTask = new AsyncTask({
    componentIdx,
    isAsync,
    isManualAsync,
    preserveFutureResult,
    entryFnName,
    callbackFn,
    callbackFnName,
    stringEncoding,
    getCalleeParamsFn,
    resultPtr,
    errHandling,
    callingWasmExport,
  });
  
  const newTaskID = newTask.id();
  const newTaskMeta = { id: newTaskID, componentIdx, task: newTask };
  
  // NOTE: do not track host tasks
  ASYNC_CURRENT_TASK_IDS.push(newTaskID);
  ASYNC_CURRENT_COMPONENT_IDXS.push(componentIdx);
  
  if (!taskMetas) {
    taskMetas = [newTaskMeta];
    ASYNC_TASKS_BY_COMPONENT_IDX.set(componentIdx, [newTaskMeta]);
  } else {
    taskMetas.push(newTaskMeta);
  }
  
  return [newTask, newTaskID];
}

function _checkMayLeave(componentIdx) {
  if (INSTANCE_FLAGS.get(componentIdx)?.value !== 1) {
    throw new WebAssemblyRuntimeError('cannot leave component instance');
  }
}

function _getGlobalCurrentTaskMeta(componentIdx) {
  if (componentIdx === null || componentIdx === undefined) {
    throw new Error("missing/invalid component idx");
  }
  const v = CURRENT_TASK_META[componentIdx];
  if (v === undefined || v === null) {
    return undefined;
  }
  return { ...v };
}


function _setGlobalCurrentTaskMeta(args) {
  if (!args) { throw new TypeError('args missing'); }
  if (args.taskID === undefined) { throw new TypeError('missing task ID'); }
  if (args.componentIdx === undefined) { throw new TypeError('missing component idx'); }
  const { taskID, componentIdx } = args;
  return CURRENT_TASK_META[componentIdx] = { taskID, componentIdx };
}


async function _clearCurrentTask(args) {
  _debugLog('[_clearCurrentTask()] args', args);
  if (!args) { throw new TypeError('args missing'); }
  if (args.taskID === undefined) { throw new TypeError('missing task ID'); }
  if (args.componentIdx === undefined) { throw new TypeError('missing component idx'); }
  const { taskID, componentIdx } = args;
  
  const meta = CURRENT_TASK_META[componentIdx];
  if (!meta) { throw new Error(`missing current task meta for component idx [${componentIdx}]`); }
  
  if (meta.taskID !== taskID) {
    throw new Error(`task ID [${meta.taskID}] != requested ID [${taskID}]`);
  }
  if (meta.componentIdx !== componentIdx) {
    throw new Error(`component idx [${meta.componentIdx}] != requested idx [${componentIdx}]`);
  }
  
  CURRENT_TASK_META[componentIdx] = null;
}

function _lowerImportBackwardsCompat(args) {
  const params = [...arguments].slice(1);
  _debugLog('[_lowerImportBackwardsCompat()] args', { args, params });
  const {
    functionIdx,
    componentIdx,
    isAsync,
    isManualAsync,
    paramLiftFns,
    resultLowerFns,
    hasResultPointer,
    funcTypeIsAsync,
    metadata,
    memoryIdx,
    getMemoryFn,
    getReallocFn,
    importFn,
    stringEncoding,
  } = args;
  
  _checkMayLeave(componentIdx);
  
  let meta = _getGlobalCurrentTaskMeta(componentIdx);
  let createdTask;
  
  // Some components depend on initialization logic (i.e. `_initialize` or some such
  // core wasm export) that is embedded in the component, but is not executed or wizer'd
  // away before the transpiled component is attempted to be used.
  //
  // These components execut their initialization logic *when they are imported* in the
  // transpiled context -- so we may get a call to an export that is lowered without going
  // through `CallWasm` or `CallInterface`.
  //
  if (!meta) {
    if (funcTypeIsAsync || (isAsync && !isManualAsync)) {
      throw new Error('p3 async wasm exports cannot use backwards compat auto-task init');
    }
    
    const [newTask, newTaskID] = createNewCurrentTask({
      componentIdx,
      isAsync,
      isManualAsync,
      callingWasmExport: false,
    });
    createdTask = newTask;
    
    // Since we're managing the task creation ourselves we must clear ourselves
    createdTask.registerOnResolveHandler(() => {
      _clearCurrentTask({
        taskID: task.id(),
        componentIdx: task.componentIdx(),
      });
    });
    
    _setGlobalCurrentTaskMeta({
      componentIdx,
      taskID: newTaskID,
    });
    
    meta = _getGlobalCurrentTaskMeta(componentIdx);
  }
  
  const { taskID } = meta;
  
  const taskMeta = getCurrentTask(componentIdx, taskID);
  if (!taskMeta) {
    throw new Error('invalid/missing async task meta');
  }
  
  const task = taskMeta.task;
  if (!task) { throw new Error('invalid/missing async task'); }
  
  const cstate = getOrCreateAsyncState(componentIdx);
  
  if (!task.mayBlock() && funcTypeIsAsync && !isAsync) {
    throw new Error("non async exports cannot synchronously call async functions");
  }
  
  // If there is an existing task, this should be part of a subtask
  const memory = getMemoryFn();
  // Canonical ABI lower appends result storage as a trailing
  // param when async lower has any flat result, or sync lower
  // has more than one flat result.
  const resultPtr = hasResultPointer ? params[params.length - 1] : undefined;
  const subtask = task.createSubtask({
    componentIdx,
    parentTask: task,
    fnName: importFn.fnName,
    isAsync,
    isManualAsync,
    callMetadata: {
      memoryIdx,
      memory,
      realloc: getReallocFn?.(),
      getReallocFn,
      resultPtr,
      lowers: resultLowerFns,
      stringEncoding,
    }
  });
  task.setReturnMemoryIdx(memoryIdx);
  task.setReturnMemory(getMemoryFn());
  
  subtask.onStart();
  
  // If dealing with a sync lowered sync function, we can directly return results
  //
  // TODO(breaking): remove once we get rid of manual async import specification,
  // as func types cannot be detected in that case only (and we don't need that w/ p3)
  if (!isManualAsync && !isAsync && !funcTypeIsAsync) {
    if (createdTask) { createdTask.enterSync(); }
    
    const res = importFn(...params);
    
    // TODO(breaking): remove once we get rid of manual async import specification,
    // as func types cannot be detected in that case only (and we don't need that w/ p3)
    if (!funcTypeIsAsync && !subtask.isReturned()) {
      throw new Error('post-execution subtasks must either be async or returned');
    }
    
    const syncRes = subtask.getResult();
    if (createdTask) { createdTask.resolve([syncRes]); }
    
    return syncRes;
  }
  
  // Sync-lowered async functions requires async behavior because the callee *can* block,
  // but this call must *act* synchronously and return immediately with the result
  // (i.e. not returning until the work is done)
  //
  // TODO(breaking): remove checking for manual async specification here, once we can go p3-only
  //
  if (!isManualAsync && !isAsync && funcTypeIsAsync) {
    const { promise, resolve, reject } = promiseWithResolvers();
    queueMicrotask(async () => {
      try {
        await importFn(...params);
        if (!subtask.isResolved()) {
          await task.suspendUntil({ readyFn: () => subtask.isResolved() });
        }
        resolve(subtask.getResult());
      } catch (err) {
        reject(err);
      }
    });
    return promise;
  }
  
  // NOTE: at this point we know that we are working with an async lowered import
  
  const subtaskState = subtask.getStateNumber();
  if (subtaskState < 0 || subtaskState >= 2**4) {
    throw new Error('invalid subtask state, out of valid range');
  }
  
  subtask.setOnProgressFn(() => {
    subtask.setPendingEvent(() => {
      if (subtask.isResolved()) { subtask.deliverResolve(); }
      const event = {
        code: ASYNC_EVENT_CODE.SUBTASK,
        payload0: subtask.waitableRep(),
        payload1: subtask.getStateNumber(),
      }
      return event;
    });
  });
  
  // This is a hack to maintain backwards compatibility with
  // manually-specified async imports, used in wasm exports that are
  // not actually async (but are specified as so).
  //
  // This is not normal p3 sync behavior but instead anticipating that
  // the caller that is doing manual async will be waiting for a promise that
  // resolves to the *actual* result.
  //
  // TODO(breaking): remove once manually specified async is removed
  //
  // There are a few cases:
  // 1. sync function with async types (e.g. `f: func() -> stream<u32>`)
  // 2. async function with async types (e.g. `f: async func() -> stream<u32>`)
  // 3. async function with sync types (e.g. `f: async func() -> list<u32>`)
  // 4. sync function with non-async types (e.g. `f: func() -> list<u32>`)
  //
  // This hack *only* applies to 4 -- the case where an async JS host function
  // is supplied to a Wasm export which does *not* need to do any async abi
  // lifting/lowering (async ABI did not exist when JSPI integratiton was
  // initially merged to enable asynchronously returning values from the host)
  //
  const requiresManualAsyncResult = !isAsync && !funcTypeIsAsync && isManualAsync;
  let manualAsyncResult;
  if (requiresManualAsyncResult) {
    manualAsyncResult = promiseWithResolvers();
  }
  
  queueMicrotask(async () => {
    try {
      _debugLog('[_lowerImportBackwardsCompat()] calling lowered import', { importFn, params });
      if (createdTask) { await createdTask.enter(); }
      
      const asyncRes = await importFn(...params);
      if (requiresManualAsyncResult) {
        manualAsyncResult.resolve(subtask.getResult());
      }
      
      if (createdTask) { createdTask.resolve([asyncRes]); }
      
      
    } catch (err) {
      _debugLog("[_lowerImportBackwardsCompat()] import fn error:", err);
      if (requiresManualAsyncResult) {
        manualAsyncResult.reject(err);
        return;
      }
      task.setErrored(err);
      task.reject(err);
    }
  });
  
  if (requiresManualAsyncResult) { return manualAsyncResult.promise; }
  
  _debugLog('[_lowerImportBackwardsCompat()] async-lowered import return', {
    fnName: importFn.fnName,
    componentIdx,
    subtaskID: subtask.id(),
    waitableRep: subtask.waitableRep(),
    subtaskState,
    packedResult: Number(subtask.waitableRep()) << 4 | subtaskState,
  });
  
  return Number(subtask.waitableRep()) << 4 | subtaskState;
}

const CURRENT_TASK_MAY_BLOCK= WebAssembly ? new WebAssembly.Global({ value: 'i32', mutable: true }, 0) : false;

let SYMMETRIC_SYNC_GUEST_CALL_STACK = [];

function _symmetricSyncGuestCallEnter(callerComponentIdx, calleeIsAsync, calleeComponentIdx) {
  _debugLog('[_symmetricSyncGuestCallEnter()] args', {
    callerComponentIdx,
    calleeIsAsync,
    calleeComponentIdx
  });
  
  const cstate = getOrCreateAsyncState(calleeComponentIdx);
  
  if (calleeIsAsync) { throw new Error('symmetric sync guest->guest call should not be async'); }
  
  const callerTaskMeta = getCurrentTask(callerComponentIdx);
  if (!callerTaskMeta) { throw new Error('missing current caller task metadata'); }
  const callerTask = callerTaskMeta.task;
  if (!callerTask) { throw new Error('missing current caller task'); }
  
  const subtask = callerTask.createSubtask({
    componentIdx: callerComponentIdx,
    parentTask: callerTask,
    isAsync: !!calleeIsAsync,
  });
  
  const [newTask, newTaskID] = createNewCurrentTask({
    componentIdx: calleeComponentIdx,
    isAsync: !!calleeIsAsync,
    entryFnName: [
    'task',
    callerTask.id(),
    'subtask',
    subtask.id(),
    'task',
    'new-sync-guest-task',
    ].join("/"),
  });
  
  subtask.setChildTask(newTask);
  newTask.setParentSubtask(subtask);
  
  subtask.onStart();
  
  const finishEnter = () => {
    _setGlobalCurrentTaskMeta({
      taskID: newTask.id(),
      componentIdx: newTask.componentIdx(),
    });
    SYMMETRIC_SYNC_GUEST_CALL_STACK.push({
      componentIdx: newTask.componentIdx(),
    });
    
    _debugLog('[_symmetricSyncGuestCallEnter()] finished preparing', {
      callerComponentIdx,
      calleeComponentIdx,
      subtaskID: subtask.id(),
      newTaskID: newTask.id(),
    });
  };
  
  // Take the callee's per-slice exclusive lock. Uncontended entry
  // stays fully synchronous (returning a non-promise means the
  // Suspending-wrapped trampoline does not suspend, so pure-sync
  // compositions keep working without WebAssembly.promising).
  // Contended entry queues FIFO on the holder instead of silently
  // stealing the hold; the returned
  // promise suspends the caller's (JSPI) stack until ownership.
  if (!newTask.needsExclusiveLock()) {
    finishEnter();
    return;
  }
  if (!cstate.isExclusivelyLocked()) {
    cstate.exclusiveLock(newTask.id());
    finishEnter();
    return;
  }
  return cstate.acquireExclusiveLock(newTask.id()).then(finishEnter);
}

function _symmetricSyncGuestCallExit() {
  const { componentIdx } = SYMMETRIC_SYNC_GUEST_CALL_STACK.pop();
  const cstate = getOrCreateAsyncState(componentIdx);
  
  const taskMeta = getCurrentTask(componentIdx);
  if (!taskMeta) { throw new Error('missing current caller task metadata'); }
  const task = taskMeta.task;
  if (!task) { throw new Error('missing current caller task'); }
  
  _debugLog('[_symmetricSyncGuestCallExit()] exiting', {
    componentIdx,
    taskID: task.id(),
    subtask: task.getParentSubtask(),
    subtaskID: task.getParentSubtask()?.id(),
    parent: task.getParentSubtask()?.getParentTask(),
  });
  
  task.resolve([]);
  task.exit();
  
  _clearCurrentTask({
    taskID: task.id(),
    componentIdx: task.componentIdx(),
  });
}

function _liftFlatU8(ctx) {
  _debugLog('[_liftFlatU8()] args', { ctx });
  let val;
  
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) { throw new Error('expected at least a single i32 argument'); }
    val = ctx.params[0];
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  
  if (ctx.storageLen !== undefined && ctx.storageLen < 1) {
    throw new Error(`insufficient storage ([${ctx.storageLen}] bytes) for lift (u8 requires 1 byte)`);
  }
  
  val = new DataView(ctx.memory.buffer).getUint8(ctx.storagePtr, true);
  
  ctx.storagePtr += 1;
  if (ctx.storageLen !== undefined) { ctx.storageLen -= 1; }
  
  return [val, ctx];
}


function _liftFlatU16(ctx) {
  _debugLog('[_liftFlatU16()] args', { ctx });
  let val;
  
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) { throw new Error('expected at least a single i32 argument'); }
    val = ctx.params[0];
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  
  if (ctx.storageLen !== undefined && ctx.storageLen < 2) {
    throw new Error(`insufficient storage ([${ctx.storageLen}] bytes) for lift (u16 requires 2 bytes)`);
  }
  
  val = new DataView(ctx.memory.buffer).getUint16(ctx.storagePtr, true);
  
  ctx.storagePtr += 2;
  if (ctx.storageLen !== undefined) { ctx.storageLen -= 2; }
  
  const rem = ctx.storagePtr % 2;
  if (rem !== 0) { ctx.storagePtr += (2 - rem); }
  
  return [val, ctx];
}


function _liftFlatU32(ctx) {
  _debugLog('[_liftFlatU32()] args', { ctx });
  let val;
  
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) { throw new Error('expected at least a single i34 argument'); }
    // core i32 values arrive as signed numbers
    val = ctx.params[0] >>> 0;
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  
  if (ctx.storageLen !== undefined && ctx.storageLen < 4) {
    throw new Error(`insufficient storage ([${ctx.storageLen}] bytes) for lift (u32 requires 4 bytes)`);
  }
  val = new DataView(ctx.memory.buffer).getUint32(ctx.storagePtr, true);
  ctx.storagePtr += 4;
  if (ctx.storageLen !== undefined) { ctx.storageLen -= 4; }
  
  return [val, ctx];
}


function _liftFlatU64(ctx) {
  _debugLog('[_liftFlatU64()] args', { ctx });
  let val;
  
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) { throw new Error('expected at least one single i64 argument'); }
    if (typeof ctx.params[0] !== 'bigint') { throw new Error('expected bigint'); }
    // core i64 values arrive as signed BigInts
    val = BigInt.asUintN(64, ctx.params[0]);
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  
  if (ctx.storageLen !== undefined && ctx.storageLen < 8) {
    throw new Error(`insufficient storage ([${ctx.storageLen}] bytes) for lift (u64 requires 8 bytes)`);
  }
  
  val = new DataView(ctx.memory.buffer).getBigUint64(ctx.storagePtr, true);
  ctx.storagePtr += 8;
  if (ctx.storageLen !== undefined) { ctx.storageLen -= 8; }
  
  return [val, ctx];
}


function _liftFlatStringUTF8(ctx) {
  _debugLog('[_liftFlatStringUTF8()] args', { ctx });
  let val;
  
  if (ctx.useDirectParams) {
    if (ctx.params.length < 2) { throw new Error('expected at least two u32 arguments'); }
    let offset = ctx.params[0];
    if (typeof offset === 'bigint') { offset = Number(offset); }
    if (!Number.isSafeInteger(offset)) { throw new Error('invalid offset'); }
    const len = ctx.params[1];
    if (!Number.isSafeInteger(len)) {  throw new Error('invalid len'); }
    val = TEXT_DECODER_UTF8.decode(new DataView(ctx.memory.buffer, offset, len));
    ctx.params = ctx.params.slice(2);
    return [val, ctx];
  }
  
  const rem = ctx.storagePtr % 4;
  if (rem !== 0) { ctx.storagePtr += (4 - rem); }
  
  const dv = new DataView(ctx.memory.buffer);
  const start = dv.getUint32(ctx.storagePtr, true);
  const codeUnits = dv.getUint32(ctx.storagePtr + 4, true);
  
  val = TEXT_DECODER_UTF8.decode(new Uint8Array(ctx.memory.buffer, start, codeUnits));
  
  ctx.storagePtr += 8;
  if (ctx.storageLen !== undefined) { ctx.storagelen -= 8; }
  
  return [val, ctx];
}

function _liftFlatStringUTF16(ctx) {
  _debugLog('[_liftFlatStringUTF16()] args', { ctx });
  let val;
  
  if (ctx.useDirectParams) {
    if (ctx.params.length < 2) { throw new Error('expected at least two u32 arguments'); }
    let offset = ctx.params[0];
    if (typeof offset === 'bigint') { offset = Number(offset); }
    if (!Number.isSafeInteger(offset)) {  throw new Error('invalid offset'); }
    const len = ctx.params[1];
    if (!Number.isSafeInteger(len)) {  throw new Error('invalid len'); }
    val = utf16Decoder.decode(new DataView(ctx.memory.buffer, offset, len));
    ctx.params = ctx.params.slice(2);
    return [val, ctx];
  }
  
  const data = new DataView(ctx.memory.buffer)
  const start = data.getUint32(ctx.storagePtr, vals[0], true);
  const codeUnits = data.getUint32(ctx.storagePtr, vals[0] + 4, true);
  val = utf16Decoder.decode(new Uint16Array(ctx.memory.buffer, start, codeUnits));
  ctx.storagePtr = ctx.storagePtr + 2 * codeUnits;
  if (ctx.storageLen !== undefined) { ctx.storageLen = ctx.storageLen - 2 * codeUnits }
  
  return [val, ctx];
}

function _liftFlatStringAny(ctx) {
  switch (ctx.stringEncoding) {
    case 'utf8':
    return _liftFlatStringUTF8(ctx);
    case 'utf16':
    return _liftFlatStringUTF16(ctx);
    default:
    throw new Error(`missing/unrecognized/unsupported string encoding [${ctx.stringEncoding}]`);
  }
}

const _liftFlatVariantScratch = new DataView(new ArrayBuffer(8));

function _liftFlatVariant(meta) {
  const {
    caseMetas,
    variantSize32,
    variantAlign32,
    variantPayloadOffset32,
    variantFlatCount,
    variantPayloadFlatTypes,
    isEnum,
  } = meta;
  
  return function _liftFlatVariantInner(ctx) {
    _debugLog('[_liftFlatVariant()] args', { ctx });
    const origUseParams = ctx.useDirectParams;
    
    let caseIdx;
    let liftRes;
    const originalPtr = ctx.storagePtr;
    const numCases =  caseMetas.length;
    if (caseMetas.length < 256) {
      liftRes = _liftFlatU8(ctx);
    } else if (numCases >= 256 && numCases < 65536) {
      liftRes = _liftFlatU16(ctx);
    } else if (numCases >= 65536 && numCases < 4_294_967_296) {
      liftRes = _liftFlatU32(ctx);
    } else {
      throw new Error(`unsupported number of variant cases [${numCases}]`);
    }
    caseIdx = liftRes[0];
    ctx = liftRes[1];
    
    const [
    tag,
    liftFn,
    caseSize32,
    caseAlign32,
    caseFlatCount,
    caseFlatTypes,
    ] = caseMetas[caseIdx];
    
    if (variantPayloadOffset32 === undefined) {
      throw new Error('unexpectedly missing payload offset');
    }
    
    if (originalPtr !== undefined) {
      ctx.storagePtr = originalPtr + variantPayloadOffset32;
    }
    
    let val;
    if (liftFn === null) {
      val = { tag };
      // NOTE: here we need to move past the entire object in memory
      // despite moving to the payload which we now know is missing/unnecessary
      if (originalPtr !== undefined) {
        ctx.storagePtr = originalPtr + variantSize32;
      }
    } else {
      // When lifting from direct params, the payload arrives as the
      // *join* of all case flat representations: each slot whose
      // joined core type differs from the selected case's core type
      // must be reinterpreted before the payload lift
      // (see CanonicalABI `lift_flat_variant`)
      if (ctx.useDirectParams) {
        if (!variantPayloadFlatTypes || !caseFlatTypes) {
          throw new Error('missing variant flat type metadata during direct-param lift');
        }
        const scratch = _liftFlatVariantScratch;
        for (let i = 0; i < caseFlatTypes.length; i++) {
          const have = variantPayloadFlatTypes[i];
          const want = caseFlatTypes[i];
          if (have === want) { continue; }
          const val = ctx.params[i];
          if (have === 'i64' && want === 'i32') {
            ctx.params[i] = Number(BigInt.asIntN(32, val));
          } else if (have === 'i64' && want === 'f32') {
            scratch.setInt32(0, Number(BigInt.asIntN(32, val)), true);
            ctx.params[i] = scratch.getFloat32(0, true);
          } else if (have === 'i64' && want === 'f64') {
            scratch.setBigInt64(0, val, true);
            ctx.params[i] = scratch.getFloat64(0, true);
          } else if (have === 'i32' && want === 'f32') {
            scratch.setInt32(0, val, true);
            ctx.params[i] = scratch.getFloat32(0, true);
          } else {
            throw new Error(`invalid variant payload coercion [${have}] -> [${want}]`);
          }
        }
      }
      
      const [newVal, newCtx] = liftFn(ctx);
      val = { tag, val: newVal };
      ctx = newCtx;
    }
    
    if (origUseParams) {
      if (variantFlatCount === undefined || variantFlatCount === null) {
        _debugLog('[_liftFlatVariant()] variant with unknown flat count', { ctx, meta });
        throw new Error('cannot lift variant with unknown flat count');
      }
      if (caseFlatCount === undefined || caseFlatCount === null) {
        _debugLog('[_liftFlatVariant()] case with unknown flat count', { ctx, meta, case: meta.caseMetas[caseIdx] });
        throw new Error('cannot lift case with unknown flat count');
      }
      // NOTE: enums can be tightly packed and do not have a descriminant
      const remainingPayloadParams = variantFlatCount - caseFlatCount - (isEnum ? 0 : 1);
      if (remainingPayloadParams < 0) {
        throw new Error(`invalid variant flat count metadata`);
      }
      if (ctx.params.length < remainingPayloadParams) {
        throw new Error(`expected at least [${remainingPayloadParams}] remaining variant payload params, but got [${ctx.params.length}]`);
      }
      ctx.params = ctx.params.slice(remainingPayloadParams);
    }
    
    if (ctx.storagePtr !== undefined) {
      const rem = ctx.storagePtr % variantAlign32;
      if (rem !== 0) { ctx.storagePtr += variantAlign32 - rem; }
    }
    
    return [val, ctx];
  }
}

function _liftFlatList(meta) {
  const { elemLiftFn, elemSize32, elemAlign32, knownLen, typedArray } = meta;
  
  const listValue =
  typedArray === undefined
  ? values => values
  : values => new typedArray(values);
  
  const readValuesAndReset = (ctx, originalPtr, originalLen, dataPtr, len) => {
    if (dataPtr % elemAlign32 !== 0) {
      throw new TypeError(`list pointer [${dataPtr}] is not aligned to ${elemAlign32}`);
    }
    ctx.storagePtr = dataPtr;
    const val = [];
    for (var i = 0; i < len; i++) {
      const elemPtr = dataPtr + i * elemSize32;
      ctx.storagePtr = elemPtr;
      const [res, nextCtx] = elemLiftFn(ctx);
      val.push(res);
      ctx = nextCtx;
      
      ctx.storagePtr = Math.max(ctx.storagePtr, elemPtr + elemSize32);
    }
    if (originalPtr !== null) { ctx.storagePtr = originalPtr; }
    if (originalLen !== null) { ctx.storageLen = originalLen; }
    return [listValue(val), ctx];
  };
  
  return function _liftFlatListInner(ctx) {
    _debugLog('[_liftFlatList()] args', { ctx });
    
    let liftResults;
    if (knownLen !== undefined) { // list with known length
    if (ctx.useDirectParams) {
      _debugLog('memory unexpectedly missing while lifting unknown length list', { ctx });
      liftResults = [listValue(ctx.params.slice(0, knownLen)), ctx];
      ctx.params = ctx.params.slice(knownLen);
    } else { // indirect params
    if (ctx.memory === null) {
      _debugLog('memory unexpectedly missing while lifting known length list', { knownLen, ctx });
      throw new Error(`memory missing while lifting known length (${knownLen}) list`);
    }
    
    const originalLen = ctx.storageLen;
    const originalPtr = ctx.storagePtr;
    
    ctx.storageLen = knownLen * elemSize32;
    liftResults = readValuesAndReset(ctx, null, originalLen, ctx.storagePtr, knownLen);
  }
  
} else { // unknown length list

if (ctx.useDirectParams) {
  // unknown length list ptr w/ direct params
  const dataPtr = ctx.params[0];
  const len = ctx.params[1];
  ctx.params = ctx.params.slice(2);
  
  ctx.useDirectParams = false;
  const originalPtr = ctx.storagePtr;
  const originalLen = ctx.storageLen;
  ctx.storageLen = len * elemSize32;
  
  liftResults = readValuesAndReset(ctx, originalPtr, originalLen, dataPtr, len);
  
  ctx.useDirectParams = true;
} else {
  // unknown length list ptr w/ in-memory params
  const originalLen = ctx.storageLen;
  ctx.storageLen = 8;
  
  const dataPtrLiftRes = _liftFlatU32(ctx);
  const dataPtr = dataPtrLiftRes[0];
  ctx = dataPtrLiftRes[1];
  
  const lenLiftRes = _liftFlatU32(ctx);
  const len = lenLiftRes[0];
  ctx = lenLiftRes[1];
  
  const originalPtr = ctx.storagePtr;
  ctx.storagePtr = dataPtr;
  
  ctx.storageLen = len * elemSize32;
  liftResults = readValuesAndReset(ctx, originalPtr, originalLen, dataPtr, len);
}
}

return liftResults;
}
}

function _liftFlatFlags(meta) {
  const { names, size32, align32, intSizeBytes } = meta;
  
  return function _liftFlatFlagsInner(ctx) {
    _debugLog('[_liftFlatFlags()] args', { ctx });
    
    let val = {};
    
    let liftRes;
    let align;
    switch (intSizeBytes) {
      case 1:
      liftRes = _liftFlatU8(ctx);
      break;
      case 2:
      liftRes = _liftFlatU16(ctx);
      break;
      case 4:
      liftRes = _liftFlatU32(ctx);
      break;
      default:
      throw new Error('invalid flags size');
    }
    let bits = liftRes[0];
    ctx = liftRes[1];
    
    
    for (const name of names) {
      val[name] = (bits & 1) === 1;
      bits >>>= 1;
    }
    
    
    const rem = ctx.storagePtr % align32;
    if (rem !== 0) { ctx.storagePtr += align32 - rem; }
    
    return [val, ctx];
  }
}

function _liftFlatResult(meta) {
  const f = _liftFlatVariant(meta);
  return function _liftFlatResultInner(ctx) {
    _debugLog('[_liftFlatResult()] args', { ctx });
    return f(ctx);
  }
}

function _liftFlatBorrow(componentTableIdx, size, memory, vals, storagePtr, storageLen) {
  _debugLog('[_liftFlatBorrow()] args', { size, memory, vals, storagePtr, storageLen });
  throw new Error('flat lift for borrowed resources is not supported!');
}


function _lowerFlatU8(ctx) {
  _debugLog('[_lowerFlatU8()] args', ctx);
  
  if (ctx.vals.length !== 1) {
    throw new Error(`unexpected number [${ctx.vals.length}] of vals (expected 1)`);
  }
  
  _requireValidNumericPrimitive.bind('u8', ctx.vals[0]);
  
  if (!ctx.memory) { throw new Error("missing memory for lower"); }
  new DataView(ctx.memory.buffer).setUint8(ctx.storagePtr, ctx.vals[0]);
  
  ctx.storagePtr += 1;
}

function _lowerFlatU16(ctx) {
  _debugLog('[_lowerFlatU16()] args', { ctx });
  
  if (!ctx.memory) { throw new Error("missing memory for lower"); }
  if (ctx.vals.length !== 1) {
    throw new Error(`unexpected number [${ctx.vals.length}] of vals (expected 1)`);
  }
  
  const rem = ctx.storagePtr % 2;
  if (rem !== 0) { ctx.storagePtr += (2 - rem); }
  
  _requireValidNumericPrimitive.bind('u16', ctx.vals[0]);
  new DataView(ctx.memory.buffer).setUint16(ctx.storagePtr, ctx.vals[0], true);
  
  ctx.storagePtr += 2;
}

function _lowerFlatU32(ctx) {
  _debugLog('[_lowerFlatU32()] args', { ctx });
  
  if (ctx.vals.length !== 1) {
    throw new Error(`expected single value to lower, got [${ctx.vals.length}]`);
  }
  
  const rem = ctx.storagePtr % 4;
  if (rem !== 0) { ctx.storagePtr += (4 - rem); }
  
  _requireValidNumericPrimitive.bind('u32', ctx.vals[0]);
  new DataView(ctx.memory.buffer).setUint32(ctx.storagePtr, ctx.vals[0], true);
  
  ctx.storagePtr += 4;
}

function _lowerFlatU64(ctx) {
  _debugLog('[_lowerFlatU64()] args', { ctx });
  
  if (ctx.vals.length !== 1) { throw new Error('unexpected number of vals'); }
  
  const rem = ctx.storagePtr % 8;
  if (rem !== 0) { ctx.storagePtr += (8 - rem); }
  
  _requireValidNumericPrimitive.bind('u64', ctx.vals[0]);
  new DataView(ctx.memory.buffer).setBigUint64(ctx.storagePtr, ctx.vals[0], true);
  
  ctx.storagePtr += 8;
}

function _lowerFlatStringUTF8(ctx) {
  _debugLog('[_lowerFlatStringUTF8()] args', ctx);
  if (!ctx.realloc) { throw new Error('missing realloc during flat string lower'); }
  
  const { ptr, len } = _utf8AllocateAndEncode(ctx.vals[0], ctx.realloc, ctx.memory);
  
  const view = new DataView(ctx.memory.buffer);
  view.setUint32(ctx.storagePtr, ptr, true);
  view.setUint32(ctx.storagePtr + 4, len, true);
  
  ctx.storagePtr += 8;
}

function _lowerFlatStringUTF16(ctx) {
  _debugLog('[_lowerFlatStringUTF16()] args', { ctx });
  if (!ctx.realloc) { throw new Error('missing realloc during flat string lower'); }
  
  const { ptr, len } = _utf16AllocateAndEncode(ctx.vals[0], ctx.realloc, ctx.memory);
  
  const view = new DataView(ctx.memory.buffer);
  view.setUint32(ctx.storagePtr, ptr, true);
  view.setUint32(ctx.storagePtr + 4, len, true);
  
  ctx.storagePtr += 8;
}

function _lowerFlatStringAny(ctx) {
  switch (ctx.stringEncoding) {
    case 'utf8':
    return _lowerFlatStringUTF8(ctx);
    case 'utf16':
    return _lowerFlatStringUTF16(ctx);
    default:
    throw new Error(`missing/unrecognized/unsupported string encoding [${ctx.stringEncoding}]`);
  }
}

function _lowerFlatRecord(meta) {
  const { fieldMetas, size32: recordSize32, align32: recordAlign32 } = meta;
  return function _lowerFlatRecordInner(ctx) {
    _debugLog('[_lowerFlatRecord()] args', { ctx });
    
    const originalPtr = ctx.storagePtr;
    const r = ctx.vals[0];
    for (const [tag, lowerFn, size32, align32 ] of fieldMetas) {
      const rem = ctx.storagePtr % align32;
      if (rem !== 0) { ctx.storagePtr += align32 - rem; }
      
      const fieldPtr = ctx.storagePtr;
      ctx.vals = [r[tag]];
      lowerFn(ctx);
      
      ctx.storagePtr = Math.max(ctx.storagePtr, fieldPtr + size32);
    }
    
    ctx.storagePtr = Math.max(ctx.storagePtr, originalPtr + recordSize32);
    
    const rem = ctx.storagePtr % recordAlign32;
    if (rem !== 0) {
      ctx.storagePtr += recordAlign32 - rem;
    }
  }
}

function _lowerFlatVariant(meta) {
  const { variantSize32, variantAlign32, variantPayloadOffset32, caseMetas } = meta;
  
  let caseLookup = {};
  for (const [idx, meta] of caseMetas.entries()) {
    let tag = meta[0];
    caseLookup[tag] = { discriminant: idx, meta };
  }
  
  return function _lowerFlatVariantInner(ctx) {
    _debugLog('[_lowerFlatVariant()] args', { ctx });
    
    const { tag, val } = ctx.vals[0];
    const variantCase = caseLookup[tag];
    if (!variantCase) {
      throw new Error(`missing tag [${tag}] (valid tags: ${Object.keys(caseLookup)})`);
    }
    
    const [ _tag, lowerFn, caseSize32, caseAlign32, caseFlatCount ] = variantCase.meta;
    
    const originalPtr = ctx.storagePtr;
    ctx.vals = [variantCase.discriminant];
    let discLowerRes;
    if (caseMetas.length < 256) {
      discLowerRes = _lowerFlatU8(ctx);
    } else if (caseMetas.length >= 256 && caseMetas.length < 65536) {
      discLowerRes = _lowerFlatU16(ctx);
    } else if (caseMetas.length >= 65536 && caseMetas.length < 4_294_967_296) {
      discLowerRes = _lowerFlatU32(ctx);
    } else {
      throw new Error(`unsupported number of cases [${caseMetas.length}]`);
    }
    
    const payloadOffsetPtr = originalPtr + variantPayloadOffset32;
    ctx.storagePtr = payloadOffsetPtr;
    ctx.vals = [val];
    if (lowerFn) { lowerFn(ctx); }
    
    ctx.storagePtr = Math.max(ctx.storagePtr, originalPtr + variantSize32);
    
    const rem = ctx.storagePtr % variantAlign32;
    if (rem !== 0) { ctx.storagePtr += variantAlign32 - rem; }
  }
}

function _lowerFlatList(meta) {
  const {
    elemLowerFn,
    knownLen,
    size32,
    align32,
    elemSize32,
    elemAlign32,
  } = meta;
  
  if (!elemLowerFn) { throw new TypeError("missing/invalid element lower fn for list"); }
  
  return function _lowerFlatListInner(ctx) {
    _debugLog('[_lowerFlatList()] args', { ctx });
    
    if (ctx.useDirectParams) {
      if (ctx.params.length < 2) { throw new Error('insufficient params left to lower list'); }
      const storagePtr = ctx.params[0];
      const elemCount = ctx.params[1];
      ctx.params = ctx.params.slice(2);
      
      const list = ctx.vals[0];
      if (!list) { throw new Error("missing direct param value"); }
      
      const lowerCtx = {
        storagePtr,
        memory: ctx.memory,
        stringEncoding: ctx.stringEncoding,
      };
      for (let idx = 0; idx < list.length; idx++) {
        const elemPtr = storagePtr + idx * elemSize32;
        lowerCtx.storagePtr = elemPtr;
        lowerCtx.vals = list.slice(idx, idx+1);
        elemLowerFn(lowerCtx);
        lowerCtx.storagePtr = Math.max(lowerCtx.storagePtr, elemPtr + elemSize32);
      }
      ctx.storagePtr = lowerCtx.storagePtr;
      
      // TODO: implement parma-only known-length processing
      
      return;
    }
    
    // TODO(fix): is it possible to get a vals that are a addr and length here from
    // a component lower?
    
    const elems = ctx.vals[0];
    if (knownLen === undefined) {
      // unknown length
      if (!ctx.realloc) { throw new Error('missing realloc during flat string lower'); }
      const dataPtr = ctx.realloc(0, 0, elemAlign32, elemSize32 * elems.length);
      
      ctx.vals[0] = dataPtr;
      _lowerFlatU32(ctx);
      
      ctx.vals[0] = elems.length;
      _lowerFlatU32(ctx);
      
      const origPtr = ctx.storagePtr;
      ctx.storagePtr = dataPtr;
      
      for (const [idx, elem] of elems.entries()) {
        const elemPtr = dataPtr + idx * elemSize32;
        ctx.storagePtr = elemPtr;
        ctx.vals = [elem];
        elemLowerFn(ctx);
        ctx.storagePtr = Math.max(ctx.storagePtr, elemPtr + elemSize32);
      }
      
      ctx.storagePtr = origPtr;
      
    } else {
      // known length
      
      if (elems.length !== knownLen) {
        throw new TypeError(`invalid list input of length [${elems.length}], must be length [${knownLen}]`);
      }
      
      const originalPtr = ctx.storagePtr;
      for (const [idx, elem] of elems.entries()) {
        const elemPtr = originalPtr + idx * elemSize32;
        ctx.storagePtr = elemPtr;
        ctx.vals = [elem];
        elemLowerFn(ctx);
        ctx.storagePtr = Math.max(ctx.storagePtr, elemPtr + elemSize32);
      }
    }
    
    // TODO(fix): special case for u8/u16/etc, we can do a direct copy
    
    const totalSizeBytes = elems.length * size32;
    if (ctx.storageLen !== undefined && totalSizeBytes > ctx.storageLen) {
      throw new Error('not enough storage remaining for list flat lower');
    }
  }
}

function _lowerFlatTuple(meta) {
  const { elemLowerMetas, size32: tupleSize32, align32: tupleAlign32 } = meta;
  return function _lowerFlatTupleInner(ctx) {
    _debugLog('[_lowerFlatTuple()] args', { ctx });
    const originalPtr = ctx.storagePtr;
    const tuple = ctx.vals[0];
    for (const [idx, [ lowerFn, size32, align32 ]]  of elemLowerMetas.entries()) {
      const rem = ctx.storagePtr % align32;
      if (rem !== 0) { ctx.storagePtr += align32 - rem; }
      
      const elemPtr = ctx.storagePtr;
      ctx.vals = [tuple[idx]];
      lowerFn(ctx);
      ctx.storagePtr = Math.max(ctx.storagePtr, elemPtr + size32);
    }
    
    ctx.storagePtr = Math.max(ctx.storagePtr, originalPtr + tupleSize32);
    
    const rem = ctx.storagePtr % tupleAlign32;
    if (rem !== 0) {
      ctx.storagePtr += tupleAlign32 - rem;
    }
  }
}

function _lowerFlatFlags(meta) {
  const { names, size32, align32, intSizeBytes } = meta;
  
  return function _lowerFlatFlagsInner(ctx) {
    _debugLog('[_lowerFlatFlags()] args', { ctx });
    if (ctx.vals.length !== 1) { throw new Error('unexpected number of vals'); }
    
    
    const flagObj = ctx.vals[0];
    let flagValue = 0;
    if (typeof flagObj === 'object' && flagObj !== null) {
      for (const [idx, name] of names.entries()) {
        if (flagObj[name] === true) {
          flagValue |= 1 << idx;
        }
      }
    } else if (flagObj !== null && flagObj !== undefined) {
      throw new TypeError('only an object, undefined or null can be converted to flags');
    }
    
    
    const rem = ctx.storagePtr % align32;
    if (rem !== 0) { ctx.storagePtr += (align32 - rem); }
    
    const dv = new DataView(ctx.memory.buffer);
    if (intSizeBytes === 1) {
      dv.setUint8(ctx.storagePtr, flagValue);
    } else if (intSizeBytes === 2) {
      dv.setUint16(ctx.storagePtr, flagValue, true);
    } else if (intSizeBytes === 4) {
      dv.setUint32(ctx.storagePtr, flagValue, true);
    } else {
      throw new Error(`unrecognized flag size [${intSizeBytes} bytes]`);
    }
    
    ctx.storagePtr += intSizeBytes;
  }
}

function _lowerFlatEnum(meta) {
  const f = _lowerFlatVariant(meta);
  return function _lowerFlatEnumInner(ctx) {
    _debugLog('[_lowerFlatEnum()] args', { ctx });
    
    const v = ctx.vals[0];
    const isNotEnumObject = typeof v !== 'object'
    || Object.keys(v).length !== 2
    || !('tag' in v);
    if (isNotEnumObject) {
      ctx.vals[0] = { tag: v };
    }
    
    f(ctx);
  }
}

function _lowerFlatOption(meta) {
  const f = _lowerFlatVariant(meta);
  return function _lowerFlatOptionInner(ctx) {
    _debugLog('[_lowerFlatOption()] args', { ctx });
    
    const v = ctx.vals[0];
    if (v === null || v === undefined) {
      ctx.vals[0] = { tag: 'none' };
    } else {
      const isNotOptionObject = typeof v !== 'object'
      || Object.keys(v).length !== 2
      || !('tag' in v)
      || !(v.tag === 'some' || v.tag === 'none')
      || !('val' in v);
      if (isNotOptionObject) {
        ctx.vals[0] = { tag: 'some', val: v };
      }
    }
    
    f(ctx);
  }
}

function _lowerFlatResult(meta) {
  const f = _lowerFlatVariant(meta);
  return function _lowerFlatResultInner(ctx) {
    _debugLog('[_lowerFlatResult()] args', { ctx });
    
    const v = ctx.vals[0];
    const isNotResultObject = typeof v !== 'object'
    || Object.keys(v).length !== 2
    || !('tag' in v)
    || !('ok' === v.tag || 'err' === v.tag)
    || !('val' in v);
    if (isNotResultObject) {
      ctx.vals[0] = { tag: 'ok', val: v };
    }
    
    f(ctx);
  };
}

function _lowerFlatOwn(meta) {
  const { lowerFn, componentIdx } = meta;
  
  return function _lowerFlatOwnInner(ctx) {
    _debugLog('[_lowerFlatOwn()] args', { ctx });
    const { createFn } = ctx;
    
    if (ctx.componentIdx !== componentIdx) {
      throw new Error(`component index mismatch (expected [${componentIdx}], lift called from [${ctx.componentIdx}])`);
    }
    
    const obj = ctx.vals[0];
    if (obj === undefined || obj === null) { throw new Error('missing resource'); }
    const handle = lowerFn(obj);
    
    ctx.vals[0] = handle;
    _lowerFlatU32(ctx);
  };
}

function _guardMayLeave(componentIdx, fn) {
  return function (...args) {
    _checkMayLeave(componentIdx);
    return fn.apply(this, args);
  };
}

function clampGuest(i, min, max) {
  if (i < min || i > max) {
    throw new TypeError(`must be between ${min} and ${max}`);
  }
  return i;
}


const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('node:fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

const symbolCabiDispose = Symbol.for('cabiDispose');

const symbolRscHandle = Symbol('handle');

const symbolRscRep = Symbol.for('cabiRep');
const symbolDispose = Symbol.dispose || Symbol.for('dispose');

function finalizationRegistryCreate (unregister) {
  if (typeof FinalizationRegistry === 'undefined') {
    return { unregister () {} };
  }
  return new FinalizationRegistry(unregister);
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  if (e instanceof Error) throw e;
  return e;
}

const instantiateCore = WebAssembly.instantiate;

function _suspendingImport(componentIdx, fn) {
  return async function (...args) {
    _checkMayLeave(componentIdx);
    const saved = CURRENT_TASK_META[componentIdx] ?? null;
    try {
      return await fn.apply(null, args);
    } finally {
      CURRENT_TASK_META[componentIdx] = saved;
    }
  };
}


let exports0;
let exports1;

const handleTable8 = [T_FLAG, 0];
handleTable8._createdReps = new Set();


const captureTable1= new Map();
let captureCnt1= 0;

HANDLE_TABLES[8] = handleTable8;

const _trampoline4 = function() {
  _debugLog('[iface="wasi:cli/stderr@0.2.12", function="get-stderr"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getStderr',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getStderr(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable8, rep);
  }
  
  _debugLog('[iface="wasi:cli/stderr@0.2.12", function="get-stderr"][Instruction::Return]', {
    funcName: 'get-stderr',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline4.fnName = 'wasi:cli/stderr@0.2.12#getStderr';

const handleTable9 = [T_FLAG, 0];
handleTable9._createdReps = new Set();


const captureTable2= new Map();
let captureCnt2= 0;

HANDLE_TABLES[9] = handleTable9;

const _trampoline5 = function() {
  _debugLog('[iface="wasi:cli/stdin@0.2.12", function="get-stdin"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getStdin',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getStdin(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid \"InputStream\" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable9, rep);
  }
  
  _debugLog('[iface="wasi:cli/stdin@0.2.12", function="get-stdin"][Instruction::Return]', {
    funcName: 'get-stdin',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline5.fnName = 'wasi:cli/stdin@0.2.12#getStdin';

const _trampoline6 = function() {
  _debugLog('[iface="wasi:cli/stdout@0.2.12", function="get-stdout"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getStdout',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getStdout(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable8, rep);
  }
  
  _debugLog('[iface="wasi:cli/stdout@0.2.12", function="get-stdout"][Instruction::Return]', {
    funcName: 'get-stdout',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline6.fnName = 'wasi:cli/stdout@0.2.12#getStdout';

const _trampoline7 = function(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  _debugLog('[iface="wasi:cli/exit@0.2.12", function="exit"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'exit',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => exit(variant0),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  _debugLog('[iface="wasi:cli/exit@0.2.12", function="exit"][Instruction::Return]', {
    funcName: 'exit',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline7.fnName = 'wasi:cli/exit@0.2.12#exit';
let exports2;
let memory0;
let realloc0;
let realloc0Async;
let realloc1;
let realloc1Async;

const _trampoline8 = function(arg0) {
  _debugLog('[iface="leptolm:api/d1-replay", function="get-cache"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getCache',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getCache(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  
  var encodeRes = _utf8AllocateAndEncode(ret, realloc0, memory0);
  var ptr0= encodeRes.ptr;
  var len0 = encodeRes.len;
  
  dataView(memory0).setUint32(arg0 + 4, len0, true);
  dataView(memory0).setUint32(arg0 + 0, ptr0, true);
  _debugLog('[iface="leptolm:api/d1-replay", function="get-cache"][Instruction::Return]', {
    funcName: 'get-cache',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline8.fnName = 'leptolm:api/d1-replay#getCache';

const _trampoline9 = function(arg0) {
  _debugLog('[iface="wasi:cli/environment@0.2.12", function="get-environment"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getEnvironment',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getEnvironment(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc1(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    
    var encodeRes = _utf8AllocateAndEncode(tuple0_0, realloc1, memory0);
    var ptr1= encodeRes.ptr;
    var len1 = encodeRes.len;
    
    dataView(memory0).setUint32(base + 4, len1, true);
    dataView(memory0).setUint32(base + 0, ptr1, true);
    
    var encodeRes = _utf8AllocateAndEncode(tuple0_1, realloc1, memory0);
    var ptr2= encodeRes.ptr;
    var len2 = encodeRes.len;
    
    dataView(memory0).setUint32(base + 12, len2, true);
    dataView(memory0).setUint32(base + 8, ptr2, true);
  }
  dataView(memory0).setUint32(arg0 + 4, len3, true);
  dataView(memory0).setUint32(arg0 + 0, result3, true);
  _debugLog('[iface="wasi:cli/environment@0.2.12", function="get-environment"][Instruction::Return]', {
    funcName: 'get-environment',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline9.fnName = 'wasi:cli/environment@0.2.12#getEnvironment';

const handleTable10 = [T_FLAG, 0];
handleTable10._createdReps = new Set();


const captureTable0= new Map();
let captureCnt0= 0;

HANDLE_TABLES[10] = handleTable10;

const _trampoline10 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable10[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="filesystem-error-code"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'filesystemErrorCode',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => filesystemErrorCode(rsc0),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val3 = e;
    let enum3;
    switch (val3) {
      case 'access': {
        enum3 = 0;
        break;
      }
      case 'would-block': {
        enum3 = 1;
        break;
      }
      case 'already': {
        enum3 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum3 = 3;
        break;
      }
      case 'busy': {
        enum3 = 4;
        break;
      }
      case 'deadlock': {
        enum3 = 5;
        break;
      }
      case 'quota': {
        enum3 = 6;
        break;
      }
      case 'exist': {
        enum3 = 7;
        break;
      }
      case 'file-too-large': {
        enum3 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum3 = 9;
        break;
      }
      case 'in-progress': {
        enum3 = 10;
        break;
      }
      case 'interrupted': {
        enum3 = 11;
        break;
      }
      case 'invalid': {
        enum3 = 12;
        break;
      }
      case 'io': {
        enum3 = 13;
        break;
      }
      case 'is-directory': {
        enum3 = 14;
        break;
      }
      case 'loop': {
        enum3 = 15;
        break;
      }
      case 'too-many-links': {
        enum3 = 16;
        break;
      }
      case 'message-size': {
        enum3 = 17;
        break;
      }
      case 'name-too-long': {
        enum3 = 18;
        break;
      }
      case 'no-device': {
        enum3 = 19;
        break;
      }
      case 'no-entry': {
        enum3 = 20;
        break;
      }
      case 'no-lock': {
        enum3 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum3 = 22;
        break;
      }
      case 'insufficient-space': {
        enum3 = 23;
        break;
      }
      case 'not-directory': {
        enum3 = 24;
        break;
      }
      case 'not-empty': {
        enum3 = 25;
        break;
      }
      case 'not-recoverable': {
        enum3 = 26;
        break;
      }
      case 'unsupported': {
        enum3 = 27;
        break;
      }
      case 'no-tty': {
        enum3 = 28;
        break;
      }
      case 'no-such-device': {
        enum3 = 29;
        break;
      }
      case 'overflow': {
        enum3 = 30;
        break;
      }
      case 'not-permitted': {
        enum3 = 31;
        break;
      }
      case 'pipe': {
        enum3 = 32;
        break;
      }
      case 'read-only': {
        enum3 = 33;
        break;
      }
      case 'invalid-seek': {
        enum3 = 34;
        break;
      }
      case 'text-file-busy': {
        enum3 = 35;
        break;
      }
      case 'cross-device': {
        enum3 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val3}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum3, true);
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="filesystem-error-code"][Instruction::Return]', {
    funcName: 'filesystem-error-code',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline10.fnName = 'wasi:filesystem/types@0.2.12#filesystemErrorCode';

const handleTable7 = [T_FLAG, 0];
handleTable7._createdReps = new Set();


const captureTable5= new Map();
let captureCnt5= 0;

HANDLE_TABLES[7] = handleTable7;

const _trampoline11 = function(arg0, arg1, arg2) {
  var handle1 = arg0;
  
  var rep2 = handleTable7[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.write-via-stream"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'writeViaStream',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.writeViaStream(BigInt.asUintN(64, BigInt(arg1))),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable8, rep);
      }
      
      dataView(memory0).setInt32(arg2 + 4, handle4, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum5, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.write-via-stream"][Instruction::Return]', {
    funcName: '[method]descriptor.write-via-stream',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline11.fnName = 'wasi:filesystem/types@0.2.12#writeViaStream';

const _trampoline12 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable7[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.append-via-stream"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'appendViaStream',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.appendViaStream(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable8, rep);
      }
      
      dataView(memory0).setInt32(arg1 + 4, handle4, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum5, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.append-via-stream"][Instruction::Return]', {
    funcName: '[method]descriptor.append-via-stream',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline12.fnName = 'wasi:filesystem/types@0.2.12#appendViaStream';

const _trampoline13 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable7[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.get-type"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getType',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.getType(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'unknown': {
          enum4 = 0;
          break;
        }
        case 'block-device': {
          enum4 = 1;
          break;
        }
        case 'character-device': {
          enum4 = 2;
          break;
        }
        case 'directory': {
          enum4 = 3;
          break;
        }
        case 'fifo': {
          enum4 = 4;
          break;
        }
        case 'symbolic-link': {
          enum4 = 5;
          break;
        }
        case 'regular-file': {
          enum4 = 6;
          break;
        }
        case 'socket': {
          enum4 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum4, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum5, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.get-type"][Instruction::Return]', {
    funcName: '[method]descriptor.get-type',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline13.fnName = 'wasi:filesystem/types@0.2.12#getType';

const _trampoline14 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable7[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.stat"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'stat',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.stat(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant13 = ret;
  switch (variant13.tag) {
    case 'ok': {
      const e = variant13.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v4_0, linkCount: v4_1, size: v4_2, dataAccessTimestamp: v4_3, dataModificationTimestamp: v4_4, statusChangeTimestamp: v4_5 } = e;
      var val5 = v4_0;
      let enum5;
      switch (val5) {
        case 'unknown': {
          enum5 = 0;
          break;
        }
        case 'block-device': {
          enum5 = 1;
          break;
        }
        case 'character-device': {
          enum5 = 2;
          break;
        }
        case 'directory': {
          enum5 = 3;
          break;
        }
        case 'fifo': {
          enum5 = 4;
          break;
        }
        case 'symbolic-link': {
          enum5 = 5;
          break;
        }
        case 'regular-file': {
          enum5 = 6;
          break;
        }
        case 'socket': {
          enum5 = 7;
          break;
        }
        default: {
          if ((v4_0) instanceof Error) {
            console.error(v4_0);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum5, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v4_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v4_2), true);
      var variant7 = v4_3;
      if (variant7 === null || variant7=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant7;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v6_0, nanoseconds: v6_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v6_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v6_1), true);
      }
      var variant9 = v4_4;
      if (variant9 === null || variant9=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant9;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v8_0, nanoseconds: v8_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v8_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v8_1), true);
      }
      var variant11 = v4_5;
      if (variant11 === null || variant11=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant11;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v10_0, nanoseconds: v10_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v10_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v10_1), true);
      }
      
      break;
    }
    case 'err': {
      const e = variant13.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val12 = e;
      let enum12;
      switch (val12) {
        case 'access': {
          enum12 = 0;
          break;
        }
        case 'would-block': {
          enum12 = 1;
          break;
        }
        case 'already': {
          enum12 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum12 = 3;
          break;
        }
        case 'busy': {
          enum12 = 4;
          break;
        }
        case 'deadlock': {
          enum12 = 5;
          break;
        }
        case 'quota': {
          enum12 = 6;
          break;
        }
        case 'exist': {
          enum12 = 7;
          break;
        }
        case 'file-too-large': {
          enum12 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum12 = 9;
          break;
        }
        case 'in-progress': {
          enum12 = 10;
          break;
        }
        case 'interrupted': {
          enum12 = 11;
          break;
        }
        case 'invalid': {
          enum12 = 12;
          break;
        }
        case 'io': {
          enum12 = 13;
          break;
        }
        case 'is-directory': {
          enum12 = 14;
          break;
        }
        case 'loop': {
          enum12 = 15;
          break;
        }
        case 'too-many-links': {
          enum12 = 16;
          break;
        }
        case 'message-size': {
          enum12 = 17;
          break;
        }
        case 'name-too-long': {
          enum12 = 18;
          break;
        }
        case 'no-device': {
          enum12 = 19;
          break;
        }
        case 'no-entry': {
          enum12 = 20;
          break;
        }
        case 'no-lock': {
          enum12 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum12 = 22;
          break;
        }
        case 'insufficient-space': {
          enum12 = 23;
          break;
        }
        case 'not-directory': {
          enum12 = 24;
          break;
        }
        case 'not-empty': {
          enum12 = 25;
          break;
        }
        case 'not-recoverable': {
          enum12 = 26;
          break;
        }
        case 'unsupported': {
          enum12 = 27;
          break;
        }
        case 'no-tty': {
          enum12 = 28;
          break;
        }
        case 'no-such-device': {
          enum12 = 29;
          break;
        }
        case 'overflow': {
          enum12 = 30;
          break;
        }
        case 'not-permitted': {
          enum12 = 31;
          break;
        }
        case 'pipe': {
          enum12 = 32;
          break;
        }
        case 'read-only': {
          enum12 = 33;
          break;
        }
        case 'invalid-seek': {
          enum12 = 34;
          break;
        }
        case 'text-file-busy': {
          enum12 = 35;
          break;
        }
        case 'cross-device': {
          enum12 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val12}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum12, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant13, valueType: typeof variant13});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.stat"][Instruction::Return]', {
    funcName: '[method]descriptor.stat',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline14.fnName = 'wasi:filesystem/types@0.2.12#stat';

const _trampoline15 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable8[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.check-write"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'checkWrite',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.checkWrite(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable10, rep);
          }
          
          dataView(memory0).setInt32(arg1 + 12, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.check-write"][Instruction::Return]', {
    funcName: '[method]output-stream.check-write',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline15.fnName = 'wasi:io/streams@0.2.12#checkWrite';

const _trampoline16 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable8[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  if (ptr3 % 1 !== 0) throw new TypeError(`list pointer [${ptr3}] is not aligned to 1`);
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.write"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'write',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet4 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.write(result3),
    })
    ;
    ret = hostRet4 !== null && typeof hostRet4 === 'object' && (hostRet4.tag === 'ok' || hostRet4.tag === 'err')
    ? hostRet4
    : { tag: 'ok', val: hostRet4};
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case 'last-operation-failed': {
          const e = variant6.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle5 = e[symbolRscHandle];
          if (!handle5) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle5 = rscTableCreateOwn(handleTable10, rep);
          }
          
          dataView(memory0).setInt32(arg3 + 8, handle5, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.write"][Instruction::Return]', {
    funcName: '[method]output-stream.write',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline16.fnName = 'wasi:io/streams@0.2.12#write';

const _trampoline17 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable8[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-flush"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'blockingFlush',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.blockingFlush(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable10, rep);
          }
          
          dataView(memory0).setInt32(arg1 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-flush"][Instruction::Return]', {
    funcName: '[method]output-stream.blocking-flush',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline17.fnName = 'wasi:io/streams@0.2.12#blockingFlush';

const _trampoline18 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable8[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  if (ptr3 % 1 !== 0) throw new TypeError(`list pointer [${ptr3}] is not aligned to 1`);
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-write-and-flush"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'blockingWriteAndFlush',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet4 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.blockingWriteAndFlush(result3),
    })
    ;
    ret = hostRet4 !== null && typeof hostRet4 === 'object' && (hostRet4.tag === 'ok' || hostRet4.tag === 'err')
    ? hostRet4
    : { tag: 'ok', val: hostRet4};
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case 'last-operation-failed': {
          const e = variant6.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle5 = e[symbolRscHandle];
          if (!handle5) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle5 = rscTableCreateOwn(handleTable10, rep);
          }
          
          dataView(memory0).setInt32(arg3 + 8, handle5, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-write-and-flush"][Instruction::Return]', {
    funcName: '[method]output-stream.blocking-write-and-flush',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline18.fnName = 'wasi:io/streams@0.2.12#blockingWriteAndFlush';

const _trampoline19 = function(arg0) {
  _debugLog('[iface="wasi:filesystem/preopens@0.2.12", function="get-directories"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getDirectories',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    3,
    _getGlobalCurrentTaskMeta(3)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getDirectories(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc1(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid \"Descriptor\" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt5;
      captureTable5.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable7, rep);
    }
    
    dataView(memory0).setInt32(base + 0, handle1, true);
    
    var encodeRes = _utf8AllocateAndEncode(tuple0_1, realloc1, memory0);
    var ptr2= encodeRes.ptr;
    var len2 = encodeRes.len;
    
    dataView(memory0).setUint32(base + 8, len2, true);
    dataView(memory0).setUint32(base + 4, ptr2, true);
  }
  dataView(memory0).setUint32(arg0 + 4, len3, true);
  dataView(memory0).setUint32(arg0 + 0, result3, true);
  _debugLog('[iface="wasi:filesystem/preopens@0.2.12", function="get-directories"][Instruction::Return]', {
    funcName: 'get-directories',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline19.fnName = 'wasi:filesystem/preopens@0.2.12#getDirectories';
let exports3;
let exports4;
let exports5;
let memory1;
let exports6;
let exports7;
let exports8;
let exports9;
let memory2;
let exports10;
let exports11;
let exports12;
let exports13;

const handleTable32 = [T_FLAG, 0];
handleTable32._createdReps = new Set();

HANDLE_TABLES[32] = handleTable32;

const _trampoline37 = function() {
  _debugLog('[iface="wasi:cli/stderr@0.2.12", function="get-stderr"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getStderr',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getStderr(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable32, rep);
  }
  
  _debugLog('[iface="wasi:cli/stderr@0.2.12", function="get-stderr"][Instruction::Return]', {
    funcName: 'get-stderr',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline37.fnName = 'wasi:cli/stderr@0.2.12#getStderr';

const handleTable33 = [T_FLAG, 0];
handleTable33._createdReps = new Set();

HANDLE_TABLES[33] = handleTable33;

const _trampoline38 = function() {
  _debugLog('[iface="wasi:cli/stdin@0.2.12", function="get-stdin"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getStdin',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getStdin(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid \"InputStream\" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable33, rep);
  }
  
  _debugLog('[iface="wasi:cli/stdin@0.2.12", function="get-stdin"][Instruction::Return]', {
    funcName: 'get-stdin',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline38.fnName = 'wasi:cli/stdin@0.2.12#getStdin';

const _trampoline39 = function() {
  _debugLog('[iface="wasi:cli/stdout@0.2.12", function="get-stdout"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getStdout',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getStdout(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable32, rep);
  }
  
  _debugLog('[iface="wasi:cli/stdout@0.2.12", function="get-stdout"][Instruction::Return]', {
    funcName: 'get-stdout',
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}
_trampoline39.fnName = 'wasi:cli/stdout@0.2.12#getStdout';

const _trampoline42 = function(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  _debugLog('[iface="wasi:cli/exit@0.2.12", function="exit"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'exit',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => exit(variant0),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  _debugLog('[iface="wasi:cli/exit@0.2.12", function="exit"][Instruction::Return]', {
    funcName: 'exit',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline42.fnName = 'wasi:cli/exit@0.2.12#exit';
let exports14;
let memory3;
let exports15;
let realloc2;
let realloc2Async;

const handleTable31 = [T_FLAG, 0];
handleTable31._createdReps = new Set();

HANDLE_TABLES[31] = handleTable31;

const _trampoline45 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable31[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="filesystem-error-code"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'filesystemErrorCode',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => filesystemErrorCode(rsc0),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory3).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory3).setInt8(arg1 + 0, 1, true);
    var val3 = e;
    let enum3;
    switch (val3) {
      case 'access': {
        enum3 = 0;
        break;
      }
      case 'would-block': {
        enum3 = 1;
        break;
      }
      case 'already': {
        enum3 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum3 = 3;
        break;
      }
      case 'busy': {
        enum3 = 4;
        break;
      }
      case 'deadlock': {
        enum3 = 5;
        break;
      }
      case 'quota': {
        enum3 = 6;
        break;
      }
      case 'exist': {
        enum3 = 7;
        break;
      }
      case 'file-too-large': {
        enum3 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum3 = 9;
        break;
      }
      case 'in-progress': {
        enum3 = 10;
        break;
      }
      case 'interrupted': {
        enum3 = 11;
        break;
      }
      case 'invalid': {
        enum3 = 12;
        break;
      }
      case 'io': {
        enum3 = 13;
        break;
      }
      case 'is-directory': {
        enum3 = 14;
        break;
      }
      case 'loop': {
        enum3 = 15;
        break;
      }
      case 'too-many-links': {
        enum3 = 16;
        break;
      }
      case 'message-size': {
        enum3 = 17;
        break;
      }
      case 'name-too-long': {
        enum3 = 18;
        break;
      }
      case 'no-device': {
        enum3 = 19;
        break;
      }
      case 'no-entry': {
        enum3 = 20;
        break;
      }
      case 'no-lock': {
        enum3 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum3 = 22;
        break;
      }
      case 'insufficient-space': {
        enum3 = 23;
        break;
      }
      case 'not-directory': {
        enum3 = 24;
        break;
      }
      case 'not-empty': {
        enum3 = 25;
        break;
      }
      case 'not-recoverable': {
        enum3 = 26;
        break;
      }
      case 'unsupported': {
        enum3 = 27;
        break;
      }
      case 'no-tty': {
        enum3 = 28;
        break;
      }
      case 'no-such-device': {
        enum3 = 29;
        break;
      }
      case 'overflow': {
        enum3 = 30;
        break;
      }
      case 'not-permitted': {
        enum3 = 31;
        break;
      }
      case 'pipe': {
        enum3 = 32;
        break;
      }
      case 'read-only': {
        enum3 = 33;
        break;
      }
      case 'invalid-seek': {
        enum3 = 34;
        break;
      }
      case 'text-file-busy': {
        enum3 = 35;
        break;
      }
      case 'cross-device': {
        enum3 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val3}" is not one of the cases of error-code`);
      }
    }
    dataView(memory3).setInt8(arg1 + 1, enum3, true);
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="filesystem-error-code"][Instruction::Return]', {
    funcName: 'filesystem-error-code',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline45.fnName = 'wasi:filesystem/types@0.2.12#filesystemErrorCode';

const handleTable30 = [T_FLAG, 0];
handleTable30._createdReps = new Set();

HANDLE_TABLES[30] = handleTable30;

const _trampoline46 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.metadata-hash"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'metadataHash',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.metadataHash(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 0, true);
      var {lower: v4_0, upper: v4_1 } = e;
      dataView(memory3).setBigInt64(arg1 + 8, toUint64(v4_0), true);
      dataView(memory3).setBigInt64(arg1 + 16, toUint64(v4_1), true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg1 + 8, enum5, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.metadata-hash"][Instruction::Return]', {
    funcName: '[method]descriptor.metadata-hash',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline46.fnName = 'wasi:filesystem/types@0.2.12#metadataHash';

const _trampoline47 = function(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory3.buffer, ptr4, len4));
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.metadata-hash-at"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'metadataHashAt',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet5 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.metadataHashAt(flags3, result4),
    })
    ;
    ret = hostRet5 !== null && typeof hostRet5 === 'object' && (hostRet5.tag === 'ok' || hostRet5.tag === 'err')
    ? hostRet5
    : { tag: 'ok', val: hostRet5};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case 'ok': {
      const e = variant8.val;
      dataView(memory3).setInt8(arg4 + 0, 0, true);
      var {lower: v6_0, upper: v6_1 } = e;
      dataView(memory3).setBigInt64(arg4 + 8, toUint64(v6_0), true);
      dataView(memory3).setBigInt64(arg4 + 16, toUint64(v6_1), true);
      
      break;
    }
    case 'err': {
      const e = variant8.val;
      dataView(memory3).setInt8(arg4 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case 'access': {
          enum7 = 0;
          break;
        }
        case 'would-block': {
          enum7 = 1;
          break;
        }
        case 'already': {
          enum7 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum7 = 3;
          break;
        }
        case 'busy': {
          enum7 = 4;
          break;
        }
        case 'deadlock': {
          enum7 = 5;
          break;
        }
        case 'quota': {
          enum7 = 6;
          break;
        }
        case 'exist': {
          enum7 = 7;
          break;
        }
        case 'file-too-large': {
          enum7 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum7 = 9;
          break;
        }
        case 'in-progress': {
          enum7 = 10;
          break;
        }
        case 'interrupted': {
          enum7 = 11;
          break;
        }
        case 'invalid': {
          enum7 = 12;
          break;
        }
        case 'io': {
          enum7 = 13;
          break;
        }
        case 'is-directory': {
          enum7 = 14;
          break;
        }
        case 'loop': {
          enum7 = 15;
          break;
        }
        case 'too-many-links': {
          enum7 = 16;
          break;
        }
        case 'message-size': {
          enum7 = 17;
          break;
        }
        case 'name-too-long': {
          enum7 = 18;
          break;
        }
        case 'no-device': {
          enum7 = 19;
          break;
        }
        case 'no-entry': {
          enum7 = 20;
          break;
        }
        case 'no-lock': {
          enum7 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum7 = 22;
          break;
        }
        case 'insufficient-space': {
          enum7 = 23;
          break;
        }
        case 'not-directory': {
          enum7 = 24;
          break;
        }
        case 'not-empty': {
          enum7 = 25;
          break;
        }
        case 'not-recoverable': {
          enum7 = 26;
          break;
        }
        case 'unsupported': {
          enum7 = 27;
          break;
        }
        case 'no-tty': {
          enum7 = 28;
          break;
        }
        case 'no-such-device': {
          enum7 = 29;
          break;
        }
        case 'overflow': {
          enum7 = 30;
          break;
        }
        case 'not-permitted': {
          enum7 = 31;
          break;
        }
        case 'pipe': {
          enum7 = 32;
          break;
        }
        case 'read-only': {
          enum7 = 33;
          break;
        }
        case 'invalid-seek': {
          enum7 = 34;
          break;
        }
        case 'text-file-busy': {
          enum7 = 35;
          break;
        }
        case 'cross-device': {
          enum7 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg4 + 8, enum7, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant8, valueType: typeof variant8});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.metadata-hash-at"][Instruction::Return]', {
    funcName: '[method]descriptor.metadata-hash-at',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline47.fnName = 'wasi:filesystem/types@0.2.12#metadataHashAt';

const _trampoline48 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.get-flags"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getFlags',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.getFlags(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 0, true);
      let flags4 = 0;
      if (typeof e === 'object' && e !== null) {
        flags4 = Boolean(e.read) << 0 | Boolean(e.write) << 1 | Boolean(e.fileIntegritySync) << 2 | Boolean(e.dataIntegritySync) << 3 | Boolean(e.requestedWriteSync) << 4 | Boolean(e.mutateDirectory) << 5;
      } else if (e !== null && e!== undefined) {
        throw new TypeError('only an object, undefined or null can be converted to flags');
      }
      dataView(memory3).setInt8(arg1 + 1, flags4, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg1 + 1, enum5, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.get-flags"][Instruction::Return]', {
    funcName: '[method]descriptor.get-flags',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline48.fnName = 'wasi:filesystem/types@0.2.12#getFlags';

const _trampoline49 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.get-type"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getType',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.getType(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 0, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'unknown': {
          enum4 = 0;
          break;
        }
        case 'block-device': {
          enum4 = 1;
          break;
        }
        case 'character-device': {
          enum4 = 2;
          break;
        }
        case 'directory': {
          enum4 = 3;
          break;
        }
        case 'fifo': {
          enum4 = 4;
          break;
        }
        case 'symbolic-link': {
          enum4 = 5;
          break;
        }
        case 'regular-file': {
          enum4 = 6;
          break;
        }
        case 'socket': {
          enum4 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory3).setInt8(arg1 + 1, enum4, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg1 + 1, enum5, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.get-type"][Instruction::Return]', {
    funcName: '[method]descriptor.get-type',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline49.fnName = 'wasi:filesystem/types@0.2.12#getType';

const _trampoline50 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.append-via-stream"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'appendViaStream',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.appendViaStream(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 0, true);
      
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable32, rep);
      }
      
      dataView(memory3).setInt32(arg1 + 4, handle4, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg1 + 4, enum5, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.append-via-stream"][Instruction::Return]', {
    funcName: '[method]descriptor.append-via-stream',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline50.fnName = 'wasi:filesystem/types@0.2.12#appendViaStream';

const _trampoline51 = function(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory3.buffer, ptr4, len4));
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.stat-at"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'statAt',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet5 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.statAt(flags3, result4),
    })
    ;
    ret = hostRet5 !== null && typeof hostRet5 === 'object' && (hostRet5.tag === 'ok' || hostRet5.tag === 'err')
    ? hostRet5
    : { tag: 'ok', val: hostRet5};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant15 = ret;
  switch (variant15.tag) {
    case 'ok': {
      const e = variant15.val;
      dataView(memory3).setInt8(arg4 + 0, 0, true);
      var {type: v6_0, linkCount: v6_1, size: v6_2, dataAccessTimestamp: v6_3, dataModificationTimestamp: v6_4, statusChangeTimestamp: v6_5 } = e;
      var val7 = v6_0;
      let enum7;
      switch (val7) {
        case 'unknown': {
          enum7 = 0;
          break;
        }
        case 'block-device': {
          enum7 = 1;
          break;
        }
        case 'character-device': {
          enum7 = 2;
          break;
        }
        case 'directory': {
          enum7 = 3;
          break;
        }
        case 'fifo': {
          enum7 = 4;
          break;
        }
        case 'symbolic-link': {
          enum7 = 5;
          break;
        }
        case 'regular-file': {
          enum7 = 6;
          break;
        }
        case 'socket': {
          enum7 = 7;
          break;
        }
        default: {
          if ((v6_0) instanceof Error) {
            console.error(v6_0);
          }
          
          throw new TypeError(`"${val7}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory3).setInt8(arg4 + 8, enum7, true);
      dataView(memory3).setBigInt64(arg4 + 16, toUint64(v6_1), true);
      dataView(memory3).setBigInt64(arg4 + 24, toUint64(v6_2), true);
      var variant9 = v6_3;
      if (variant9 === null || variant9=== undefined) {
        dataView(memory3).setInt8(arg4 + 32, 0, true);
      } else {
        const e = variant9;
        dataView(memory3).setInt8(arg4 + 32, 1, true);
        var {seconds: v8_0, nanoseconds: v8_1 } = e;
        dataView(memory3).setBigInt64(arg4 + 40, toUint64(v8_0), true);
        dataView(memory3).setInt32(arg4 + 48, toUint32(v8_1), true);
      }
      var variant11 = v6_4;
      if (variant11 === null || variant11=== undefined) {
        dataView(memory3).setInt8(arg4 + 56, 0, true);
      } else {
        const e = variant11;
        dataView(memory3).setInt8(arg4 + 56, 1, true);
        var {seconds: v10_0, nanoseconds: v10_1 } = e;
        dataView(memory3).setBigInt64(arg4 + 64, toUint64(v10_0), true);
        dataView(memory3).setInt32(arg4 + 72, toUint32(v10_1), true);
      }
      var variant13 = v6_5;
      if (variant13 === null || variant13=== undefined) {
        dataView(memory3).setInt8(arg4 + 80, 0, true);
      } else {
        const e = variant13;
        dataView(memory3).setInt8(arg4 + 80, 1, true);
        var {seconds: v12_0, nanoseconds: v12_1 } = e;
        dataView(memory3).setBigInt64(arg4 + 88, toUint64(v12_0), true);
        dataView(memory3).setInt32(arg4 + 96, toUint32(v12_1), true);
      }
      
      break;
    }
    case 'err': {
      const e = variant15.val;
      dataView(memory3).setInt8(arg4 + 0, 1, true);
      var val14 = e;
      let enum14;
      switch (val14) {
        case 'access': {
          enum14 = 0;
          break;
        }
        case 'would-block': {
          enum14 = 1;
          break;
        }
        case 'already': {
          enum14 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum14 = 3;
          break;
        }
        case 'busy': {
          enum14 = 4;
          break;
        }
        case 'deadlock': {
          enum14 = 5;
          break;
        }
        case 'quota': {
          enum14 = 6;
          break;
        }
        case 'exist': {
          enum14 = 7;
          break;
        }
        case 'file-too-large': {
          enum14 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum14 = 9;
          break;
        }
        case 'in-progress': {
          enum14 = 10;
          break;
        }
        case 'interrupted': {
          enum14 = 11;
          break;
        }
        case 'invalid': {
          enum14 = 12;
          break;
        }
        case 'io': {
          enum14 = 13;
          break;
        }
        case 'is-directory': {
          enum14 = 14;
          break;
        }
        case 'loop': {
          enum14 = 15;
          break;
        }
        case 'too-many-links': {
          enum14 = 16;
          break;
        }
        case 'message-size': {
          enum14 = 17;
          break;
        }
        case 'name-too-long': {
          enum14 = 18;
          break;
        }
        case 'no-device': {
          enum14 = 19;
          break;
        }
        case 'no-entry': {
          enum14 = 20;
          break;
        }
        case 'no-lock': {
          enum14 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum14 = 22;
          break;
        }
        case 'insufficient-space': {
          enum14 = 23;
          break;
        }
        case 'not-directory': {
          enum14 = 24;
          break;
        }
        case 'not-empty': {
          enum14 = 25;
          break;
        }
        case 'not-recoverable': {
          enum14 = 26;
          break;
        }
        case 'unsupported': {
          enum14 = 27;
          break;
        }
        case 'no-tty': {
          enum14 = 28;
          break;
        }
        case 'no-such-device': {
          enum14 = 29;
          break;
        }
        case 'overflow': {
          enum14 = 30;
          break;
        }
        case 'not-permitted': {
          enum14 = 31;
          break;
        }
        case 'pipe': {
          enum14 = 32;
          break;
        }
        case 'read-only': {
          enum14 = 33;
          break;
        }
        case 'invalid-seek': {
          enum14 = 34;
          break;
        }
        case 'text-file-busy': {
          enum14 = 35;
          break;
        }
        case 'cross-device': {
          enum14 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val14}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg4 + 8, enum14, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant15, valueType: typeof variant15});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.stat-at"][Instruction::Return]', {
    funcName: '[method]descriptor.stat-at',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline51.fnName = 'wasi:filesystem/types@0.2.12#statAt';

const _trampoline52 = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1),
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory3.buffer, ptr4, len4));
  if ((arg4 & 4294967280) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags5 = {
    create: Boolean(arg4 & 1),
    directory: Boolean(arg4 & 2),
    exclusive: Boolean(arg4 & 4),
    truncate: Boolean(arg4 & 8),
  };
  if ((arg5 & 4294967232) !== 0) {
    throw new TypeError('flags have extraneous bits set');
  }
  var flags6 = {
    read: Boolean(arg5 & 1),
    write: Boolean(arg5 & 2),
    fileIntegritySync: Boolean(arg5 & 4),
    dataIntegritySync: Boolean(arg5 & 8),
    requestedWriteSync: Boolean(arg5 & 16),
    mutateDirectory: Boolean(arg5 & 32),
  };
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.open-at"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'openAt',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet7 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.openAt(flags3, result4, flags5, flags6),
    })
    ;
    ret = hostRet7 !== null && typeof hostRet7 === 'object' && (hostRet7.tag === 'ok' || hostRet7.tag === 'err')
    ? hostRet7
    : { tag: 'ok', val: hostRet7};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant10 = ret;
  switch (variant10.tag) {
    case 'ok': {
      const e = variant10.val;
      dataView(memory3).setInt8(arg6 + 0, 0, true);
      
      if (!(e instanceof Descriptor)) {
        throw new TypeError('Resource error: Not a valid \"Descriptor\" resource.');
      }
      var handle8 = e[symbolRscHandle];
      if (!handle8) {
        const rep = e[symbolRscRep] || ++captureCnt5;
        captureTable5.set(rep, e);
        handle8 = rscTableCreateOwn(handleTable30, rep);
      }
      
      dataView(memory3).setInt32(arg6 + 4, handle8, true);
      
      break;
    }
    case 'err': {
      const e = variant10.val;
      dataView(memory3).setInt8(arg6 + 0, 1, true);
      var val9 = e;
      let enum9;
      switch (val9) {
        case 'access': {
          enum9 = 0;
          break;
        }
        case 'would-block': {
          enum9 = 1;
          break;
        }
        case 'already': {
          enum9 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum9 = 3;
          break;
        }
        case 'busy': {
          enum9 = 4;
          break;
        }
        case 'deadlock': {
          enum9 = 5;
          break;
        }
        case 'quota': {
          enum9 = 6;
          break;
        }
        case 'exist': {
          enum9 = 7;
          break;
        }
        case 'file-too-large': {
          enum9 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum9 = 9;
          break;
        }
        case 'in-progress': {
          enum9 = 10;
          break;
        }
        case 'interrupted': {
          enum9 = 11;
          break;
        }
        case 'invalid': {
          enum9 = 12;
          break;
        }
        case 'io': {
          enum9 = 13;
          break;
        }
        case 'is-directory': {
          enum9 = 14;
          break;
        }
        case 'loop': {
          enum9 = 15;
          break;
        }
        case 'too-many-links': {
          enum9 = 16;
          break;
        }
        case 'message-size': {
          enum9 = 17;
          break;
        }
        case 'name-too-long': {
          enum9 = 18;
          break;
        }
        case 'no-device': {
          enum9 = 19;
          break;
        }
        case 'no-entry': {
          enum9 = 20;
          break;
        }
        case 'no-lock': {
          enum9 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum9 = 22;
          break;
        }
        case 'insufficient-space': {
          enum9 = 23;
          break;
        }
        case 'not-directory': {
          enum9 = 24;
          break;
        }
        case 'not-empty': {
          enum9 = 25;
          break;
        }
        case 'not-recoverable': {
          enum9 = 26;
          break;
        }
        case 'unsupported': {
          enum9 = 27;
          break;
        }
        case 'no-tty': {
          enum9 = 28;
          break;
        }
        case 'no-such-device': {
          enum9 = 29;
          break;
        }
        case 'overflow': {
          enum9 = 30;
          break;
        }
        case 'not-permitted': {
          enum9 = 31;
          break;
        }
        case 'pipe': {
          enum9 = 32;
          break;
        }
        case 'read-only': {
          enum9 = 33;
          break;
        }
        case 'invalid-seek': {
          enum9 = 34;
          break;
        }
        case 'text-file-busy': {
          enum9 = 35;
          break;
        }
        case 'cross-device': {
          enum9 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val9}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg6 + 4, enum9, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant10, valueType: typeof variant10});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.open-at"][Instruction::Return]', {
    funcName: '[method]descriptor.open-at',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline52.fnName = 'wasi:filesystem/types@0.2.12#openAt';

const _trampoline53 = function(arg0, arg1, arg2) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.read-via-stream"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'readViaStream',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.readViaStream(BigInt.asUintN(64, BigInt(arg1))),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg2 + 0, 0, true);
      
      if (!(e instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid \"InputStream\" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable33, rep);
      }
      
      dataView(memory3).setInt32(arg2 + 4, handle4, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg2 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg2 + 4, enum5, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.read-via-stream"][Instruction::Return]', {
    funcName: '[method]descriptor.read-via-stream',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline53.fnName = 'wasi:filesystem/types@0.2.12#readViaStream';

const _trampoline54 = function(arg0, arg1, arg2) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.write-via-stream"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'writeViaStream',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.writeViaStream(BigInt.asUintN(64, BigInt(arg1))),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg2 + 0, 0, true);
      
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, e);
        handle4 = rscTableCreateOwn(handleTable32, rep);
      }
      
      dataView(memory3).setInt32(arg2 + 4, handle4, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg2 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case 'access': {
          enum5 = 0;
          break;
        }
        case 'would-block': {
          enum5 = 1;
          break;
        }
        case 'already': {
          enum5 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum5 = 3;
          break;
        }
        case 'busy': {
          enum5 = 4;
          break;
        }
        case 'deadlock': {
          enum5 = 5;
          break;
        }
        case 'quota': {
          enum5 = 6;
          break;
        }
        case 'exist': {
          enum5 = 7;
          break;
        }
        case 'file-too-large': {
          enum5 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum5 = 9;
          break;
        }
        case 'in-progress': {
          enum5 = 10;
          break;
        }
        case 'interrupted': {
          enum5 = 11;
          break;
        }
        case 'invalid': {
          enum5 = 12;
          break;
        }
        case 'io': {
          enum5 = 13;
          break;
        }
        case 'is-directory': {
          enum5 = 14;
          break;
        }
        case 'loop': {
          enum5 = 15;
          break;
        }
        case 'too-many-links': {
          enum5 = 16;
          break;
        }
        case 'message-size': {
          enum5 = 17;
          break;
        }
        case 'name-too-long': {
          enum5 = 18;
          break;
        }
        case 'no-device': {
          enum5 = 19;
          break;
        }
        case 'no-entry': {
          enum5 = 20;
          break;
        }
        case 'no-lock': {
          enum5 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum5 = 22;
          break;
        }
        case 'insufficient-space': {
          enum5 = 23;
          break;
        }
        case 'not-directory': {
          enum5 = 24;
          break;
        }
        case 'not-empty': {
          enum5 = 25;
          break;
        }
        case 'not-recoverable': {
          enum5 = 26;
          break;
        }
        case 'unsupported': {
          enum5 = 27;
          break;
        }
        case 'no-tty': {
          enum5 = 28;
          break;
        }
        case 'no-such-device': {
          enum5 = 29;
          break;
        }
        case 'overflow': {
          enum5 = 30;
          break;
        }
        case 'not-permitted': {
          enum5 = 31;
          break;
        }
        case 'pipe': {
          enum5 = 32;
          break;
        }
        case 'read-only': {
          enum5 = 33;
          break;
        }
        case 'invalid-seek': {
          enum5 = 34;
          break;
        }
        case 'text-file-busy': {
          enum5 = 35;
          break;
        }
        case 'cross-device': {
          enum5 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg2 + 4, enum5, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.write-via-stream"][Instruction::Return]', {
    funcName: '[method]descriptor.write-via-stream',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline54.fnName = 'wasi:filesystem/types@0.2.12#writeViaStream';

const _trampoline55 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable30[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.stat"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'stat',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.stat(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant13 = ret;
  switch (variant13.tag) {
    case 'ok': {
      const e = variant13.val;
      dataView(memory3).setInt8(arg1 + 0, 0, true);
      var {type: v4_0, linkCount: v4_1, size: v4_2, dataAccessTimestamp: v4_3, dataModificationTimestamp: v4_4, statusChangeTimestamp: v4_5 } = e;
      var val5 = v4_0;
      let enum5;
      switch (val5) {
        case 'unknown': {
          enum5 = 0;
          break;
        }
        case 'block-device': {
          enum5 = 1;
          break;
        }
        case 'character-device': {
          enum5 = 2;
          break;
        }
        case 'directory': {
          enum5 = 3;
          break;
        }
        case 'fifo': {
          enum5 = 4;
          break;
        }
        case 'symbolic-link': {
          enum5 = 5;
          break;
        }
        case 'regular-file': {
          enum5 = 6;
          break;
        }
        case 'socket': {
          enum5 = 7;
          break;
        }
        default: {
          if ((v4_0) instanceof Error) {
            console.error(v4_0);
          }
          
          throw new TypeError(`"${val5}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory3).setInt8(arg1 + 8, enum5, true);
      dataView(memory3).setBigInt64(arg1 + 16, toUint64(v4_1), true);
      dataView(memory3).setBigInt64(arg1 + 24, toUint64(v4_2), true);
      var variant7 = v4_3;
      if (variant7 === null || variant7=== undefined) {
        dataView(memory3).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant7;
        dataView(memory3).setInt8(arg1 + 32, 1, true);
        var {seconds: v6_0, nanoseconds: v6_1 } = e;
        dataView(memory3).setBigInt64(arg1 + 40, toUint64(v6_0), true);
        dataView(memory3).setInt32(arg1 + 48, toUint32(v6_1), true);
      }
      var variant9 = v4_4;
      if (variant9 === null || variant9=== undefined) {
        dataView(memory3).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant9;
        dataView(memory3).setInt8(arg1 + 56, 1, true);
        var {seconds: v8_0, nanoseconds: v8_1 } = e;
        dataView(memory3).setBigInt64(arg1 + 64, toUint64(v8_0), true);
        dataView(memory3).setInt32(arg1 + 72, toUint32(v8_1), true);
      }
      var variant11 = v4_5;
      if (variant11 === null || variant11=== undefined) {
        dataView(memory3).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant11;
        dataView(memory3).setInt8(arg1 + 80, 1, true);
        var {seconds: v10_0, nanoseconds: v10_1 } = e;
        dataView(memory3).setBigInt64(arg1 + 88, toUint64(v10_0), true);
        dataView(memory3).setInt32(arg1 + 96, toUint32(v10_1), true);
      }
      
      break;
    }
    case 'err': {
      const e = variant13.val;
      dataView(memory3).setInt8(arg1 + 0, 1, true);
      var val12 = e;
      let enum12;
      switch (val12) {
        case 'access': {
          enum12 = 0;
          break;
        }
        case 'would-block': {
          enum12 = 1;
          break;
        }
        case 'already': {
          enum12 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum12 = 3;
          break;
        }
        case 'busy': {
          enum12 = 4;
          break;
        }
        case 'deadlock': {
          enum12 = 5;
          break;
        }
        case 'quota': {
          enum12 = 6;
          break;
        }
        case 'exist': {
          enum12 = 7;
          break;
        }
        case 'file-too-large': {
          enum12 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum12 = 9;
          break;
        }
        case 'in-progress': {
          enum12 = 10;
          break;
        }
        case 'interrupted': {
          enum12 = 11;
          break;
        }
        case 'invalid': {
          enum12 = 12;
          break;
        }
        case 'io': {
          enum12 = 13;
          break;
        }
        case 'is-directory': {
          enum12 = 14;
          break;
        }
        case 'loop': {
          enum12 = 15;
          break;
        }
        case 'too-many-links': {
          enum12 = 16;
          break;
        }
        case 'message-size': {
          enum12 = 17;
          break;
        }
        case 'name-too-long': {
          enum12 = 18;
          break;
        }
        case 'no-device': {
          enum12 = 19;
          break;
        }
        case 'no-entry': {
          enum12 = 20;
          break;
        }
        case 'no-lock': {
          enum12 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum12 = 22;
          break;
        }
        case 'insufficient-space': {
          enum12 = 23;
          break;
        }
        case 'not-directory': {
          enum12 = 24;
          break;
        }
        case 'not-empty': {
          enum12 = 25;
          break;
        }
        case 'not-recoverable': {
          enum12 = 26;
          break;
        }
        case 'unsupported': {
          enum12 = 27;
          break;
        }
        case 'no-tty': {
          enum12 = 28;
          break;
        }
        case 'no-such-device': {
          enum12 = 29;
          break;
        }
        case 'overflow': {
          enum12 = 30;
          break;
        }
        case 'not-permitted': {
          enum12 = 31;
          break;
        }
        case 'pipe': {
          enum12 = 32;
          break;
        }
        case 'read-only': {
          enum12 = 33;
          break;
        }
        case 'invalid-seek': {
          enum12 = 34;
          break;
        }
        case 'text-file-busy': {
          enum12 = 35;
          break;
        }
        case 'cross-device': {
          enum12 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val12}" is not one of the cases of error-code`);
        }
      }
      dataView(memory3).setInt8(arg1 + 8, enum12, true);
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant13, valueType: typeof variant13});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.12", function="[method]descriptor.stat"][Instruction::Return]', {
    funcName: '[method]descriptor.stat',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline55.fnName = 'wasi:filesystem/types@0.2.12#stat';

const _trampoline56 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable32[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.check-write"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'checkWrite',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.checkWrite(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 0, true);
      dataView(memory3).setBigInt64(arg1 + 8, toUint64(e), true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory3).setInt8(arg1 + 8, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable31, rep);
          }
          
          dataView(memory3).setInt32(arg1 + 12, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory3).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.check-write"][Instruction::Return]', {
    funcName: '[method]output-stream.check-write',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline56.fnName = 'wasi:io/streams@0.2.12#checkWrite';

const _trampoline57 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable32[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  if (ptr3 % 1 !== 0) throw new TypeError(`list pointer [${ptr3}] is not aligned to 1`);
  var result3 = new Uint8Array(memory3.buffer.slice(ptr3, ptr3 + len3 * 1));
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.write"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'write',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet4 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.write(result3),
    })
    ;
    ret = hostRet4 !== null && typeof hostRet4 === 'object' && (hostRet4.tag === 'ok' || hostRet4.tag === 'err')
    ? hostRet4
    : { tag: 'ok', val: hostRet4};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory3).setInt8(arg3 + 0, 0, true);
      
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory3).setInt8(arg3 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case 'last-operation-failed': {
          const e = variant6.val;
          dataView(memory3).setInt8(arg3 + 4, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle5 = e[symbolRscHandle];
          if (!handle5) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle5 = rscTableCreateOwn(handleTable31, rep);
          }
          
          dataView(memory3).setInt32(arg3 + 8, handle5, true);
          break;
        }
        case 'closed': {
          dataView(memory3).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.write"][Instruction::Return]', {
    funcName: '[method]output-stream.write',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline57.fnName = 'wasi:io/streams@0.2.12#write';

const _trampoline58 = function(arg0, arg1) {
  var handle1 = arg0;
  
  var rep2 = handleTable32[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-flush"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'blockingFlush',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.blockingFlush(),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 0, true);
      
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory3).setInt8(arg1 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory3).setInt8(arg1 + 4, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable31, rep);
          }
          
          dataView(memory3).setInt32(arg1 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory3).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-flush"][Instruction::Return]', {
    funcName: '[method]output-stream.blocking-flush',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline58.fnName = 'wasi:io/streams@0.2.12#blockingFlush';

const _trampoline59 = function(arg0, arg1, arg2) {
  var handle1 = arg0;
  
  var rep2 = handleTable33[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.blocking-read"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'blockingRead',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.blockingRead(BigInt.asUintN(64, BigInt(arg1))),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory3).setInt8(arg2 + 0, 0, true);
      var val4 = e;
      var len4 = Array.isArray(val4) ? val4.length : val4.byteLength;
      var ptr4 = realloc2(0, 0, 1, len4 * 1);
      
      let valData4;
      const valLenBytes4 = len4 * 1;
      if (Array.isArray(val4)) {
        // Regular array likely containing numbers, write values to memory
        let offset = 0;
        const dv4 = new DataView(memory3.buffer);
        for (const v of val4) {
          _requireValidNumericPrimitive.bind(null, 'u8')(v);
          dv4.setUint8(ptr4+ offset, v, true);
          offset += 1;
        }
      } else {
        // TypedArray / ArrayBuffer-like, direct copy
        valData4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, valLenBytes4);
        const out4 = new Uint8Array(memory3.buffer, ptr4, valLenBytes4);
        out4.set(valData4);
      }
      
      dataView(memory3).setUint32(arg2 + 8, len4, true);
      dataView(memory3).setUint32(arg2 + 4, ptr4, true);
      
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory3).setInt8(arg2 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case 'last-operation-failed': {
          const e = variant6.val;
          dataView(memory3).setInt8(arg2 + 4, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle5 = e[symbolRscHandle];
          if (!handle5) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle5 = rscTableCreateOwn(handleTable31, rep);
          }
          
          dataView(memory3).setInt32(arg2 + 8, handle5, true);
          break;
        }
        case 'closed': {
          dataView(memory3).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.blocking-read"][Instruction::Return]', {
    funcName: '[method]input-stream.blocking-read',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline59.fnName = 'wasi:io/streams@0.2.12#blockingRead';

const _trampoline60 = function(arg0, arg1, arg2) {
  var handle1 = arg0;
  
  var rep2 = handleTable33[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.read"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'read',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet3 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.read(BigInt.asUintN(64, BigInt(arg1))),
    })
    ;
    ret = hostRet3 !== null && typeof hostRet3 === 'object' && (hostRet3.tag === 'ok' || hostRet3.tag === 'err')
    ? hostRet3
    : { tag: 'ok', val: hostRet3};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory3).setInt8(arg2 + 0, 0, true);
      var val4 = e;
      var len4 = Array.isArray(val4) ? val4.length : val4.byteLength;
      var ptr4 = realloc2(0, 0, 1, len4 * 1);
      
      let valData4;
      const valLenBytes4 = len4 * 1;
      if (Array.isArray(val4)) {
        // Regular array likely containing numbers, write values to memory
        let offset = 0;
        const dv4 = new DataView(memory3.buffer);
        for (const v of val4) {
          _requireValidNumericPrimitive.bind(null, 'u8')(v);
          dv4.setUint8(ptr4+ offset, v, true);
          offset += 1;
        }
      } else {
        // TypedArray / ArrayBuffer-like, direct copy
        valData4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, valLenBytes4);
        const out4 = new Uint8Array(memory3.buffer, ptr4, valLenBytes4);
        out4.set(valData4);
      }
      
      dataView(memory3).setUint32(arg2 + 8, len4, true);
      dataView(memory3).setUint32(arg2 + 4, ptr4, true);
      
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory3).setInt8(arg2 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case 'last-operation-failed': {
          const e = variant6.val;
          dataView(memory3).setInt8(arg2 + 4, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle5 = e[symbolRscHandle];
          if (!handle5) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle5 = rscTableCreateOwn(handleTable31, rep);
          }
          
          dataView(memory3).setInt32(arg2 + 8, handle5, true);
          break;
        }
        case 'closed': {
          dataView(memory3).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.read"][Instruction::Return]', {
    funcName: '[method]input-stream.read',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline60.fnName = 'wasi:io/streams@0.2.12#read';

const _trampoline61 = function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  
  var rep2 = handleTable32[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  if (ptr3 % 1 !== 0) throw new TypeError(`list pointer [${ptr3}] is not aligned to 1`);
  var result3 = new Uint8Array(memory3.buffer.slice(ptr3, ptr3 + len3 * 1));
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-write-and-flush"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'blockingWriteAndFlush',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'result-catch-handler',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  try {
    const hostRet4 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => rsc0.blockingWriteAndFlush(result3),
    })
    ;
    ret = hostRet4 !== null && typeof hostRet4 === 'object' && (hostRet4.tag === 'ok' || hostRet4.tag === 'err')
    ? hostRet4
    : { tag: 'ok', val: hostRet4};
  } catch (e) {
    if (getOrCreateAsyncState(10).markTrapped(e)) { throw e; }
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case 'ok': {
      const e = variant7.val;
      dataView(memory3).setInt8(arg3 + 0, 0, true);
      
      break;
    }
    case 'err': {
      const e = variant7.val;
      dataView(memory3).setInt8(arg3 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case 'last-operation-failed': {
          const e = variant6.val;
          dataView(memory3).setInt8(arg3 + 4, 0, true);
          
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error\" resource.');
          }
          var handle5 = e[symbolRscHandle];
          if (!handle5) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle5 = rscTableCreateOwn(handleTable31, rep);
          }
          
          dataView(memory3).setInt32(arg3 + 8, handle5, true);
          break;
        }
        case 'closed': {
          dataView(memory3).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`StreamError\``);
        }
      }
      
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7});
      throw new TypeError('invalid variant specified for result');
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-write-and-flush"][Instruction::Return]', {
    funcName: '[method]output-stream.blocking-write-and-flush',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline61.fnName = 'wasi:io/streams@0.2.12#blockingWriteAndFlush';

const _trampoline62 = function(arg0) {
  _debugLog('[iface="wasi:cli/environment@0.2.12", function="get-environment"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getEnvironment',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getEnvironment(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc2(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;var [tuple0_0, tuple0_1] = e;
    
    var encodeRes = _utf8AllocateAndEncode(tuple0_0, realloc2, memory3);
    var ptr1= encodeRes.ptr;
    var len1 = encodeRes.len;
    
    dataView(memory3).setUint32(base + 4, len1, true);
    dataView(memory3).setUint32(base + 0, ptr1, true);
    
    var encodeRes = _utf8AllocateAndEncode(tuple0_1, realloc2, memory3);
    var ptr2= encodeRes.ptr;
    var len2 = encodeRes.len;
    
    dataView(memory3).setUint32(base + 12, len2, true);
    dataView(memory3).setUint32(base + 8, ptr2, true);
  }
  dataView(memory3).setUint32(arg0 + 4, len3, true);
  dataView(memory3).setUint32(arg0 + 0, result3, true);
  _debugLog('[iface="wasi:cli/environment@0.2.12", function="get-environment"][Instruction::Return]', {
    funcName: 'get-environment',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline62.fnName = 'wasi:cli/environment@0.2.12#getEnvironment';

const _trampoline63 = function(arg0) {
  _debugLog('[iface="wasi:filesystem/preopens@0.2.12", function="get-directories"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getDirectories',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getDirectories(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc2(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid \"Descriptor\" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt5;
      captureTable5.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable30, rep);
    }
    
    dataView(memory3).setInt32(base + 0, handle1, true);
    
    var encodeRes = _utf8AllocateAndEncode(tuple0_1, realloc2, memory3);
    var ptr2= encodeRes.ptr;
    var len2 = encodeRes.len;
    
    dataView(memory3).setUint32(base + 8, len2, true);
    dataView(memory3).setUint32(base + 4, ptr2, true);
  }
  dataView(memory3).setUint32(arg0 + 4, len3, true);
  dataView(memory3).setUint32(arg0 + 0, result3, true);
  _debugLog('[iface="wasi:filesystem/preopens@0.2.12", function="get-directories"][Instruction::Return]', {
    funcName: 'get-directories',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline63.fnName = 'wasi:filesystem/preopens@0.2.12#getDirectories';

const _trampoline64 = function(arg0, arg1) {
  _debugLog('[iface="wasi:random/random@0.2.12", function="get-random-bytes"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getRandomBytes',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getRandomBytes(BigInt.asUintN(64, BigInt(arg0))),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  var val0 = ret;
  var len0 = Array.isArray(val0) ? val0.length : val0.byteLength;
  var ptr0 = realloc2(0, 0, 1, len0 * 1);
  
  let valData0;
  const valLenBytes0 = len0 * 1;
  if (Array.isArray(val0)) {
    // Regular array likely containing numbers, write values to memory
    let offset = 0;
    const dv0 = new DataView(memory3.buffer);
    for (const v of val0) {
      _requireValidNumericPrimitive.bind(null, 'u8')(v);
      dv0.setUint8(ptr0+ offset, v, true);
      offset += 1;
    }
  } else {
    // TypedArray / ArrayBuffer-like, direct copy
    valData0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, valLenBytes0);
    const out0 = new Uint8Array(memory3.buffer, ptr0, valLenBytes0);
    out0.set(valData0);
  }
  
  dataView(memory3).setUint32(arg1 + 4, len0, true);
  dataView(memory3).setUint32(arg1 + 0, ptr0, true);
  _debugLog('[iface="wasi:random/random@0.2.12", function="get-random-bytes"][Instruction::Return]', {
    funcName: 'get-random-bytes',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline64.fnName = 'wasi:random/random@0.2.12#getRandomBytes';

const handleTable34 = [T_FLAG, 0];
handleTable34._createdReps = new Set();


const captureTable3= new Map();
let captureCnt3= 0;

HANDLE_TABLES[34] = handleTable34;

const _trampoline65 = function(arg0) {
  _debugLog('[iface="wasi:cli/terminal-stdin@0.2.12", function="get-terminal-stdin"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getTerminalStdin',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getTerminalStdin(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory3).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory3).setInt8(arg0 + 0, 1, true);
    
    if (!(e instanceof TerminalInput)) {
      throw new TypeError('Resource error: Not a valid \"TerminalInput\" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt3;
      captureTable3.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable34, rep);
    }
    
    dataView(memory3).setInt32(arg0 + 4, handle0, true);
  }
  _debugLog('[iface="wasi:cli/terminal-stdin@0.2.12", function="get-terminal-stdin"][Instruction::Return]', {
    funcName: 'get-terminal-stdin',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline65.fnName = 'wasi:cli/terminal-stdin@0.2.12#getTerminalStdin';

const handleTable35 = [T_FLAG, 0];
handleTable35._createdReps = new Set();


const captureTable4= new Map();
let captureCnt4= 0;

HANDLE_TABLES[35] = handleTable35;

const _trampoline66 = function(arg0) {
  _debugLog('[iface="wasi:cli/terminal-stdout@0.2.12", function="get-terminal-stdout"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getTerminalStdout',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getTerminalStdout(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory3).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory3).setInt8(arg0 + 0, 1, true);
    
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid \"TerminalOutput\" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt4;
      captureTable4.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable35, rep);
    }
    
    dataView(memory3).setInt32(arg0 + 4, handle0, true);
  }
  _debugLog('[iface="wasi:cli/terminal-stdout@0.2.12", function="get-terminal-stdout"][Instruction::Return]', {
    funcName: 'get-terminal-stdout',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline66.fnName = 'wasi:cli/terminal-stdout@0.2.12#getTerminalStdout';

const _trampoline67 = function(arg0) {
  _debugLog('[iface="wasi:cli/terminal-stderr@0.2.12", function="get-terminal-stderr"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  
  let parentTask;
  let task;
  let subtask;
  
  const createTask = () => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: 'getTerminalStderr',
      getCallbackFn: () => null,
      callbackFnName: null,
      errHandling: 'none',
      callingWasmExport: false,
    });
    task = results[0];
  };
  
  taskCreation: {
    parentTask = getCurrentTask(
    10,
    _getGlobalCurrentTaskMeta(10)?.taskID,
    )?.task;
    
    if (!parentTask) {
      createTask();
      break taskCreation;
    }
    
    createTask();
    
    if (hostProvided) {
      subtask = parentTask.getLatestSubtask();
      if (!subtask) {
        throw new Error(`Missing subtask (in parent task [${parentTask.id()}]) for host import, has the import been lowered? (ensure asyncImports are set properly)`);
      }
      task.setParentSubtask(subtask);
    }
  }
  
  const started = task.enterSync();
  
  let ret;
  
  try {
    ret = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: () => getTerminalStderr(),
    })
    ;
  } catch (err) {
    
    _debugLog('[Instruction::CallInterface] error during sync call', {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err,
    });
    getOrCreateAsyncState(10).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
    
  }
  
  var variant1 = ret;
  if (variant1 === null || variant1=== undefined) {
    dataView(memory3).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory3).setInt8(arg0 + 0, 1, true);
    
    if (!(e instanceof TerminalOutput)) {
      throw new TypeError('Resource error: Not a valid \"TerminalOutput\" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep = e[symbolRscRep] || ++captureCnt4;
      captureTable4.set(rep, e);
      handle0 = rscTableCreateOwn(handleTable35, rep);
    }
    
    dataView(memory3).setInt32(arg0 + 4, handle0, true);
  }
  _debugLog('[iface="wasi:cli/terminal-stderr@0.2.12", function="get-terminal-stderr"][Instruction::Return]', {
    funcName: 'get-terminal-stderr',
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}
_trampoline67.fnName = 'wasi:cli/terminal-stderr@0.2.12#getTerminalStderr';
let exports16;
let realloc3;
let realloc3Async;
let postReturn0;
let postReturn0Async;

const handleTable2 = [T_FLAG, 0];
handleTable2._createdReps = new Set();

HANDLE_TABLES[2] = handleTable2;

const handleTable0 = [T_FLAG, 0];
handleTable0._createdReps = new Set();

HANDLE_TABLES[0] = handleTable0;

const handleTable1 = [T_FLAG, 0];
handleTable1._createdReps = new Set();

HANDLE_TABLES[1] = handleTable1;

const handleTable5 = [T_FLAG, 0];
handleTable5._createdReps = new Set();

HANDLE_TABLES[5] = handleTable5;

const handleTable3 = [T_FLAG, 0];
handleTable3._createdReps = new Set();

HANDLE_TABLES[3] = handleTable3;

const handleTable4 = [T_FLAG, 0];
handleTable4._createdReps = new Set();

HANDLE_TABLES[4] = handleTable4;
let exports13HandleCloudflare;

function handleCloudflare(arg0, arg1, arg2) {
  
  const hostProvided = false;
  getOrCreateAsyncState(10).throwIfTrapped();
  
  const [task, _wasm_call_currentTaskID] = createNewCurrentTask({
    componentIdx: 10,
    isAsync: false,
    isManualAsync: false,
    preserveFutureResult: false,
    entryFnName: 'exports13HandleCloudflare',
    getCallbackFn: () => null,
    callbackFnName: null,
    errHandling: 'none',
    callingWasmExport: true,
  });
  
  const started = task.enterSync();
  
  if (3!== null) {
    task.setReturnMemoryIdx(3);
    task.setReturnMemory(() => memory3());
  }
  
  
  return _withGlobalCurrentTaskMeta({
    taskID: task.id(),
    componentIdx: task.componentIdx(),
    fn: () => {
      try {
        
        
        var encodeRes = _utf8AllocateAndEncode(arg0, realloc3, memory3);
        var ptr0= encodeRes.ptr;
        var len0 = encodeRes.len;
        
        
        var encodeRes = _utf8AllocateAndEncode(arg1, realloc3, memory3);
        var ptr1= encodeRes.ptr;
        var len1 = encodeRes.len;
        
        var val2 = arg2;
        var len2 = Array.isArray(val2) ? val2.length : val2.byteLength;
        var ptr2 = realloc3(0, 0, 1, len2 * 1);
        
        let valData2;
        const valLenBytes2 = len2 * 1;
        if (Array.isArray(val2)) {
          // Regular array likely containing numbers, write values to memory
          let offset = 0;
          const dv2 = new DataView(memory3.buffer);
          for (const v of val2) {
            _requireValidNumericPrimitive.bind(null, 'u8')(v);
            dv2.setUint8(ptr2+ offset, v, true);
            offset += 1;
          }
        } else {
          // TypedArray / ArrayBuffer-like, direct copy
          valData2 = new Uint8Array(val2.buffer || val2, val2.byteOffset, valLenBytes2);
          const out2 = new Uint8Array(memory3.buffer, ptr2, valLenBytes2);
          out2.set(valData2);
        }
        
        _debugLog('[iface="handle-cloudflare", function="handle-cloudflare"][Instruction::CallWasm] enter', {
          funcName: 'handle-cloudflare',
          paramCount: 6,
          async: false,
          postReturn: true,
        });
        
        let ret;
        
        try {
          ret =  exports13HandleCloudflare(ptr0, len0, ptr1, len1, ptr2, len2);
        } catch (err) {
          
          _debugLog('[Instruction::CallWasm] error during sync call', {
            taskID: task.id(),
            err,
          });
          getOrCreateAsyncState(10).markTrapped(err);
          task.setErrored(err);
          task.reject(err);
          task.exit();
          throw err;
          
        }
        
        var ptr3 = dataView(memory3).getUint32(ret + 4, true);
        var len3 = dataView(memory3).getUint32(ret + 8, true);
        var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory3.buffer, ptr3, len3));
        let variant5;
        switch (dataView(memory3).getUint8(ret + 12, true)) {
          case 0: {
            variant5 = undefined;
            break;
          }
          case 1: {
            var ptr4 = dataView(memory3).getUint32(ret + 16, true);
            var len4 = dataView(memory3).getUint32(ret + 20, true);
            var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory3.buffer, ptr4, len4));
            variant5 = result4;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        var ptr6 = dataView(memory3).getUint32(ret + 24, true);
        var len6 = dataView(memory3).getUint32(ret + 28, true);
        if (ptr6 % 1 !== 0) throw new TypeError(`list pointer [${ptr6}] is not aligned to 1`);
        var result6 = new Uint8Array(memory3.buffer.slice(ptr6, ptr6 + len6 * 1));
        _debugLog('[iface="handle-cloudflare", function="handle-cloudflare"][Instruction::Return]', {
          funcName: 'handle-cloudflare',
          paramCount: 1,
          async: false,
          postReturn: true
        });
        task.resolve([[clampGuest(dataView(memory3).getUint16(ret + 0, true), 0, 65535), result3, variant5, result6]]);
        const retCopy = [clampGuest(dataView(memory3).getUint16(ret + 0, true), 0, 65535), result3, variant5, result6];
        
        let cstate = getOrCreateAsyncState(10);
        cstate.mayLeave = false;
        postReturn0(ret);
        cstate.mayLeave = true;
        task.exit();
        return retCopy;
        
        
      } catch (err) {
        if (!task.isResolvedState()) {
          task.setErrored(err);
          task.reject(err);
        }
        if (!task.isExited()) { task.exit({ skipExclusiveLockCheck: true }); }
        throw err;
      }
    },
  });
  
}
function trampoline0(handle) {
  const handleEntry = rscTableRemove(handleTable7, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable5.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable5.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline1(handle) {
  const handleEntry = rscTableRemove(handleTable8, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (OutputStream[symbolCabiDispose]) {
      OutputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline2(handle) {
  const handleEntry = rscTableRemove(handleTable10, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline3(handle) {
  const handleEntry = rscTableRemove(handleTable9, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable2.delete(handleEntry.rep);
    } else if (InputStream[symbolCabiDispose]) {
      InputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let trampoline4 = _trampoline4.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 4,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline4.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 3,
    lowerFn: 
    function lowerImportedOwnedHost_OutputStream(obj) {
      if (!(obj instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, obj);
        handle = rscTableCreateOwn(handleTable1, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline4,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 4,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline4.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 3,
    lowerFn: 
    function lowerImportedOwnedHost_OutputStream(obj) {
      if (!(obj instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, obj);
        handle = rscTableCreateOwn(handleTable1, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline4,
},
);
let trampoline5 = _trampoline5.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 5,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline5.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 3,
    lowerFn: 
    function lowerImportedOwnedHost_InputStream(obj) {
      if (!(obj instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid \"InputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, obj);
        handle = rscTableCreateOwn(handleTable2, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline5,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 5,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline5.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 3,
    lowerFn: 
    function lowerImportedOwnedHost_InputStream(obj) {
      if (!(obj instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid \"InputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, obj);
        handle = rscTableCreateOwn(handleTable2, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline5,
},
);
let trampoline6 = _trampoline6.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 6,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline6.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 3,
    lowerFn: 
    function lowerImportedOwnedHost_OutputStream(obj) {
      if (!(obj instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, obj);
        handle = rscTableCreateOwn(handleTable1, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline6,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 6,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline6.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 3,
    lowerFn: 
    function lowerImportedOwnedHost_OutputStream(obj) {
      if (!(obj instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, obj);
        handle = rscTableCreateOwn(handleTable1, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline6,
},
);
let trampoline7 = _trampoline7.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 7,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline7.manuallyAsync,
  paramLiftFns: [
  _liftFlatResult({
    caseMetas: [['ok', null, 0, 0, 0, []],['err', null, 0, 0, 0, []],],
    variantSize32: 1,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 1,
    variantPayloadFlatTypes: [],
  })
  ],
  resultLowerFns: [],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline7,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 7,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline7.manuallyAsync,
  paramLiftFns: [
  _liftFlatResult({
    caseMetas: [['ok', null, 0, 0, 0, []],['err', null, 0, 0, 0, []],],
    variantSize32: 1,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 1,
    variantPayloadFlatTypes: [],
  })
  ],
  resultLowerFns: [],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline7,
},
);
let trampoline8 = _trampoline8.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 8,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline8.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatStringAny],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline8,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 8,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline8.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatStringAny],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc0,
  importFn: _trampoline8,
},
);
let trampoline9 = _trampoline9.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 9,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline9.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatStringAny, 8, 4],[_lowerFlatStringAny, 8, 4],], size32: 16, align32: 4 }),
    elemSize32: 16,
    elemAlign32: 4,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc1,
  importFn: _trampoline9,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 9,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline9.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatStringAny, 8, 4],[_lowerFlatStringAny, 8, 4],], size32: 16, align32: 4 }),
    elemSize32: 16,
    elemAlign32: 4,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc1,
  importFn: _trampoline9,
},
);
let trampoline10 = _trampoline10.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 10,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline10.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 10)],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1, 1],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline10,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 10,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline10.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 10)],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1, 1],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline10,
},
);
let trampoline11 = _trampoline11.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 11,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline11.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 3,
      lowerFn: 
      function lowerImportedOwnedHost_OutputStream(obj) {
        if (!(obj instanceof OutputStream)) {
          throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, obj);
          handle = rscTableCreateOwn(handleTable1, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline11,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 11,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline11.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 3,
      lowerFn: 
      function lowerImportedOwnedHost_OutputStream(obj) {
        if (!(obj instanceof OutputStream)) {
          throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, obj);
          handle = rscTableCreateOwn(handleTable1, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline11,
},
);
let trampoline12 = _trampoline12.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 12,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline12.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 3,
      lowerFn: 
      function lowerImportedOwnedHost_OutputStream(obj) {
        if (!(obj instanceof OutputStream)) {
          throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, obj);
          handle = rscTableCreateOwn(handleTable1, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline12,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 12,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline12.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 3,
      lowerFn: 
      function lowerImportedOwnedHost_OutputStream(obj) {
        if (!(obj instanceof OutputStream)) {
          throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, obj);
          handle = rscTableCreateOwn(handleTable1, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline12,
},
);
let trampoline13 = _trampoline13.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 13,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline13.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline13,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 13,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline13.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline13,
},
);
let trampoline14 = _trampoline14.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 14,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline14.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['type', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1 ],['linkCount', _lowerFlatU64, 8, 8 ],['size', _lowerFlatU64, 8, 8 ],['dataAccessTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['dataModificationTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['statusChangeTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],], size32: 96, align32: 8 }), 104, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 104, 8, 8 ],
    ],
    variantSize32: 104,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 13,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline14,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 14,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline14.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 7)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['type', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1 ],['linkCount', _lowerFlatU64, 8, 8 ],['size', _lowerFlatU64, 8, 8 ],['dataAccessTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['dataModificationTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['statusChangeTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],], size32: 96, align32: 8 }), 104, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 104, 8, 8 ],
    ],
    variantSize32: 104,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 13,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline14,
},
);
let trampoline15 = _trampoline15.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 15,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline15.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatU64, 16, 8, 8 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 3,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 16, 8, 8 ],
    ],
    variantSize32: 16,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline15,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 15,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline15.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatU64, 16, 8, 8 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 3,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 16, 8, 8 ],
    ],
    variantSize32: 16,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline15,
},
);
let trampoline16 = _trampoline16.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 16,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline16.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8),_liftFlatList({
    elemLiftFn: _liftFlatU8,
    elemAlign32: 1,
    elemSize32: 1,
    typedArray: Uint8Array,
  })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 3,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline16,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 16,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline16.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8),_liftFlatList({
    elemLiftFn: _liftFlatU8,
    elemAlign32: 1,
    elemSize32: 1,
    typedArray: Uint8Array,
  })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 3,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline16,
},
);
let trampoline17 = _trampoline17.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 17,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline17.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 3,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline17,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 17,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline17.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 3,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline17,
},
);
let trampoline18 = _trampoline18.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 18,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline18.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8),_liftFlatList({
    elemLiftFn: _liftFlatU8,
    elemAlign32: 1,
    elemSize32: 1,
    typedArray: Uint8Array,
  })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 3,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline18,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 18,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline18.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 8),_liftFlatList({
    elemLiftFn: _liftFlatU8,
    elemAlign32: 1,
    elemSize32: 1,
    typedArray: Uint8Array,
  })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 3,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: undefined,
  importFn: _trampoline18,
},
);
let trampoline19 = _trampoline19.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 19,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline19.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: 
      function lowerImportedOwnedHost_Descriptor(obj) {
        if (!(obj instanceof Descriptor)) {
          throw new TypeError('Resource error: Not a valid \"Descriptor\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt5;
          captureTable5.set(rep, obj);
          handle = rscTableCreateOwn(handleTable5, rep);
        }
        return handle;
      }
      ,
    }), 4, 4],[_lowerFlatStringAny, 8, 4],], size32: 12, align32: 4 }),
    elemSize32: 12,
    elemAlign32: 4,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc1,
  importFn: _trampoline19,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 19,
  componentIdx: 3,
  isAsync: false,
  isManualAsync: _trampoline19.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: 
      function lowerImportedOwnedHost_Descriptor(obj) {
        if (!(obj instanceof Descriptor)) {
          throw new TypeError('Resource error: Not a valid \"Descriptor\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt5;
          captureTable5.set(rep, obj);
          handle = rscTableCreateOwn(handleTable5, rep);
        }
        return handle;
      }
      ,
    }), 4, 4],[_lowerFlatStringAny, 8, 4],], size32: 12, align32: 4 }),
    elemSize32: 12,
    elemAlign32: 4,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 0,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory0,
  getReallocFn: () => realloc1,
  importFn: _trampoline19,
},
);

const handleTable11 = [T_FLAG, 0];
handleTable11._createdReps = new Set();
const finalizationRegistry11 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable11, handle);
  exports4['3'](rep);
});

HANDLE_TABLES[11] = handleTable11;
const trampoline20 = rscTableCreateOwn.bind(null, handleTable11);

const handleTable12 = [T_FLAG, 0];
handleTable12._createdReps = new Set();
const finalizationRegistry12 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable12, handle);
  exports4['4'](rep);
});

HANDLE_TABLES[12] = handleTable12;
const trampoline21 = rscTableCreateOwn.bind(null, handleTable12);

const handleTable13 = [T_FLAG, 0];
handleTable13._createdReps = new Set();
const finalizationRegistry13 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable13, handle);
  exports4['2'](rep);
});

HANDLE_TABLES[13] = handleTable13;
const trampoline22 = rscTableCreateOwn.bind(null, handleTable13);

const trampoline24 = _symmetricSyncGuestCallEnter;

const trampoline26 = _symmetricSyncGuestCallExit;

const trampoline29 = resourceTransferOwn;
const trampoline30 = resourceTransferBorrow;
function trampoline32(handle) {
  const handleEntry = rscTableRemove(handleTable31, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}

const handleTable29 = [T_FLAG, 0];
handleTable29._createdReps = new Set();


const captureTable6= new Map();
let captureCnt6= 0;

HANDLE_TABLES[29] = handleTable29;
function trampoline33(handle) {
  const handleEntry = rscTableRemove(handleTable29, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable trampoline for resource [ResourceIndex(6)]')
  }
}
function trampoline34(handle) {
  const handleEntry = rscTableRemove(handleTable30, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable5.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable5.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline35(handle) {
  const handleEntry = rscTableRemove(handleTable32, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (OutputStream[symbolCabiDispose]) {
      OutputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline36(handle) {
  const handleEntry = rscTableRemove(handleTable33, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable2.delete(handleEntry.rep);
    } else if (InputStream[symbolCabiDispose]) {
      InputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let trampoline37 = _trampoline37.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 37,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline37.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 10,
    lowerFn: 
    function lowerImportedOwnedHost_OutputStream(obj) {
      if (!(obj instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, obj);
        handle = rscTableCreateOwn(handleTable1, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline37,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 37,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline37.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 10,
    lowerFn: 
    function lowerImportedOwnedHost_OutputStream(obj) {
      if (!(obj instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, obj);
        handle = rscTableCreateOwn(handleTable1, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline37,
},
);
let trampoline38 = _trampoline38.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 38,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline38.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 10,
    lowerFn: 
    function lowerImportedOwnedHost_InputStream(obj) {
      if (!(obj instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid \"InputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, obj);
        handle = rscTableCreateOwn(handleTable2, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline38,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 38,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline38.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 10,
    lowerFn: 
    function lowerImportedOwnedHost_InputStream(obj) {
      if (!(obj instanceof InputStream)) {
        throw new TypeError('Resource error: Not a valid \"InputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep, obj);
        handle = rscTableCreateOwn(handleTable2, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline38,
},
);
let trampoline39 = _trampoline39.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 39,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline39.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 10,
    lowerFn: 
    function lowerImportedOwnedHost_OutputStream(obj) {
      if (!(obj instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, obj);
        handle = rscTableCreateOwn(handleTable1, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline39,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 39,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline39.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatOwn({
    componentIdx: 10,
    lowerFn: 
    function lowerImportedOwnedHost_OutputStream(obj) {
      if (!(obj instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
      }
      let handle = obj[symbolRscHandle];
      if (!handle) {
        const rep = obj[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, obj);
        handle = rscTableCreateOwn(handleTable1, rep);
      }
      return handle;
    }
    ,
  })],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline39,
},
);
function trampoline40(handle) {
  const handleEntry = rscTableRemove(handleTable34, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable3.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable3.delete(handleEntry.rep);
    } else if (TerminalInput[symbolCabiDispose]) {
      TerminalInput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline41(handle) {
  const handleEntry = rscTableRemove(handleTable35, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable4.delete(handleEntry.rep);
    } else if (TerminalOutput[symbolCabiDispose]) {
      TerminalOutput[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let trampoline42 = _trampoline42.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 42,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline42.manuallyAsync,
  paramLiftFns: [
  _liftFlatResult({
    caseMetas: [['ok', null, 0, 0, 0, []],['err', null, 0, 0, 0, []],],
    variantSize32: 1,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 1,
    variantPayloadFlatTypes: [],
  })
  ],
  resultLowerFns: [],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline42,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 42,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline42.manuallyAsync,
  paramLiftFns: [
  _liftFlatResult({
    caseMetas: [['ok', null, 0, 0, 0, []],['err', null, 0, 0, 0, []],],
    variantSize32: 1,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 1,
    variantPayloadFlatTypes: [],
  })
  ],
  resultLowerFns: [],
  hasResultPointer: false,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: null,
  stringEncoding: 'utf8',
  getMemoryFn: () => null,
  getReallocFn: undefined,
  importFn: _trampoline42,
},
);
let trampoline45 = _trampoline45.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 45,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline45.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 31)],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1, 1],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline45,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 45,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline45.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 31)],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1, 1],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline45,
},
);
let trampoline46 = _trampoline46.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 46,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline46.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['lower', _lowerFlatU64, 8, 8 ],['upper', _lowerFlatU64, 8, 8 ],], size32: 16, align32: 8 }), 24, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 24, 8, 8 ],
    ],
    variantSize32: 24,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline46,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 46,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline46.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['lower', _lowerFlatU64, 8, 8 ],['upper', _lowerFlatU64, 8, 8 ],], size32: 16, align32: 8 }), 24, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 24, 8, 8 ],
    ],
    variantSize32: 24,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline46,
},
);
let trampoline47 = _trampoline47.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 47,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline47.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatFlags({ names: ['symlinkFollow'], size32: 1, align32: 1, intSizeBytes: 1 }),_liftFlatStringAny],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['lower', _lowerFlatU64, 8, 8 ],['upper', _lowerFlatU64, 8, 8 ],], size32: 16, align32: 8 }), 24, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 24, 8, 8 ],
    ],
    variantSize32: 24,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline47,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 47,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline47.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatFlags({ names: ['symlinkFollow'], size32: 1, align32: 1, intSizeBytes: 1 }),_liftFlatStringAny],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['lower', _lowerFlatU64, 8, 8 ],['upper', _lowerFlatU64, 8, 8 ],], size32: 16, align32: 8 }), 24, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 24, 8, 8 ],
    ],
    variantSize32: 24,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline47,
},
);
let trampoline48 = _trampoline48.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 48,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline48.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatFlags({ names: ['read','write','fileIntegritySync','dataIntegritySync','requestedWriteSync','mutateDirectory'], size32: 1, align32: 1, intSizeBytes: 1 }), 2, 1, 1 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline48,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 48,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline48.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatFlags({ names: ['read','write','fileIntegritySync','dataIntegritySync','requestedWriteSync','mutateDirectory'], size32: 1, align32: 1, intSizeBytes: 1 }), 2, 1, 1 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline48,
},
);
let trampoline49 = _trampoline49.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 49,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline49.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline49,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 49,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline49.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 2, 1, 1 ],
    ],
    variantSize32: 2,
    variantAlign32: 1,
    variantPayloadOffset32: 1,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline49,
},
);
let trampoline50 = _trampoline50.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 50,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline50.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_OutputStream(obj) {
        if (!(obj instanceof OutputStream)) {
          throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, obj);
          handle = rscTableCreateOwn(handleTable1, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline50,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 50,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline50.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_OutputStream(obj) {
        if (!(obj instanceof OutputStream)) {
          throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, obj);
          handle = rscTableCreateOwn(handleTable1, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline50,
},
);
let trampoline51 = _trampoline51.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 51,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline51.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatFlags({ names: ['symlinkFollow'], size32: 1, align32: 1, intSizeBytes: 1 }),_liftFlatStringAny],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['type', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1 ],['linkCount', _lowerFlatU64, 8, 8 ],['size', _lowerFlatU64, 8, 8 ],['dataAccessTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['dataModificationTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['statusChangeTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],], size32: 96, align32: 8 }), 104, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 104, 8, 8 ],
    ],
    variantSize32: 104,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 13,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline51,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 51,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline51.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatFlags({ names: ['symlinkFollow'], size32: 1, align32: 1, intSizeBytes: 1 }),_liftFlatStringAny],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['type', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1 ],['linkCount', _lowerFlatU64, 8, 8 ],['size', _lowerFlatU64, 8, 8 ],['dataAccessTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['dataModificationTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['statusChangeTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],], size32: 96, align32: 8 }), 104, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 104, 8, 8 ],
    ],
    variantSize32: 104,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 13,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline51,
},
);
let trampoline52 = _trampoline52.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 52,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline52.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatFlags({ names: ['symlinkFollow'], size32: 1, align32: 1, intSizeBytes: 1 }),_liftFlatStringAny,_liftFlatFlags({ names: ['create','directory','exclusive','truncate'], size32: 1, align32: 1, intSizeBytes: 1 }),_liftFlatFlags({ names: ['read','write','fileIntegritySync','dataIntegritySync','requestedWriteSync','mutateDirectory'], size32: 1, align32: 1, intSizeBytes: 1 })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_Descriptor(obj) {
        if (!(obj instanceof Descriptor)) {
          throw new TypeError('Resource error: Not a valid \"Descriptor\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt5;
          captureTable5.set(rep, obj);
          handle = rscTableCreateOwn(handleTable5, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline52,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 52,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline52.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatFlags({ names: ['symlinkFollow'], size32: 1, align32: 1, intSizeBytes: 1 }),_liftFlatStringAny,_liftFlatFlags({ names: ['create','directory','exclusive','truncate'], size32: 1, align32: 1, intSizeBytes: 1 }),_liftFlatFlags({ names: ['read','write','fileIntegritySync','dataIntegritySync','requestedWriteSync','mutateDirectory'], size32: 1, align32: 1, intSizeBytes: 1 })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_Descriptor(obj) {
        if (!(obj instanceof Descriptor)) {
          throw new TypeError('Resource error: Not a valid \"Descriptor\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt5;
          captureTable5.set(rep, obj);
          handle = rscTableCreateOwn(handleTable5, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline52,
},
);
let trampoline53 = _trampoline53.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 53,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline53.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_InputStream(obj) {
        if (!(obj instanceof InputStream)) {
          throw new TypeError('Resource error: Not a valid \"InputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt2;
          captureTable2.set(rep, obj);
          handle = rscTableCreateOwn(handleTable2, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline53,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 53,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline53.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_InputStream(obj) {
        if (!(obj instanceof InputStream)) {
          throw new TypeError('Resource error: Not a valid \"InputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt2;
          captureTable2.set(rep, obj);
          handle = rscTableCreateOwn(handleTable2, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline53,
},
);
let trampoline54 = _trampoline54.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 54,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline54.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_OutputStream(obj) {
        if (!(obj instanceof OutputStream)) {
          throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, obj);
          handle = rscTableCreateOwn(handleTable1, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline54,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 54,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline54.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_OutputStream(obj) {
        if (!(obj instanceof OutputStream)) {
          throw new TypeError('Resource error: Not a valid \"OutputStream\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep, obj);
          handle = rscTableCreateOwn(handleTable1, rep);
        }
        return handle;
      }
      ,
    }), 8, 4, 4 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 8, 4, 4 ],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline54,
},
);
let trampoline55 = _trampoline55.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 55,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline55.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['type', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1 ],['linkCount', _lowerFlatU64, 8, 8 ],['size', _lowerFlatU64, 8, 8 ],['dataAccessTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['dataModificationTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['statusChangeTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],], size32: 96, align32: 8 }), 104, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 104, 8, 8 ],
    ],
    variantSize32: 104,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 13,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline55,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 55,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline55.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 30)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatRecord({ fieldMetas: [['type', 
    _lowerFlatEnum({
      caseMetas: [['unknown', null, 1, 1, 1],['block-device', null, 1, 1, 1],['character-device', null, 1, 1, 1],['directory', null, 1, 1, 1],['fifo', null, 1, 1, 1],['symbolic-link', null, 1, 1, 1],['regular-file', null, 1, 1, 1],['socket', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 1, 1 ],['linkCount', _lowerFlatU64, 8, 8 ],['size', _lowerFlatU64, 8, 8 ],['dataAccessTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['dataModificationTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],['statusChangeTimestamp', 
    _lowerFlatOption({
      caseMetas: [
      [ 'none', null, 0, 0, 0 ],
      [ 'some', _lowerFlatRecord({ fieldMetas: [['seconds', _lowerFlatU64, 8, 8 ],['nanoseconds', _lowerFlatU32, 4, 4 ],], size32: 16, align32: 8 }), 16, 8, 2],
      ],
      variantSize32: 24,
      variantAlign32: 8,
      variantPayloadOffset32: 8,
      variantFlatCount: 3,
    })
    , 24, 8 ],], size32: 96, align32: 8 }), 104, 8, 8 ],
    [ 'err', 
    _lowerFlatEnum({
      caseMetas: [['access', null, 1, 1, 1],['would-block', null, 1, 1, 1],['already', null, 1, 1, 1],['bad-descriptor', null, 1, 1, 1],['busy', null, 1, 1, 1],['deadlock', null, 1, 1, 1],['quota', null, 1, 1, 1],['exist', null, 1, 1, 1],['file-too-large', null, 1, 1, 1],['illegal-byte-sequence', null, 1, 1, 1],['in-progress', null, 1, 1, 1],['interrupted', null, 1, 1, 1],['invalid', null, 1, 1, 1],['io', null, 1, 1, 1],['is-directory', null, 1, 1, 1],['loop', null, 1, 1, 1],['too-many-links', null, 1, 1, 1],['message-size', null, 1, 1, 1],['name-too-long', null, 1, 1, 1],['no-device', null, 1, 1, 1],['no-entry', null, 1, 1, 1],['no-lock', null, 1, 1, 1],['insufficient-memory', null, 1, 1, 1],['insufficient-space', null, 1, 1, 1],['not-directory', null, 1, 1, 1],['not-empty', null, 1, 1, 1],['not-recoverable', null, 1, 1, 1],['unsupported', null, 1, 1, 1],['no-tty', null, 1, 1, 1],['no-such-device', null, 1, 1, 1],['overflow', null, 1, 1, 1],['not-permitted', null, 1, 1, 1],['pipe', null, 1, 1, 1],['read-only', null, 1, 1, 1],['invalid-seek', null, 1, 1, 1],['text-file-busy', null, 1, 1, 1],['cross-device', null, 1, 1, 1],],
      variantSize32: 1,
      variantAlign32: 1,
      variantPayloadOffset32: 1,
      variantFlatCount: 1,
    })
    , 104, 8, 8 ],
    ],
    variantSize32: 104,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 13,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline55,
},
);
let trampoline56 = _trampoline56.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 56,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline56.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 32)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatU64, 16, 8, 8 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 16, 8, 8 ],
    ],
    variantSize32: 16,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline56,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 56,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline56.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 32)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatU64, 16, 8, 8 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 16, 8, 8 ],
    ],
    variantSize32: 16,
    variantAlign32: 8,
    variantPayloadOffset32: 8,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline56,
},
);
let trampoline57 = _trampoline57.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 57,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline57.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 32),_liftFlatList({
    elemLiftFn: _liftFlatU8,
    elemAlign32: 1,
    elemSize32: 1,
    typedArray: Uint8Array,
  })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline57,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 57,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline57.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 32),_liftFlatList({
    elemLiftFn: _liftFlatU8,
    elemAlign32: 1,
    elemSize32: 1,
    typedArray: Uint8Array,
  })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline57,
},
);
let trampoline58 = _trampoline58.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 58,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline58.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 32)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline58,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 58,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline58.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 32)],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline58,
},
);
let trampoline59 = _trampoline59.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 59,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline59.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 33),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatList({
      elemLowerFn: _lowerFlatU8,
      elemSize32: 1,
      elemAlign32: 1,
    }), 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline59,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 59,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline59.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 33),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatList({
      elemLowerFn: _lowerFlatU8,
      elemSize32: 1,
      elemAlign32: 1,
    }), 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline59,
},
);
let trampoline60 = _trampoline60.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 60,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline60.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 33),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatList({
      elemLowerFn: _lowerFlatU8,
      elemSize32: 1,
      elemAlign32: 1,
    }), 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline60,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 60,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline60.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 33),_liftFlatU64],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', _lowerFlatList({
      elemLowerFn: _lowerFlatU8,
      elemSize32: 1,
      elemAlign32: 1,
    }), 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline60,
},
);
let trampoline61 = _trampoline61.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 61,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline61.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 32),_liftFlatList({
    elemLiftFn: _liftFlatU8,
    elemAlign32: 1,
    elemSize32: 1,
    typedArray: Uint8Array,
  })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline61,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 61,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline61.manuallyAsync,
  paramLiftFns: [_liftFlatBorrow.bind(null, 32),_liftFlatList({
    elemLiftFn: _liftFlatU8,
    elemAlign32: 1,
    elemSize32: 1,
    typedArray: Uint8Array,
  })],
  resultLowerFns: [
  _lowerFlatResult({
    caseMetas: [
    [ 'ok', null, 12, 4, 4 ],
    [ 'err', _lowerFlatVariant({
      caseMetas: [[ 'last-operation-failed', _lowerFlatOwn({
        componentIdx: 10,
        lowerFn: 
        function lowerImportedOwnedHost_Error$1(obj) {
          if (!(obj instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid \"Error$1\" resource.');
          }
          let handle = obj[symbolRscHandle];
          if (!handle) {
            const rep = obj[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, obj);
            handle = rscTableCreateOwn(handleTable0, rep);
          }
          return handle;
        }
        ,
      }), 4, 4, 1 ],[ 'closed', null, 0, 0, 0 ],],
      variantSize32: 8,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 2,
    } ), 12, 4, 4 ],
    ],
    variantSize32: 12,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 3,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline61,
},
);
let trampoline62 = _trampoline62.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 62,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline62.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatStringAny, 8, 4],[_lowerFlatStringAny, 8, 4],], size32: 16, align32: 4 }),
    elemSize32: 16,
    elemAlign32: 4,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline62,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 62,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline62.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatStringAny, 8, 4],[_lowerFlatStringAny, 8, 4],], size32: 16, align32: 4 }),
    elemSize32: 16,
    elemAlign32: 4,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline62,
},
);
let trampoline63 = _trampoline63.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 63,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline63.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_Descriptor(obj) {
        if (!(obj instanceof Descriptor)) {
          throw new TypeError('Resource error: Not a valid \"Descriptor\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt5;
          captureTable5.set(rep, obj);
          handle = rscTableCreateOwn(handleTable5, rep);
        }
        return handle;
      }
      ,
    }), 4, 4],[_lowerFlatStringAny, 8, 4],], size32: 12, align32: 4 }),
    elemSize32: 12,
    elemAlign32: 4,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline63,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 63,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline63.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_Descriptor(obj) {
        if (!(obj instanceof Descriptor)) {
          throw new TypeError('Resource error: Not a valid \"Descriptor\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt5;
          captureTable5.set(rep, obj);
          handle = rscTableCreateOwn(handleTable5, rep);
        }
        return handle;
      }
      ,
    }), 4, 4],[_lowerFlatStringAny, 8, 4],], size32: 12, align32: 4 }),
    elemSize32: 12,
    elemAlign32: 4,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline63,
},
);
let trampoline64 = _trampoline64.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 64,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline64.manuallyAsync,
  paramLiftFns: [_liftFlatU64],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatU8,
    elemSize32: 1,
    elemAlign32: 1,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline64,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 64,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline64.manuallyAsync,
  paramLiftFns: [_liftFlatU64],
  resultLowerFns: [_lowerFlatList({
    elemLowerFn: _lowerFlatU8,
    elemSize32: 1,
    elemAlign32: 1,
  })],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: () => realloc2,
  importFn: _trampoline64,
},
);
let trampoline65 = _trampoline65.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 65,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline65.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_TerminalInput(obj) {
        if (!(obj instanceof TerminalInput)) {
          throw new TypeError('Resource error: Not a valid \"TerminalInput\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt3;
          captureTable3.set(rep, obj);
          handle = rscTableCreateOwn(handleTable3, rep);
        }
        return handle;
      }
      ,
    }), 4, 4, 1],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline65,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 65,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline65.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_TerminalInput(obj) {
        if (!(obj instanceof TerminalInput)) {
          throw new TypeError('Resource error: Not a valid \"TerminalInput\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt3;
          captureTable3.set(rep, obj);
          handle = rscTableCreateOwn(handleTable3, rep);
        }
        return handle;
      }
      ,
    }), 4, 4, 1],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline65,
},
);
let trampoline66 = _trampoline66.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 66,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline66.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_TerminalOutput(obj) {
        if (!(obj instanceof TerminalOutput)) {
          throw new TypeError('Resource error: Not a valid \"TerminalOutput\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt4;
          captureTable4.set(rep, obj);
          handle = rscTableCreateOwn(handleTable4, rep);
        }
        return handle;
      }
      ,
    }), 4, 4, 1],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline66,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 66,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline66.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_TerminalOutput(obj) {
        if (!(obj instanceof TerminalOutput)) {
          throw new TypeError('Resource error: Not a valid \"TerminalOutput\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt4;
          captureTable4.set(rep, obj);
          handle = rscTableCreateOwn(handleTable4, rep);
        }
        return handle;
      }
      ,
    }), 4, 4, 1],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline66,
},
);
let trampoline67 = _trampoline67.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(10, _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 67,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline67.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_TerminalOutput(obj) {
        if (!(obj instanceof TerminalOutput)) {
          throw new TypeError('Resource error: Not a valid \"TerminalOutput\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt4;
          captureTable4.set(rep, obj);
          handle = rscTableCreateOwn(handleTable4, rep);
        }
        return handle;
      }
      ,
    }), 4, 4, 1],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline67,
},
))) : _lowerImportBackwardsCompat.bind(
null,
{
  trampolineIdx: 67,
  componentIdx: 10,
  isAsync: false,
  isManualAsync: _trampoline67.manuallyAsync,
  paramLiftFns: [],
  resultLowerFns: [
  _lowerFlatOption({
    caseMetas: [
    [ 'none', null, 0, 0, 0 ],
    [ 'some', _lowerFlatOwn({
      componentIdx: 10,
      lowerFn: 
      function lowerImportedOwnedHost_TerminalOutput(obj) {
        if (!(obj instanceof TerminalOutput)) {
          throw new TypeError('Resource error: Not a valid \"TerminalOutput\" resource.');
        }
        let handle = obj[symbolRscHandle];
        if (!handle) {
          const rep = obj[symbolRscRep] || ++captureCnt4;
          captureTable4.set(rep, obj);
          handle = rscTableCreateOwn(handleTable4, rep);
        }
        return handle;
      }
      ,
    }), 4, 4, 1],
    ],
    variantSize32: 8,
    variantAlign32: 4,
    variantPayloadOffset32: 4,
    variantFlatCount: 2,
  })
  ],
  hasResultPointer: true,
  funcTypeIsAsync: false,
  getCallbackFn: () => null,
  getPostReturnFn: () => null,
  isCancellable: false,
  memoryIdx: 3,
  stringEncoding: 'utf8',
  getMemoryFn: () => memory3,
  getReallocFn: undefined,
  importFn: _trampoline67,
},
);
function trampoline23(rep) { throw new TypeError('Trap'); }

function trampoline25(from_ptr, len, to_ptr) {
  new Uint8Array(memory0.buffer, to_ptr, len).set(new Uint8Array(memory1.buffer, from_ptr, len));
}


function trampoline27(from_ptr, len, to_ptr) {
  new Uint8Array(memory1.buffer, to_ptr, len).set(new Uint8Array(memory0.buffer, from_ptr, len));
}


function trampoline28(src, src_len, dst, dst_len) {
  const encoder = new TextEncoder();
  const { read, written } = encoder.encodeInto(String.fromCharCode.apply(null, new Uint16Array(memory2.buffer, src, src_len)), new Uint8Array(memory1.buffer, dst, dst_len));
  return [read, written];
}


function trampoline31(from_ptr, len, to_ptr) {
  const decoder = new TextDecoder();
  const content = decoder.decode(new Uint8Array(memory1.buffer, from_ptr, len));
  const codeUnits = content.length;
  const view = new Uint16Array(memory2.buffer, to_ptr, codeUnits);
  for (var i = 0; i < codeUnits; i++) {
    view[i] = content.charCodeAt(i);
  }
  return codeUnits;
}


function trampoline43(from_ptr, len, to_ptr) {
  const decoder = new TextDecoder();
  const content = decoder.decode(new Uint8Array(memory3.buffer, from_ptr, len));
  const codeUnits = content.length;
  const view = new Uint16Array(memory2.buffer, to_ptr, codeUnits);
  for (var i = 0; i < codeUnits; i++) {
    view[i] = content.charCodeAt(i);
  }
  return codeUnits;
}


function trampoline44(src, src_len, dst, dst_len) {
  const encoder = new TextEncoder();
  const { read, written } = encoder.encodeInto(String.fromCharCode.apply(null, new Uint16Array(memory2.buffer, src, src_len)), new Uint8Array(memory3.buffer, dst, dst_len));
  return [read, written];
}


const $init = (() => {
  let gen = (function* _initGenerator () {
    const module0 = fetchCompile(new URL('./appy.core.wasm', 'file:///'));
    const module1 = fetchCompile(new URL('./appy.core2.wasm', 'file:///'));
    const module2 = fetchCompile(new URL('./appy.core3.wasm', 'file:///'));
    const module3 = fetchCompile(new URL('./appy.core4.wasm', 'file:///'));
    const module4 = fetchCompile(new URL('./appy.core5.wasm', 'file:///'));
    const module5 = fetchCompile(new URL('./appy.core6.wasm', 'file:///'));
    const module6 = fetchCompile(new URL('./appy.core7.wasm', 'file:///'));
    const module7 = fetchCompile(new URL('./appy.core8.wasm', 'file:///'));
    const module8 = fetchCompile(new URL('./appy.core9.wasm', 'file:///'));
    const module9 = fetchCompile(new URL('./appy.core10.wasm', 'file:///'));
    const module10 = fetchCompile(new URL('./appy.core11.wasm', 'file:///'));
    const module11 = fetchCompile(new URL('./appy.core12.wasm', 'file:///'));
    const module12 = fetchCompile(new URL('./appy.core13.wasm', 'file:///'));
    const module13 = fetchCompile(new URL('./appy.core14.wasm', 'file:///'));
    const module14 = fetchCompile(new URL('./appy.core15.wasm', 'file:///'));
    const module15 = fetchCompile(new URL('./appy.core16.wasm', 'file:///'));
    const module16 = fetchCompile(new URL('./appy.core17.wasm', 'file:///'));
    const instanceFlags3 = new WebAssembly.Global({ value: "i32", mutable: true }, 1);
    INSTANCE_FLAGS.set(3, instanceFlags3);
    const instanceFlags5 = new WebAssembly.Global({ value: "i32", mutable: true }, 1);
    INSTANCE_FLAGS.set(5, instanceFlags5);
    const instanceFlags8 = new WebAssembly.Global({ value: "i32", mutable: true }, 1);
    INSTANCE_FLAGS.set(8, instanceFlags8);
    const instanceFlags10 = new WebAssembly.Global({ value: "i32", mutable: true }, 1);
    INSTANCE_FLAGS.set(10, instanceFlags10);
    ({ exports: exports0 } = yield instantiateCore(yield module2));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      'leptolm:api/d1-replay': {
        'get-cache': exports0['0'],
      },
      wasi_snapshot_preview1: {
        environ_get: exports0['1'],
        environ_sizes_get: exports0['2'],
        fd_write: exports0['3'],
        proc_exit: exports0['4'],
      },
    }));
    ({ exports: exports2 } = yield instantiateCore(yield module1, {
      __main_module__: {
        cabi_realloc: exports1.cabi_realloc,
      },
      env: {
        memory: exports1.memory,
      },
      'wasi:cli/environment@0.2.3': {
        'get-environment': exports0['5'],
      },
      'wasi:cli/exit@0.2.3': {
        exit: trampoline7,
      },
      'wasi:cli/stderr@0.2.3': {
        'get-stderr': trampoline4,
      },
      'wasi:cli/stdin@0.2.3': {
        'get-stdin': trampoline5,
      },
      'wasi:cli/stdout@0.2.3': {
        'get-stdout': trampoline6,
      },
      'wasi:filesystem/preopens@0.2.2': {
        'get-directories': exports0['15'],
      },
      'wasi:filesystem/types@0.2.3': {
        '[method]descriptor.append-via-stream': exports0['8'],
        '[method]descriptor.get-type': exports0['9'],
        '[method]descriptor.stat': exports0['10'],
        '[method]descriptor.write-via-stream': exports0['7'],
        '[resource-drop]descriptor': _guardMayLeave(3, trampoline0),
        'filesystem-error-code': exports0['6'],
      },
      'wasi:io/error@0.2.3': {
        '[resource-drop]error': _guardMayLeave(3, trampoline2),
      },
      'wasi:io/streams@0.2.3': {
        '[method]output-stream.blocking-flush': exports0['13'],
        '[method]output-stream.blocking-write-and-flush': exports0['14'],
        '[method]output-stream.check-write': exports0['11'],
        '[method]output-stream.write': exports0['12'],
        '[resource-drop]input-stream': _guardMayLeave(3, trampoline3),
        '[resource-drop]output-stream': _guardMayLeave(3, trampoline1),
      },
    }));
    memory0 = exports1.memory;
    realloc0 = exports1.cabi_realloc;
    
    try {
      realloc0Async = WebAssembly.promising(exports1.cabi_realloc);
    } catch(err) {
      realloc0Async = exports1.cabi_realloc;
    }
    
    realloc1 = exports2.cabi_import_realloc;
    
    try {
      realloc1Async = WebAssembly.promising(exports2.cabi_import_realloc);
    } catch(err) {
      realloc1Async = exports2.cabi_import_realloc;
    }
    
    ({ exports: exports3 } = yield instantiateCore(yield module3, {
      '': {
        $imports: exports0.$imports,
        '0': trampoline8,
        '1': exports2.environ_get,
        '10': trampoline14,
        '11': trampoline15,
        '12': trampoline16,
        '13': trampoline17,
        '14': trampoline18,
        '15': trampoline19,
        '2': exports2.environ_sizes_get,
        '3': exports2.fd_write,
        '4': exports2.proc_exit,
        '5': trampoline9,
        '6': trampoline10,
        '7': trampoline11,
        '8': trampoline12,
        '9': trampoline13,
      },
    }));
    ({ exports: exports4 } = yield instantiateCore(yield module5));
    ({ exports: exports5 } = yield instantiateCore(yield module4, {
      '[export]wasi:sql/types': {
        '[resource-new]connection': _guardMayLeave(5, trampoline22),
        '[resource-new]error': _guardMayLeave(5, trampoline20),
        '[resource-new]statement': _guardMayLeave(5, trampoline21),
      },
      'leptolm:api/db-spi': {
        exec: exports4['1'],
        query: exports4['0'],
      },
    }));
    memory1 = exports5.memory;
    ({ exports: exports6 } = yield instantiateCore(yield module14, {
      async: {
        'enter-sync-call': trampoline24,
        'exit-sync-call': trampoline26,
      },
      augments: {
        'mem1 F32Store': (ptr, val, offset) => {
          new DataView(exports5.memory.buffer).setFloat32(ptr + offset, val, true);
        },
        'mem1 F64Store': (ptr, val, offset) => {
          new DataView(exports5.memory.buffer).setFloat64(ptr + offset, val, true);
        },
        'mem1 I32Load': (ptr, off) => new DataView(exports5.memory.buffer).getInt32(ptr + off, true),
        'mem1 I32Store': (ptr, val, offset) => {
          new DataView(exports5.memory.buffer).setInt32(ptr + offset, val, true);
        },
        'mem1 I32Store8': (ptr, val, offset) => {
          new DataView(exports5.memory.buffer).setInt8(ptr + offset, val, true);
        },
        'mem1 I64Store': (ptr, val, offset) => {
          new DataView(exports5.memory.buffer).setBigInt64(ptr + offset, val, true);
        },
        'mem1 MemorySize': ptr => exports5.memory.buffer.byteLength / 65536,
      },
      callee: {
        adapter0: exports1['leptolm:api/db-spi#query'],
        adapter1: exports1['leptolm:api/db-spi#exec'],
      },
      flags: {
        instance3: instanceFlags3,
        instance5: instanceFlags5,
      },
      instance: {
        task_may_block: CURRENT_TASK_MAY_BLOCK,
      },
      memory: {
        m0: exports1.memory,
      },
      post_return: {
        adapter0: exports1['cabi_post_leptolm:api/db-spi#query'],
        adapter1: exports1['cabi_post_leptolm:api/db-spi#exec'],
      },
      realloc: {
        f0: exports1.cabi_realloc,
        f1: exports5.cabi_realloc,
      },
      runtime: {
        trap: trampoline23,
      },
      transcode: {
        'utf8-to-utf8 (mem0 => mem1)': trampoline27,
        'utf8-to-utf8 (mem1 => mem0)': trampoline25,
      },
    }));
    ({ exports: exports7 } = yield instantiateCore(yield module6, {
      actual: {
        '0': exports6.adapter0,
        '1': exports6.adapter1,
        '2': exports5['wasi:sql/types#[dtor]connection'],
        '3': exports5['wasi:sql/types#[dtor]error'],
        '4': exports5['wasi:sql/types#[dtor]statement'],
      },
      shim: {
        $imports: exports4.$imports,
      },
    }));
    ({ exports: exports8 } = yield instantiateCore(yield module8));
    ({ exports: exports9 } = yield instantiateCore(yield module7, {
      'wasi:sql/readwrite': {
        exec: exports8['2'],
        query: exports8['3'],
      },
      'wasi:sql/types': {
        '[static]connection.open': exports8['1'],
        '[static]statement.prepare': exports8['0'],
      },
    }));
    memory2 = exports9.memory;
    ({ exports: exports10 } = yield instantiateCore(yield module15, {
      async: {
        'enter-sync-call': trampoline24,
        'exit-sync-call': trampoline26,
      },
      augments: {
        'mem1 F32Store': (ptr, val, offset) => {
          new DataView(exports9.memory.buffer).setFloat32(ptr + offset, val, true);
        },
        'mem1 F64Store': (ptr, val, offset) => {
          new DataView(exports9.memory.buffer).setFloat64(ptr + offset, val, true);
        },
        'mem1 I32Load': (ptr, off) => new DataView(exports9.memory.buffer).getInt32(ptr + off, true),
        'mem1 I32Store': (ptr, val, offset) => {
          new DataView(exports9.memory.buffer).setInt32(ptr + offset, val, true);
        },
        'mem1 I32Store8': (ptr, val, offset) => {
          new DataView(exports9.memory.buffer).setInt8(ptr + offset, val, true);
        },
        'mem1 I64Store': (ptr, val, offset) => {
          new DataView(exports9.memory.buffer).setBigInt64(ptr + offset, val, true);
        },
        'mem1 MemorySize': ptr => exports9.memory.buffer.byteLength / 65536,
      },
      callee: {
        adapter2: exports5['wasi:sql/types#[static]statement.prepare'],
        adapter3: exports5['wasi:sql/types#[static]connection.open'],
        adapter4: exports5['wasi:sql/readwrite#exec'],
        adapter5: exports5['wasi:sql/readwrite#query'],
      },
      flags: {
        instance5: instanceFlags5,
        instance8: instanceFlags8,
      },
      instance: {
        task_may_block: CURRENT_TASK_MAY_BLOCK,
      },
      memory: {
        m0: exports5.memory,
      },
      post_return: {
        adapter5: exports5['cabi_post_wasi:sql/readwrite#query'],
      },
      realloc: {
        f0: exports5.cabi_realloc,
        f10: exports9.cabi_realloc,
      },
      resource: {
        'transfer-borrow': trampoline30,
        'transfer-own': trampoline29,
      },
      runtime: {
        trap: trampoline23,
      },
      transcode: {
        'utf16-to-utf8 (mem1 => mem0)': trampoline28,
        'utf8-to-utf16 (mem0 => mem1)': trampoline31,
      },
    }));
    ({ exports: exports11 } = yield instantiateCore(yield module9, {
      actual: {
        '0': exports10.adapter2,
        '1': exports10.adapter3,
        '2': exports10.adapter4,
        '3': exports10.adapter5,
      },
      shim: {
        $imports: exports8.$imports,
      },
    }));
    ({ exports: exports12 } = yield instantiateCore(yield module12));
    ({ exports: exports13 } = yield instantiateCore(yield module10, {
      'leptolm:api/models': {
        'get-items': exports12['3'],
        'process-add-item': exports12['0'],
        'process-delete-item': exports12['1'],
        'process-update-item': exports12['2'],
      },
      wasi_snapshot_preview1: {
        environ_get: exports12['5'],
        environ_sizes_get: exports12['6'],
        fd_close: exports12['7'],
        fd_fdstat_get: exports12['8'],
        fd_filestat_get: exports12['9'],
        fd_prestat_dir_name: exports12['11'],
        fd_prestat_get: exports12['10'],
        fd_read: exports12['12'],
        fd_write: exports12['13'],
        path_filestat_get: exports12['14'],
        path_open: exports12['15'],
        proc_exit: exports12['16'],
        random_get: exports12['4'],
      },
    }));
    ({ exports: exports14 } = yield instantiateCore(yield module11, {
      __main_module__: {
        cabi_realloc: exports13.cabi_realloc,
      },
      env: {
        memory: exports13.memory,
      },
      'wasi:cli/environment@0.2.12': {
        'get-environment': exports12['34'],
      },
      'wasi:cli/exit@0.2.12': {
        exit: trampoline42,
      },
      'wasi:cli/stderr@0.2.12': {
        'get-stderr': trampoline37,
      },
      'wasi:cli/stdin@0.2.12': {
        'get-stdin': trampoline38,
      },
      'wasi:cli/stdout@0.2.12': {
        'get-stdout': trampoline39,
      },
      'wasi:cli/terminal-input@0.2.12': {
        '[resource-drop]terminal-input': _guardMayLeave(10, trampoline40),
      },
      'wasi:cli/terminal-output@0.2.12': {
        '[resource-drop]terminal-output': _guardMayLeave(10, trampoline41),
      },
      'wasi:cli/terminal-stderr@0.2.12': {
        'get-terminal-stderr': exports12['39'],
      },
      'wasi:cli/terminal-stdin@0.2.12': {
        'get-terminal-stdin': exports12['37'],
      },
      'wasi:cli/terminal-stdout@0.2.12': {
        'get-terminal-stdout': exports12['38'],
      },
      'wasi:filesystem/preopens@0.2.6': {
        'get-directories': exports12['35'],
      },
      'wasi:filesystem/types@0.2.12': {
        '[method]descriptor.append-via-stream': exports12['22'],
        '[method]descriptor.get-flags': exports12['20'],
        '[method]descriptor.get-type': exports12['21'],
        '[method]descriptor.metadata-hash': exports12['18'],
        '[method]descriptor.metadata-hash-at': exports12['19'],
        '[method]descriptor.open-at': exports12['24'],
        '[method]descriptor.read-via-stream': exports12['25'],
        '[method]descriptor.stat': exports12['27'],
        '[method]descriptor.stat-at': exports12['23'],
        '[method]descriptor.write-via-stream': exports12['26'],
        '[resource-drop]descriptor': _guardMayLeave(10, trampoline34),
        '[resource-drop]directory-entry-stream': _guardMayLeave(10, trampoline33),
        'filesystem-error-code': exports12['17'],
      },
      'wasi:io/error@0.2.12': {
        '[resource-drop]error': _guardMayLeave(10, trampoline32),
      },
      'wasi:io/streams@0.2.12': {
        '[method]input-stream.blocking-read': exports12['31'],
        '[method]input-stream.read': exports12['32'],
        '[method]output-stream.blocking-flush': exports12['30'],
        '[method]output-stream.blocking-write-and-flush': exports12['33'],
        '[method]output-stream.check-write': exports12['28'],
        '[method]output-stream.write': exports12['29'],
        '[resource-drop]input-stream': _guardMayLeave(10, trampoline36),
        '[resource-drop]output-stream': _guardMayLeave(10, trampoline35),
      },
      'wasi:random/random@0.2.12': {
        'get-random-bytes': exports12['36'],
      },
    }));
    memory3 = exports13.memory;
    ({ exports: exports15 } = yield instantiateCore(yield module16, {
      async: {
        'enter-sync-call': trampoline24,
        'exit-sync-call': trampoline26,
      },
      augments: {
        'mem1 I32Store': (ptr, val, offset) => {
          new DataView(exports13.memory.buffer).setInt32(ptr + offset, val, true);
        },
        'mem1 I32Store8': (ptr, val, offset) => {
          new DataView(exports13.memory.buffer).setInt8(ptr + offset, val, true);
        },
        'mem1 MemorySize': ptr => exports13.memory.buffer.byteLength / 65536,
      },
      callee: {
        adapter6: exports9['leptolm:api/models#process-add-item'],
        adapter7: exports9['leptolm:api/models#process-delete-item'],
        adapter8: exports9['leptolm:api/models#process-update-item'],
        adapter9: exports9['leptolm:api/models#get-items'],
      },
      flags: {
        instance10: instanceFlags10,
        instance8: instanceFlags8,
      },
      instance: {
        task_may_block: CURRENT_TASK_MAY_BLOCK,
      },
      memory: {
        m0: exports9.memory,
      },
      post_return: {
        adapter6: exports9['cabi_post_leptolm:api/models#process-add-item'],
        adapter7: exports9['cabi_post_leptolm:api/models#process-delete-item'],
        adapter8: exports9['cabi_post_leptolm:api/models#process-update-item'],
        adapter9: exports9['cabi_post_leptolm:api/models#get-items'],
      },
      realloc: {
        f0: exports9.cabi_realloc,
        f1: exports13.cabi_realloc,
      },
      runtime: {
        trap: trampoline23,
      },
      transcode: {
        'utf16-to-utf8 (mem0 => mem1)': trampoline44,
        'utf8-to-utf16 (mem1 => mem0)': trampoline43,
      },
    }));
    realloc2 = exports14.cabi_import_realloc;
    
    try {
      realloc2Async = WebAssembly.promising(exports14.cabi_import_realloc);
    } catch(err) {
      realloc2Async = exports14.cabi_import_realloc;
    }
    
    ({ exports: exports16 } = yield instantiateCore(yield module13, {
      actual: {
        '0': exports15.adapter6,
        '1': exports15.adapter7,
        '10': exports14.fd_prestat_get,
        '11': exports14.fd_prestat_dir_name,
        '12': exports14.fd_read,
        '13': exports14.fd_write,
        '14': exports14.path_filestat_get,
        '15': exports14.path_open,
        '16': exports14.proc_exit,
        '17': trampoline45,
        '18': trampoline46,
        '19': trampoline47,
        '2': exports15.adapter8,
        '20': trampoline48,
        '21': trampoline49,
        '22': trampoline50,
        '23': trampoline51,
        '24': trampoline52,
        '25': trampoline53,
        '26': trampoline54,
        '27': trampoline55,
        '28': trampoline56,
        '29': trampoline57,
        '3': exports15.adapter9,
        '30': trampoline58,
        '31': trampoline59,
        '32': trampoline60,
        '33': trampoline61,
        '34': trampoline62,
        '35': trampoline63,
        '36': trampoline64,
        '37': trampoline65,
        '38': trampoline66,
        '39': trampoline67,
        '4': exports14.random_get,
        '5': exports14.environ_get,
        '6': exports14.environ_sizes_get,
        '7': exports14.fd_close,
        '8': exports14.fd_fdstat_get,
        '9': exports14.fd_filestat_get,
      },
      shim: {
        $imports: exports12.$imports,
      },
    }));
    realloc3 = exports13.cabi_realloc;
    
    try {
      realloc3Async = WebAssembly.promising(exports13.cabi_realloc);
    } catch(err) {
      realloc3Async = exports13.cabi_realloc;
    }
    
    postReturn0 = exports13['cabi_post_handle-cloudflare'];
    
    try {
      postReturn0Async = WebAssembly.promising(exports13['cabi_post_handle-cloudflare']);
    } catch(err) {
      postReturn0Async = exports13['cabi_post_handle-cloudflare'];
    }
    
    exports13HandleCloudflare = exports13['handle-cloudflare'];
  })();
  let promise, resolve, reject;
  function runNext (value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve) resolve(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
      value.then(runNext, reject);
    }
    catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();

await $init;

export { handleCloudflare,  }
export const _util = {
  
}

