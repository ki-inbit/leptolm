var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// .wrangler/tmp/bundle-4zZp2x/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// worker/src/wasm/app.js
var app_exports = {};
__export(app_exports, {
  _util: () => _util,
  incomingHandler: () => incomingHandler0212,
  "wasi:http/incoming-handler@0.2.12": () => incomingHandler0212
});

// node_modules/@bytecodealliance/preview2-shim/dist/browser/io.js
var id = 0;
var symbolDispose = Symbol.dispose || /* @__PURE__ */ Symbol.for("dispose");
var IoError = class extends Error {
  static {
    __name(this, "IoError");
  }
  toDebugString() {
    return this.message;
  }
};
var InputStream = class _InputStream {
  static {
    __name(this, "InputStream");
  }
  id;
  handler;
  static _create(handler) {
    const stream = new _InputStream();
    if (!handler) {
      console.trace("no handler");
    }
    stream.id = ++id;
    stream.handler = handler;
    return stream;
  }
  read(len) {
    if (this.handler.read) {
      return this.handler.read(len);
    }
    return this.handler.blockingRead.call(this, len);
  }
  blockingRead(len) {
    return this.handler.blockingRead.call(this, len);
  }
  skip(len) {
    if (this.handler.skip) {
      return this.handler.skip.call(this, len);
    }
    if (this.handler.read) {
      const bytes = this.handler.read.call(this, len);
      return BigInt(bytes.byteLength);
    }
    return this.blockingSkip.call(this, len);
  }
  blockingSkip(len) {
    if (this.handler.blockingSkip) {
      return this.handler.blockingSkip.call(this, len);
    }
    const bytes = this.handler.blockingRead.call(this, len);
    return BigInt(bytes.byteLength);
  }
  subscribe() {
    if (this.handler.subscribe) {
      return this.handler.subscribe();
    }
    return new Pollable();
  }
  [symbolDispose]() {
    if (this.handler.drop) {
      this.handler.drop.call(this);
    }
  }
};
var inputStreamCreate = InputStream._create;
delete InputStream._create;
var OutputStream = class _OutputStream {
  static {
    __name(this, "OutputStream");
  }
  id;
  open;
  handler;
  static _create(handler) {
    const stream = new _OutputStream();
    if (!handler) {
      console.trace("no handler");
    }
    stream.id = ++id;
    stream.open = true;
    stream.handler = handler;
    return stream;
  }
  checkWrite() {
    if (!this.open) {
      return 0n;
    }
    if (this.handler.checkWrite) {
      return this.handler.checkWrite.call(this);
    }
    return 1000000n;
  }
  write(buf) {
    this.handler.write.call(this, buf);
  }
  blockingWriteAndFlush(buf) {
    if (this.handler.blockingWriteAndFlush) {
      return this.handler.blockingWriteAndFlush.call(this, buf);
    }
    this.handler.write.call(this, buf);
  }
  flush() {
    if (this.handler.flush) {
      this.handler.flush.call(this);
    }
  }
  blockingFlush() {
    this.open = true;
    if (this.handler.blockingFlush) {
      this.handler.blockingFlush.call(this);
    }
  }
  writeZeroes(len) {
    this.write.call(this, new Uint8Array(Number(len)));
  }
  blockingWriteZeroesAndFlush(len) {
    this.blockingWriteAndFlush.call(this, new Uint8Array(Number(len)));
  }
  splice(src, len) {
    const spliceLen = Math.min(Number(len), Number(this.checkWrite.call(this)));
    const bytes = src.read(BigInt(spliceLen));
    this.write.call(this, bytes);
    return BigInt(bytes.byteLength);
  }
  blockingSplice(_src, _len) {
    console.log(`[streams] Blocking splice ${this.id}`);
    return 0n;
  }
  subscribe() {
    if (this.handler.subscribe) {
      return this.handler.subscribe();
    }
    return new Pollable();
  }
  [symbolDispose]() {
  }
};
var outputStreamCreate = OutputStream._create;
delete OutputStream._create;
var error = {
  Error: IoError
};
var streams = { InputStream, OutputStream };
var Pollable = class _Pollable {
  static {
    __name(this, "Pollable");
  }
  #ready = false;
  #promise = null;
  static _create(promise) {
    const pollable = new _Pollable();
    if (!promise) {
      pollable.#ready = true;
    } else {
      pollable.#promise = promise.then(() => {
        pollable.#ready = true;
      }, () => {
        pollable.#ready = true;
      });
    }
    return pollable;
  }
  ready() {
    return this.#ready;
  }
  block() {
    if (this.#ready) {
      return Promise.resolve();
    }
    return this.#promise || Promise.resolve();
  }
  [symbolDispose]() {
    this.#promise = null;
  }
};
var pollableCreate = Pollable._create;
delete Pollable._create;

// node_modules/@bytecodealliance/preview2-shim/dist/browser/config.js
var _cwd = "/";
function _getCwd() {
  return _cwd;
}
__name(_getCwd, "_getCwd");

// node_modules/@bytecodealliance/preview2-shim/dist/browser/environment.js
var _env = [];
var _args = [];
var _cwd2 = "/";
var environment = {
  getEnvironment() {
    return _env;
  },
  getArguments() {
    return _args;
  },
  initialCwd() {
    return _cwd2;
  }
};

// node_modules/@bytecodealliance/preview2-shim/dist/browser/cli.js
var symbolDispose2 = Symbol.dispose ?? /* @__PURE__ */ Symbol.for("dispose");
var ComponentExit = class extends Error {
  static {
    __name(this, "ComponentExit");
  }
  exitError = true;
  code;
  constructor(code) {
    super(`Component exited ${code === 0 ? "successfully" : "with error"}`);
    this.code = code;
  }
};
var exit = {
  exit(status) {
    throw new ComponentExit(status.tag === "err" ? 1 : 0);
  },
  // @ts-expect-error - Available only wasi-cli v0.2.12
  exitWithCode(code) {
    throw new ComponentExit(code);
  }
};
var stdinStream = inputStreamCreate({
  blockingRead(_len) {
    return new Uint8Array(0);
  },
  subscribe() {
    return pollableCreate();
  },
  [symbolDispose2]() {
  }
});
var textDecoder = new TextDecoder();
var stdoutStream = outputStreamCreate({
  write(contents) {
    if (contents.at(-1) == 10) {
      contents = contents.subarray(0, -1);
    }
    console.log(textDecoder.decode(contents));
  },
  blockingFlush() {
  },
  [symbolDispose2]() {
  }
});
var stderrStream = outputStreamCreate({
  write(contents) {
    if (contents.at(-1) == 10) {
      contents = contents.subarray(0, -1);
    }
    console.error(textDecoder.decode(contents));
  },
  blockingFlush() {
  },
  [symbolDispose2]() {
  }
});
var stdin = {
  getStdin() {
    return stdinStream;
  }
};
var stdout = {
  getStdout() {
    return stdoutStream;
  }
};
var stderr = {
  getStderr() {
    return stderrStream;
  }
};
var TerminalInput = class {
  static {
    __name(this, "TerminalInput");
  }
};
var TerminalOutput = class {
  static {
    __name(this, "TerminalOutput");
  }
};
var terminalStdoutInstance = new TerminalOutput();
var terminalStderrInstance = new TerminalOutput();
var terminalStdinInstance = new TerminalInput();
var terminalInput = {
  TerminalInput
};
var terminalOutput = {
  TerminalOutput
};
var terminalStderr = {
  getTerminalStderr() {
    return terminalStderrInstance;
  }
};
var terminalStdin = {
  getTerminalStdin() {
    return terminalStdinInstance;
  }
};
var terminalStdout = {
  getTerminalStdout() {
    return terminalStdoutInstance;
  }
};

// node_modules/@bytecodealliance/preview2-shim/dist/browser/filesystem.js
var _fileData = { dir: {} };
var timeZero = {
  seconds: 0n,
  nanoseconds: 0
};
function coerceToSafeIntegerNumber(obj) {
  let n;
  if (typeof obj === "number") {
    n = obj;
  } else if (typeof obj == "bigint") {
    n = Number(obj);
  } else {
    throw new TypeError(`unexpected non-numeric type: ${obj}`);
  }
  if (n > Number.MAX_SAFE_INTEGER) {
    throw new TypeError(`excessively large number: ${n}`);
  }
  return n;
}
__name(coerceToSafeIntegerNumber, "coerceToSafeIntegerNumber");
function getChildEntry(parentEntry, subpath, openFlags) {
  if (subpath === "." && _rootPreopen && descriptorGetEntry(_rootPreopen[0]) === parentEntry) {
    subpath = _getCwd();
    if (subpath.startsWith("/") && subpath !== "/") {
      subpath = subpath.slice(1);
    }
  }
  let entry = parentEntry;
  let segmentIdx;
  do {
    if (!entry?.dir) {
      throw "not-directory";
    }
    segmentIdx = subpath.indexOf("/");
    const segment = segmentIdx === -1 ? subpath : subpath.slice(0, segmentIdx);
    if (segment === "..") {
      throw "no-entry";
    }
    if (segment === "." || segment === "") {
    } else if (!entry.dir[segment] && openFlags.create) {
      entry = entry.dir[segment] = openFlags.directory ? { dir: {} } : { source: new Uint8Array([]) };
    } else {
      entry = entry.dir[segment];
    }
    subpath = subpath.slice(segmentIdx + 1);
  } while (segmentIdx !== -1);
  if (!entry) {
    throw "no-entry";
  }
  return entry;
}
__name(getChildEntry, "getChildEntry");
function getSource(fileEntry) {
  if (typeof fileEntry.source === "string") {
    fileEntry.source = new TextEncoder().encode(fileEntry.source);
  }
  return fileEntry.source;
}
__name(getSource, "getSource");
var fileWriteBuffers = /* @__PURE__ */ new WeakMap();
function getFileWriteBuffer(entry, source, requiredLength) {
  let buffer = fileWriteBuffers.get(entry);
  if (!buffer || buffer.buffer !== source.buffer || buffer.byteOffset !== source.byteOffset) {
    buffer = source;
  }
  if (requiredLength <= buffer.byteLength) {
    return buffer;
  }
  const newBuffer = new Uint8Array(Math.max(requiredLength, source.byteLength * 2));
  newBuffer.set(source);
  fileWriteBuffers.set(entry, newBuffer);
  return newBuffer;
}
__name(getFileWriteBuffer, "getFileWriteBuffer");
var DirectoryEntryStream = class _DirectoryEntryStream {
  static {
    __name(this, "DirectoryEntryStream");
  }
  idx = 0;
  entries = [];
  static _create(entries) {
    const stream = new _DirectoryEntryStream();
    stream.entries = entries;
    return stream;
  }
  readDirectoryEntry() {
    if (this.idx === this.entries.length) {
      return void 0;
    }
    const [name, entry] = this.entries[this.idx];
    this.idx += 1;
    return {
      name,
      type: entry.dir ? "directory" : "regular-file"
    };
  }
};
var descriptorEntryStreamCreate = DirectoryEntryStream._create;
delete DirectoryEntryStream._create;
var Descriptor = class _Descriptor {
  static {
    __name(this, "Descriptor");
  }
  #stream;
  #entry;
  #mtime = 0;
  _getEntry(descriptor) {
    return descriptor.#entry;
  }
  static _create(entry, isStream) {
    const descriptor = new _Descriptor();
    if (isStream) {
      descriptor.#stream = entry;
    } else {
      descriptor.#entry = entry;
    }
    return descriptor;
  }
  readViaStream(_offset) {
    const source = getSource(this.#entry);
    let offset = Number(_offset);
    return inputStreamCreate({
      blockingRead(len) {
        if (offset === source.byteLength) {
          throw { tag: "closed" };
        }
        const bytes = source.slice(offset, offset + Number(len));
        offset += bytes.byteLength;
        return bytes;
      }
    });
  }
  writeViaStream(_offset) {
    const entry = this.#entry;
    let offset = coerceToSafeIntegerNumber(_offset);
    return outputStreamCreate({
      write(buf) {
        if (buf.byteLength === 0) {
          return;
        }
        const source = getSource(entry);
        const end = offset + buf.byteLength;
        if (!Number.isSafeInteger(end)) {
          throw new TypeError(`excessively large number: ${end}`);
        }
        const buffer = getFileWriteBuffer(entry, source, end);
        if (offset > source.byteLength) {
          buffer.fill(0, source.byteLength, offset);
        }
        buffer.set(buf, offset);
        entry.source = buffer.subarray(0, Math.max(source.byteLength, end));
        offset = end;
      }
    });
  }
  appendViaStream() {
    console.log(`[filesystem] APPEND STREAM`);
    return {};
  }
  advise(offset, length, advice) {
    console.log(`[filesystem] ADVISE`, offset, length, advice);
  }
  syncData() {
    console.log(`[filesystem] SYNC DATA`);
  }
  getFlags() {
    console.log(`[filesystem] FLAGS FOR`);
    return {};
  }
  getType() {
    if (this.#stream) {
      return "fifo";
    }
    if (this.#entry.dir) {
      return "directory";
    }
    if (this.#entry.source) {
      return "regular-file";
    }
    return "unknown";
  }
  setSize(size) {
    console.log(`[filesystem] SET SIZE`, size);
  }
  setTimes(dataAccessTimestamp, dataModificationTimestamp) {
    console.log(`[filesystem] SET TIMES`, dataAccessTimestamp, dataModificationTimestamp);
  }
  read(length, offset) {
    const source = getSource(this.#entry);
    const off = coerceToSafeIntegerNumber(offset);
    const len = coerceToSafeIntegerNumber(length);
    const result = [
      source.slice(off, off + len),
      off + len >= source.byteLength
    ];
    return result;
  }
  write(buffer, offset) {
    if (offset !== 0n) {
      throw "invalid-seek";
    }
    this.#entry.source = buffer;
    return BigInt(buffer.byteLength);
  }
  readDirectory() {
    if (!this.#entry?.dir) {
      throw "bad-descriptor";
    }
    return descriptorEntryStreamCreate(Object.entries(this.#entry.dir).sort(([a], [b]) => a > b ? 1 : -1));
  }
  sync() {
    console.log(`[filesystem] SYNC`);
  }
  createDirectoryAt(path) {
    const entry = getChildEntry(this.#entry, path, {
      create: true,
      directory: true
    });
    if (entry.source) {
      throw "exist";
    }
  }
  stat() {
    let type = "unknown";
    let size = 0n;
    if (this.#entry.source) {
      type = "regular-file";
      const source = getSource(this.#entry);
      size = BigInt(source.byteLength);
    } else if (this.#entry.dir) {
      type = "directory";
    }
    return {
      type,
      linkCount: 0n,
      size,
      dataAccessTimestamp: timeZero,
      dataModificationTimestamp: timeZero,
      statusChangeTimestamp: timeZero
    };
  }
  statAt(_pathFlags, path) {
    const entry = getChildEntry(this.#entry, path, {
      create: false,
      directory: false
    });
    let type = "unknown";
    let size = 0n;
    if (entry.source) {
      type = "regular-file";
      const source = getSource(entry);
      size = BigInt(source.byteLength);
    } else if (entry.dir) {
      type = "directory";
    }
    return {
      type,
      linkCount: 0n,
      size,
      dataAccessTimestamp: timeZero,
      dataModificationTimestamp: timeZero,
      statusChangeTimestamp: timeZero
    };
  }
  setTimesAt() {
    console.log(`[filesystem] SET TIMES AT`);
  }
  linkAt() {
    console.log(`[filesystem] LINK AT`);
  }
  openAt(_pathFlags, path, openFlags, _flags) {
    const childEntry = getChildEntry(this.#entry, path, openFlags);
    return descriptorCreate(childEntry);
  }
  readlinkAt(_path) {
    console.log(`[filesystem] READLINK AT`);
    return "";
  }
  removeDirectoryAt() {
    console.log(`[filesystem] REMOVE DIR AT`);
  }
  renameAt() {
    console.log(`[filesystem] RENAME AT`);
  }
  symlinkAt() {
    console.log(`[filesystem] SYMLINK AT`);
  }
  unlinkFileAt() {
    console.log(`[filesystem] UNLINK FILE AT`);
  }
  isSameObject(other) {
    return other === this;
  }
  metadataHash() {
    let upper = 0n;
    upper += BigInt(this.#mtime);
    return { upper, lower: 0n };
  }
  metadataHashAt(_pathFlags, _path) {
    return this.metadataHash();
  }
};
var descriptorGetEntry = Descriptor.prototype._getEntry;
delete Descriptor.prototype._getEntry;
var descriptorCreate = Descriptor._create;
delete Descriptor._create;
var _preopens = [[descriptorCreate(_fileData), "/"]];
var _rootPreopen = _preopens[0];
var preopens = {
  getDirectories() {
    return _preopens;
  }
};
var types = {
  Descriptor,
  DirectoryEntryStream,
  filesystemErrorCode: /* @__PURE__ */ __name((err) => {
    let message;
    if ("payload" in err) {
      message = err.payload;
    } else if ("message" in err) {
      message = err.message;
    }
    return convertFsError(message);
  }, "filesystemErrorCode")
};
function convertFsError(e) {
  switch (e.code) {
    case "EACCES":
      return "access";
    case "EAGAIN":
    case "EWOULDBLOCK":
      return "would-block";
    case "EALREADY":
      return "already";
    case "EBADF":
      return "bad-descriptor";
    case "EBUSY":
      return "busy";
    case "EDEADLK":
      return "deadlock";
    case "EDQUOT":
      return "quota";
    case "EEXIST":
      return "exist";
    case "EFBIG":
      return "file-too-large";
    case "EILSEQ":
      return "illegal-byte-sequence";
    case "EINPROGRESS":
      return "in-progress";
    case "EINTR":
      return "interrupted";
    case "EINVAL":
      return "invalid";
    case "EIO":
      return "io";
    case "EISDIR":
      return "is-directory";
    case "ELOOP":
      return "loop";
    case "EMLINK":
      return "too-many-links";
    case "EMSGSIZE":
      return "message-size";
    case "ENAMETOOLONG":
      return "name-too-long";
    case "ENODEV":
      return "no-device";
    case "ENOENT":
      return "no-entry";
    case "ENOLCK":
      return "no-lock";
    case "ENOMEM":
      return "insufficient-memory";
    case "ENOSPC":
      return "insufficient-space";
    case "ENOTDIR":
    case "ERR_FS_EISDIR":
      return "not-directory";
    case "ENOTEMPTY":
      return "not-empty";
    case "ENOTRECOVERABLE":
      return "not-recoverable";
    case "ENOTSUP":
      return "unsupported";
    case "ENOTTY":
      return "no-tty";
    // windows gives this error for badly structured `//` reads
    // this seems like a slightly better error than unknown given
    // that it's a common footgun
    case -4094:
    case "ENXIO":
      return "no-such-device";
    case "EOVERFLOW":
      return "overflow";
    case "EPERM":
      return "not-permitted";
    case "EPIPE":
      return "pipe";
    case "EROFS":
      return "read-only";
    case "ESPIPE":
      return "invalid-seek";
    case "ETXTBSY":
      return "text-file-busy";
    case "EXDEV":
      return "cross-device";
    case "UNKNOWN":
      switch (e.errno) {
        case -4094:
          return "no-such-device";
        default:
          throw e;
      }
    default:
      throw e;
  }
}
__name(convertFsError, "convertFsError");

// node_modules/@bytecodealliance/preview2-shim/dist/browser/http.js
var symbolDispose3 = Symbol.dispose || /* @__PURE__ */ Symbol.for("dispose");
var utf8Decoder = new TextDecoder();
var forbiddenHeaders = /* @__PURE__ */ new Set(["connection", "keep-alive", "host"]);
var DEFAULT_HTTP_TIMEOUT_NS = 600000000000n;
var TOKEN_RE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
var FIELD_VALUE_RE = /^[\t\x20-\x7E\x80-\xFF]*$/;
function validateHeaderName(name) {
  if (!TOKEN_RE.test(name)) {
    throw { tag: "invalid-syntax" };
  }
}
__name(validateHeaderName, "validateHeaderName");
function validateHeaderValue(value) {
  const str = typeof value === "string" ? value : utf8Decoder.decode(value);
  if (!FIELD_VALUE_RE.test(str)) {
    throw { tag: "invalid-syntax" };
  }
}
__name(validateHeaderValue, "validateHeaderValue");
var Fields = class _Fields {
  static {
    __name(this, "Fields");
  }
  #immutable = false;
  #entries = [];
  #table = /* @__PURE__ */ new Map();
  static fromList(entries) {
    const fields = new _Fields();
    for (const [key, value] of entries) {
      fields.append(key, value);
    }
    return fields;
  }
  get(name) {
    const tableEntries = this.#table.get(name.toLowerCase());
    if (!tableEntries) {
      return [];
    }
    return tableEntries.map(([, v]) => v);
  }
  /**
   * WIT spec (https://github.com/WebAssembly/WASI/blob/91bb44c3c3a9b1e09187db23c85fa844d1fd6b15/proposals/http/wit/types.wit#L215-L223):
   *
   * > Set all of the values for a name. Clears any existing values for that
   * > name, if they have been set.
   * >
   * > Fails with `header-error.immutable` if the `fields` are immutable.
   * >
   * > Fails with `header-error.invalid-syntax` if the `field-name` or any of
   * > the `field-value`s are syntactically invalid.
   *
   * The existing-branch splice/reuse is an allocation optimization — values are cleared, not retained.
   */
  set(name, values) {
    if (this.#immutable) {
      throw { tag: "immutable" };
    }
    validateHeaderName(name);
    for (const value of values) {
      validateHeaderValue(value);
    }
    const lowercased = name.toLowerCase();
    if (forbiddenHeaders.has(lowercased)) {
      throw { tag: "forbidden" };
    }
    const tableEntries = this.#table.get(lowercased);
    if (tableEntries) {
      this.#entries = this.#entries.filter((entry) => !tableEntries.includes(entry));
      tableEntries.splice(0, tableEntries.length);
    } else {
      this.#table.set(lowercased, []);
    }
    const newTableEntries = this.#table.get(lowercased);
    for (const value of values) {
      const entry = [name, value];
      this.#entries.push(entry);
      newTableEntries.push(entry);
    }
  }
  has(name) {
    return this.#table.has(name.toLowerCase());
  }
  delete(name) {
    if (this.#immutable) {
      throw { tag: "immutable" };
    }
    const lowercased = name.toLowerCase();
    const tableEntries = this.#table.get(lowercased);
    if (tableEntries) {
      this.#entries = this.#entries.filter((entry) => !tableEntries.includes(entry));
      this.#table.delete(lowercased);
    }
  }
  append(name, value) {
    if (this.#immutable) {
      throw { tag: "immutable" };
    }
    validateHeaderName(name);
    validateHeaderValue(value);
    const lowercased = name.toLowerCase();
    if (forbiddenHeaders.has(lowercased)) {
      throw { tag: "forbidden" };
    }
    const entry = [name, value];
    this.#entries.push(entry);
    const tableEntries = this.#table.get(lowercased);
    if (tableEntries) {
      tableEntries.push(entry);
    } else {
      this.#table.set(lowercased, [entry]);
    }
  }
  entries() {
    return this.#entries;
  }
  clone() {
    return fieldsFromEntriesChecked(this.#entries);
  }
  static _lock(fields) {
    fields.#immutable = true;
    return fields;
  }
  static _fromEntriesChecked(entries) {
    const fields = new _Fields();
    fields.#entries = entries;
    for (const entry of entries) {
      const lowercase = entry[0].toLowerCase();
      const existing = fields.#table.get(lowercase);
      if (existing) {
        existing.push(entry);
      } else {
        fields.#table.set(lowercase, [entry]);
      }
    }
    return fields;
  }
};
var fieldsLock = Fields._lock;
delete Fields._lock;
var fieldsFromEntriesChecked = Fields._fromEntriesChecked;
delete Fields._fromEntriesChecked;
var RequestOptions = class {
  static {
    __name(this, "RequestOptions");
  }
  #connectTimeout = DEFAULT_HTTP_TIMEOUT_NS;
  #firstByteTimeout = DEFAULT_HTTP_TIMEOUT_NS;
  #betweenBytesTimeout = DEFAULT_HTTP_TIMEOUT_NS;
  connectTimeout() {
    return this.#connectTimeout;
  }
  setConnectTimeout(duration) {
    if (duration < 0n) {
      throw new Error("duration must not be negative");
    }
    this.#connectTimeout = duration;
  }
  firstByteTimeout() {
    return this.#firstByteTimeout;
  }
  setFirstByteTimeout(duration) {
    if (duration < 0n) {
      throw new Error("duration must not be negative");
    }
    this.#firstByteTimeout = duration;
  }
  betweenBytesTimeout() {
    return this.#betweenBytesTimeout;
  }
  setBetweenBytesTimeout(duration) {
    if (duration < 0n) {
      throw new Error("duration must not be negative");
    }
    this.#betweenBytesTimeout = duration;
  }
};
var OutgoingBody = class _OutgoingBody {
  static {
    __name(this, "OutgoingBody");
  }
  #outputStream = null;
  #chunks = [];
  #finished = false;
  write() {
    const outputStream = this.#outputStream;
    if (outputStream === null) {
      throw void 0;
    }
    this.#outputStream = null;
    return outputStream;
  }
  static finish(body, trailers) {
    if (trailers) {
      throw { tag: "internal-error", val: "trailers unsupported" };
    }
    if (body.#finished) {
      throw { tag: "internal-error", val: "body already finished" };
    }
    body.#finished = true;
  }
  static _bodyData(outgoingBody) {
    if (outgoingBody.#chunks.length === 0) {
      return null;
    }
    let totalLen = 0;
    for (const chunk of outgoingBody.#chunks) {
      totalLen += chunk.byteLength;
    }
    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of outgoingBody.#chunks) {
      result.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return result;
  }
  static _create() {
    const outgoingBody = new _OutgoingBody();
    const chunks = outgoingBody.#chunks;
    outgoingBody.#outputStream = outputStreamCreate({
      write(buf) {
        chunks.push(new Uint8Array(buf));
      },
      blockingFlush() {
      },
      subscribe() {
        return pollableCreate();
      }
    });
    return outgoingBody;
  }
  [symbolDispose3]() {
  }
};
var outgoingBodyCreate = OutgoingBody._create;
delete OutgoingBody._create;
var outgoingBodyData = OutgoingBody._bodyData;
delete OutgoingBody._bodyData;
var OutgoingRequest = class {
  static {
    __name(this, "OutgoingRequest");
  }
  #method = { tag: "get" };
  #scheme = void 0;
  #pathWithQuery = void 0;
  #authority = void 0;
  #headers;
  #body;
  #bodyRequested = false;
  constructor(headers) {
    fieldsLock(headers);
    this.#headers = headers;
    this.#body = outgoingBodyCreate();
  }
  body() {
    if (this.#bodyRequested) {
      throw new Error("Body already requested");
    }
    this.#bodyRequested = true;
    return this.#body;
  }
  method() {
    return this.#method;
  }
  setMethod(method) {
    if (method.tag === "other" && method.val && !method.val.match(/^[a-zA-Z-]+$/)) {
      throw void 0;
    }
    this.#method = method;
  }
  pathWithQuery() {
    return this.#pathWithQuery;
  }
  setPathWithQuery(pathWithQuery) {
    if (pathWithQuery && !pathWithQuery.match(/^[a-zA-Z0-9.\-_~!$&'()*+,;=:@%?/]+$/)) {
      throw void 0;
    }
    this.#pathWithQuery = pathWithQuery;
  }
  scheme() {
    return this.#scheme;
  }
  setScheme(scheme) {
    if (scheme?.tag === "other" && scheme.val && !scheme.val.match(/^[a-zA-Z]+$/)) {
      throw void 0;
    }
    this.#scheme = scheme;
  }
  authority() {
    return this.#authority;
  }
  setAuthority(authority) {
    if (authority) {
      const [host, port, ...extra] = authority.split(":");
      const portNum = Number(port);
      if (extra.length || port !== void 0 && (portNum.toString() !== port || portNum > 65535) || !host.match(/^[a-zA-Z0-9-.]+$/)) {
        throw void 0;
      }
    }
    this.#authority = authority;
  }
  headers() {
    return this.#headers;
  }
  [symbolDispose3]() {
  }
  static _handle(request, options) {
    const scheme = schemeString(request.#scheme);
    const method = "val" in request.#method ? request.#method.val : request.#method.tag;
    if (!request.#pathWithQuery) {
      throw { tag: "HTTP-request-URI-invalid" };
    }
    const url = `${scheme}//${request.#authority || ""}${request.#pathWithQuery}`;
    const headers = new Headers();
    for (const [key, value] of request.#headers.entries()) {
      const lowerKey = key.toLowerCase();
      if (!forbiddenHeaders.has(lowerKey)) {
        headers.set(key, utf8Decoder.decode(value));
      }
    }
    const bodyData = outgoingBodyData(request.#body);
    let timeoutMs = Number(DEFAULT_HTTP_TIMEOUT_NS / 1000000n);
    if (options) {
      const ct = options.connectTimeout?.() ?? DEFAULT_HTTP_TIMEOUT_NS;
      const fbt = options.firstByteTimeout?.() ?? DEFAULT_HTTP_TIMEOUT_NS;
      const minTimeout = ct < fbt ? ct : fbt;
      timeoutMs = Number(minTimeout / 1000000n);
    }
    return futureIncomingResponseCreate(url, method.toUpperCase(), headers, bodyData, timeoutMs);
  }
};
var outgoingRequestHandle = OutgoingRequest._handle;
delete OutgoingRequest._handle;
var IncomingBody = class _IncomingBody {
  static {
    __name(this, "IncomingBody");
  }
  #finished = false;
  #stream = void 0;
  stream() {
    if (!this.#stream) {
      throw void 0;
    }
    const stream = this.#stream;
    this.#stream = null;
    return stream;
  }
  static finish(incomingBody) {
    if (incomingBody.#finished) {
      throw new Error("incoming body already finished");
    }
    incomingBody.#finished = true;
    return futureTrailersCreate();
  }
  [symbolDispose3]() {
  }
  static _create(fetchResponse) {
    const incomingBody = new _IncomingBody();
    let buffer = null;
    let bufferOffset = 0;
    let done = false;
    let reader = null;
    let readPromise = null;
    function ensureReader() {
      if (!reader && fetchResponse.body) {
        reader = fetchResponse.body.getReader();
      }
    }
    __name(ensureReader, "ensureReader");
    function startRead() {
      if (readPromise || done) {
        return;
      }
      ensureReader();
      if (!reader) {
        done = true;
        return;
      }
      readPromise = reader.read().then((result) => {
        readPromise = null;
        if (result.done) {
          done = true;
        } else {
          buffer = result.value;
          bufferOffset = 0;
        }
      }, () => {
        readPromise = null;
        done = true;
      });
    }
    __name(startRead, "startRead");
    incomingBody.#stream = inputStreamCreate({
      read(len) {
        if (done && (buffer === null || bufferOffset >= buffer.byteLength)) {
          throw { tag: "closed" };
        }
        if (buffer !== null && bufferOffset < buffer.byteLength) {
          const available = buffer.byteLength - bufferOffset;
          const toRead = Math.min(Number(len), available);
          const slice = buffer.slice(bufferOffset, bufferOffset + toRead);
          bufferOffset += toRead;
          if (bufferOffset >= buffer.byteLength) {
            buffer = null;
            bufferOffset = 0;
            if (!done) {
              startRead();
            }
          }
          return slice;
        }
        throw { tag: "would-block" };
      },
      blockingRead(len) {
        if (done && (buffer === null || bufferOffset >= buffer.byteLength)) {
          throw { tag: "closed" };
        }
        if (buffer !== null && bufferOffset < buffer.byteLength) {
          const available = buffer.byteLength - bufferOffset;
          const toRead = Math.min(Number(len), available);
          const slice = buffer.slice(bufferOffset, bufferOffset + toRead);
          bufferOffset += toRead;
          if (bufferOffset >= buffer.byteLength) {
            buffer = null;
            bufferOffset = 0;
            if (!done) {
              startRead();
            }
          }
          return slice;
        }
        startRead();
        const waitFor = readPromise || Promise.resolve();
        return waitFor.then(() => {
          if (done && (buffer === null || bufferOffset >= buffer.byteLength)) {
            throw { tag: "closed" };
          }
          if (buffer !== null && bufferOffset < buffer.byteLength) {
            const available = buffer.byteLength - bufferOffset;
            const toRead = Math.min(Number(len), available);
            const slice = buffer.slice(bufferOffset, bufferOffset + toRead);
            bufferOffset += toRead;
            if (bufferOffset >= buffer.byteLength) {
              buffer = null;
              bufferOffset = 0;
              if (!done) {
                startRead();
              }
            }
            return slice;
          }
          throw { tag: "closed" };
        });
      },
      subscribe() {
        if (done || buffer !== null && bufferOffset < buffer.byteLength) {
          return pollableCreate();
        }
        startRead();
        if (readPromise) {
          return pollableCreate(readPromise);
        }
        return pollableCreate();
      }
    });
    startRead();
    return incomingBody;
  }
};
var incomingBodyCreate = IncomingBody._create;
delete IncomingBody._create;
var IncomingResponse = class _IncomingResponse {
  static {
    __name(this, "IncomingResponse");
  }
  #headers;
  #status = 0;
  #body;
  status() {
    return this.#status;
  }
  headers() {
    return this.#headers;
  }
  consume() {
    if (this.#body === void 0) {
      throw void 0;
    }
    const body = this.#body;
    this.#body = void 0;
    return body;
  }
  [symbolDispose3]() {
  }
  static _create(fetchResponse) {
    const res = new _IncomingResponse();
    res.#status = fetchResponse.status;
    const headerEntries = [];
    const encoder = new TextEncoder();
    fetchResponse.headers.forEach((value, key) => {
      headerEntries.push([key, encoder.encode(value)]);
    });
    res.#headers = fieldsLock(fieldsFromEntriesChecked(headerEntries));
    res.#body = incomingBodyCreate(fetchResponse);
    return res;
  }
};
var incomingResponseCreate = IncomingResponse._create;
delete IncomingResponse._create;
var FutureTrailers = class _FutureTrailers {
  static {
    __name(this, "FutureTrailers");
  }
  #requested = false;
  subscribe() {
    return pollableCreate();
  }
  get() {
    if (this.#requested) {
      return { tag: "err", val: void 0 };
    }
    this.#requested = true;
    return {
      tag: "ok",
      val: {
        tag: "ok",
        val: fieldsLock(fieldsFromEntriesChecked([]))
      }
    };
  }
  static _create() {
    return new _FutureTrailers();
  }
};
var futureTrailersCreate = FutureTrailers._create;
delete FutureTrailers._create;
function mapFetchError(err) {
  if (err.name === "AbortError") {
    return { tag: "connection-timeout" };
  }
  if (err.name === "TypeError") {
    return { tag: "connection-refused" };
  }
  return { tag: "internal-error", val: err.message };
}
__name(mapFetchError, "mapFetchError");
var FutureIncomingResponse = class _FutureIncomingResponse {
  static {
    __name(this, "FutureIncomingResponse");
  }
  #result = void 0;
  #promise = null;
  subscribe() {
    return pollableCreate(this.#promise);
  }
  get() {
    if (this.#result === void 0) {
      return void 0;
    }
    const result = this.#result;
    this.#result = { tag: "err" };
    return result;
  }
  [symbolDispose3]() {
    this.#promise = null;
  }
  static _create(url, method, headers, bodyData, timeoutMs) {
    const future = new _FutureIncomingResponse();
    const controller = new AbortController();
    let timer;
    if (timeoutMs < Infinity) {
      timer = setTimeout(() => controller.abort(), timeoutMs);
    }
    const init = {
      method,
      headers,
      signal: controller.signal
    };
    if (bodyData && method !== "GET" && method !== "HEAD") {
      init.body = bodyData;
    }
    future.#promise = fetch(url, init).then((response) => {
      if (timer) {
        clearTimeout(timer);
      }
      future.#result = {
        tag: "ok",
        val: {
          tag: "ok",
          val: incomingResponseCreate(response)
        }
      };
    }, (err) => {
      if (timer) {
        clearTimeout(timer);
      }
      future.#result = {
        tag: "ok",
        val: {
          tag: "err",
          val: mapFetchError(err)
        }
      };
    });
    return future;
  }
};
var futureIncomingResponseCreate = FutureIncomingResponse._create;
delete FutureIncomingResponse._create;
function schemeString(scheme) {
  if (!scheme) {
    return "https:";
  }
  switch (scheme.tag) {
    case "HTTP":
      return "http:";
    case "HTTPS":
      return "https:";
    case "other":
      return scheme.val.toLowerCase() + ":";
  }
  return "https:";
}
__name(schemeString, "schemeString");
function httpErrorCode(err) {
  if ("payload" in err) {
    return err.payload;
  }
  return {
    tag: "internal-error",
    val: "message" in err ? err.message : err.toDebugString()
  };
}
__name(httpErrorCode, "httpErrorCode");
var types2 = {
  Fields,
  FutureIncomingResponse,
  FutureTrailers,
  IncomingBody,
  // @ts-expect-error Not implemented
  IncomingRequest: class IncomingRequest {
    static {
      __name(this, "IncomingRequest");
    }
  },
  IncomingResponse,
  OutgoingBody,
  OutgoingRequest,
  // @ts-expect-error Not implemented
  OutgoingResponse: class OutgoingResponse {
    static {
      __name(this, "OutgoingResponse");
    }
  },
  // @ts-expect-error Not implemented
  ResponseOutparam: class ResponseOutparam {
    static {
      __name(this, "ResponseOutparam");
    }
  },
  RequestOptions,
  httpErrorCode
};

// node_modules/@bytecodealliance/preview2-shim/dist/browser/random.js
var MAX_BYTES = 65536;
var insecureRandomValue1;
var insecureRandomValue2;
var random = {
  getRandomBytes(len) {
    const bytes = new Uint8Array(Number(len));
    if (len > MAX_BYTES) {
      for (var generated = 0; generated < len; generated += MAX_BYTES) {
        crypto.getRandomValues(bytes.subarray(generated, generated + MAX_BYTES));
      }
    } else {
      crypto.getRandomValues(bytes);
    }
    return bytes;
  },
  getRandomU64() {
    return crypto.getRandomValues(new BigUint64Array(1))[0];
  },
  // @ts-expect-error Not defined in WIT
  insecureRandom() {
    if (insecureRandomValue1 === void 0 || insecureRandomValue2 === void 0) {
      insecureRandomValue1 = random.getRandomU64();
      insecureRandomValue2 = random.getRandomU64();
    }
    return [insecureRandomValue1, insecureRandomValue2];
  }
};

// worker/src/wasm/app.js
var { getEnvironment } = environment;
if (getEnvironment === void 0) {
  const err = new Error("unexpectedly undefined local import 'getEnvironment', was 'getEnvironment' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { exit: exit2 } = exit;
if (exit2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'exit', was 'exit' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getStderr } = stderr;
if (getStderr === void 0) {
  const err = new Error("unexpectedly undefined local import 'getStderr', was 'getStderr' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getStdin } = stdin;
if (getStdin === void 0) {
  const err = new Error("unexpectedly undefined local import 'getStdin', was 'getStdin' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getStdout } = stdout;
if (getStdout === void 0) {
  const err = new Error("unexpectedly undefined local import 'getStdout', was 'getStdout' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { TerminalInput: TerminalInput2 } = terminalInput;
if (TerminalInput2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'TerminalInput', was 'TerminalInput' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { TerminalOutput: TerminalOutput2 } = terminalOutput;
if (TerminalOutput2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'TerminalOutput', was 'TerminalOutput' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getTerminalStderr } = terminalStderr;
if (getTerminalStderr === void 0) {
  const err = new Error("unexpectedly undefined local import 'getTerminalStderr', was 'getTerminalStderr' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getTerminalStdin } = terminalStdin;
if (getTerminalStdin === void 0) {
  const err = new Error("unexpectedly undefined local import 'getTerminalStdin', was 'getTerminalStdin' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getTerminalStdout } = terminalStdout;
if (getTerminalStdout === void 0) {
  const err = new Error("unexpectedly undefined local import 'getTerminalStdout', was 'getTerminalStdout' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getDirectories } = preopens;
if (getDirectories === void 0) {
  const err = new Error("unexpectedly undefined local import 'getDirectories', was 'getDirectories' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var {
  Descriptor: Descriptor2,
  filesystemErrorCode
} = types;
if (Descriptor2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'Descriptor', was 'Descriptor' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
if (filesystemErrorCode === void 0) {
  const err = new Error("unexpectedly undefined local import 'filesystemErrorCode', was 'filesystemErrorCode' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var {
  Fields: Fields2,
  FutureTrailers: FutureTrailers2,
  IncomingBody: IncomingBody2,
  IncomingRequest: IncomingRequest2,
  OutgoingBody: OutgoingBody2,
  OutgoingResponse: OutgoingResponse2,
  ResponseOutparam: ResponseOutparam2
} = types2;
if (Fields2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'Fields', was 'Fields' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
if (FutureTrailers2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'FutureTrailers', was 'FutureTrailers' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
if (IncomingBody2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'IncomingBody', was 'IncomingBody' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
if (IncomingRequest2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'IncomingRequest', was 'IncomingRequest' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
if (OutgoingBody2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'OutgoingBody', was 'OutgoingBody' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
if (OutgoingResponse2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'OutgoingResponse', was 'OutgoingResponse' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
if (ResponseOutparam2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'ResponseOutparam', was 'ResponseOutparam' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { Error: Error$1 } = error;
if (Error$1 === void 0) {
  const err = new Error("unexpectedly undefined local import 'Error$1', was 'Error' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var {
  InputStream: InputStream2,
  OutputStream: OutputStream2
} = streams;
if (InputStream2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'InputStream', was 'InputStream' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
if (OutputStream2 === void 0) {
  const err = new Error("unexpectedly undefined local import 'OutputStream', was 'OutputStream' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var { getRandomBytes } = random;
if (getRandomBytes === void 0) {
  const err = new Error("unexpectedly undefined local import 'getRandomBytes', was 'getRandomBytes' available at instantiation?");
  console.error("ERROR:", err.toString());
  throw err;
}
var dv = new DataView(new ArrayBuffer());
var dataView = /* @__PURE__ */ __name((mem) => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer), "dataView");
function toUint64(val) {
  const converted = BigInt(val);
  return BigInt.asUintN(64, converted);
}
__name(toUint64, "toUint64");
function toUint16(val) {
  val >>>= 0;
  val %= 2 ** 16;
  return val;
}
__name(toUint16, "toUint16");
function toUint32(val) {
  return val >>> 0;
}
__name(toUint32, "toUint32");
function toUint8(val) {
  val >>>= 0;
  val %= 2 ** 8;
  return val;
}
__name(toUint8, "toUint8");
function _isValidNumericPrimitive(ty, v) {
  if (v === void 0 || v === null) {
    return false;
  }
  switch (ty) {
    case "bool":
      return v === 0 || v === 1;
      break;
    case "u8":
      return typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 255;
      break;
    case "s8":
      return typeof v === "number" && Number.isInteger(v) && v >= -128 && v <= 127;
      break;
    case "u16":
      return typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 65535;
      break;
    case "s16":
      return typeof v === "number" && Number.isInteger(v) && v >= -32768 && v <= 32767;
    case "u32":
      return typeof v === "number" && Number.isInteger(v) && v >= 0 && v <= 4294967295;
    case "s32":
      return typeof v === "number" && Number.isInteger(v) && v >= -2147483648 && v <= 2147483647;
    case "u64":
      return typeof v === "bigint" && v >= 0 && v <= 18446744073709551615n;
    case "s64":
      return typeof v === "bigint" && v >= -9223372036854775808n && v <= 9223372036854775807n;
      break;
    case "f32":
    case "f64":
      return typeof v === "number";
    default:
      return false;
  }
  return true;
}
__name(_isValidNumericPrimitive, "_isValidNumericPrimitive");
function _requireValidNumericPrimitive(ty, v) {
  if (v === void 0 || v === null || !_isValidNumericPrimitive(ty, v)) {
    throw new TypeError(`invalid ${ty} value [${v}]`);
  }
  return true;
}
__name(_requireValidNumericPrimitive, "_requireValidNumericPrimitive");
var utf16Decoder = new TextDecoder("utf-16");
var isLE = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
function _utf16AllocateAndEncode(str, realloc, memory) {
  const len = str.length;
  const ptr = realloc(0, 0, 2, len * 2);
  const out = new Uint16Array(memory.buffer, ptr, len);
  let i = 0;
  if (isLE) {
    while (i < len) {
      out[i] = str.charCodeAt(i++);
    }
  } else {
    while (i < len) {
      const ch = str.charCodeAt(i);
      out[i++] = (ch & 255) << 8 | ch >>> 8;
    }
  }
  return { ptr, len, codepoints: [...str].length };
}
__name(_utf16AllocateAndEncode, "_utf16AllocateAndEncode");
var TEXT_DECODER_UTF8 = new TextDecoder();
var TEXT_ENCODER_UTF8 = new TextEncoder();
function _utf8AllocateAndEncode(s, realloc, memory) {
  if (typeof s !== "string") {
    throw new TypeError("expected a string, received [" + typeof s + "]");
  }
  if (s.length === 0) {
    return { ptr: 1, len: 0 };
  }
  let len = 0;
  let codepoints = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s.charCodeAt(i);
    codepoints++;
    if (ch < 128) {
      len += 1;
    } else if (ch < 2048) {
      len += 2;
    } else if (ch >= 55296 && ch <= 56319 && i + 1 < s.length && (s.charCodeAt(i + 1) & 64512) === 56320) {
      len += 4;
      i++;
    } else {
      len += 3;
    }
  }
  const ptr = realloc(0, 0, 1, len);
  const { read, written } = TEXT_ENCODER_UTF8.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr, len)
  );
  if (read !== s.length || written !== len) {
    throw new Error("failed to encode whole string");
  }
  const res = { ptr, len, codepoints };
  return res;
}
__name(_utf8AllocateAndEncode, "_utf8AllocateAndEncode");
var T_FLAG = 1 << 30;
function rscTableCreateOwn(table, rep2) {
  const free = table[0] & ~T_FLAG;
  table._createdReps.add(rep2);
  if (free === 0) {
    table.push(0);
    table.push(rep2 | T_FLAG);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = 0;
  table[(free << 1) + 1] = rep2 | T_FLAG;
  return free;
}
__name(rscTableCreateOwn, "rscTableCreateOwn");
function rscTableRemove(table, handle2) {
  const scope = table[handle2 << 1];
  const val = table[(handle2 << 1) + 1];
  const own = (val & T_FLAG) !== 0;
  const rep2 = val & ~T_FLAG;
  if (val === 0 || (scope & T_FLAG) !== 0) {
    throw new TypeError("Invalid handle");
  }
  table[handle2 << 1] = table[0] | T_FLAG;
  table[0] = handle2 | T_FLAG;
  return { rep: rep2, scope, own };
}
__name(rscTableRemove, "rscTableRemove");
var curResourceBorrows = [];
var ASYNC_TASKS_BY_COMPONENT_IDX = /* @__PURE__ */ new Map();
var ASYNC_CURRENT_COMPONENT_IDXS = [];
function getCurrentTask(componentIdx2, taskID) {
  let usedGlobal = false;
  if (componentIdx2 === void 0 || componentIdx2 === null) {
    throw new Error("missing component idx");
  }
  const taskMetas = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx2);
  if (taskMetas === void 0 || taskMetas.length === 0) {
    return void 0;
  }
  if (taskID) {
    return taskMetas.find((meta) => meta.task.id() === taskID);
  }
  const taskMeta = taskMetas[taskMetas.length - 1];
  if (!taskMeta || !taskMeta.task) {
    return void 0;
  }
  return taskMeta;
}
__name(getCurrentTask, "getCurrentTask");
var ASYNC_CURRENT_TASK_IDS = [];
var _debugLog = /* @__PURE__ */ __name((...args) => {
  if (!globalThis?.process?.env?.JCO_DEBUG) {
    return;
  }
  console.debug(...args);
}, "_debugLog");
function clearCurrentTask(componentIdx2, taskID) {
  _debugLog("[clearCurrentTask()] args", { componentIdx: componentIdx2, taskID });
  if (componentIdx2 === void 0 || componentIdx2 === null) {
    throw new Error("missing/invalid component instance index while ending current task");
  }
  const tasks = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx2);
  if (!tasks || !Array.isArray(tasks)) {
    throw new Error("missing/invalid tasks for component instance while ending task");
  }
  if (tasks.length == 0) {
    throw new Error(`no current tasks for component instance [${componentIdx2}] while ending task`);
  }
  if (taskID !== void 0) {
    const last = tasks[tasks.length - 1];
    if (last.id !== taskID) {
      return;
    }
  }
  ASYNC_CURRENT_TASK_IDS.pop();
  ASYNC_CURRENT_COMPONENT_IDXS.pop();
  const taskMeta = tasks.pop();
  return taskMeta.task;
}
__name(clearCurrentTask, "clearCurrentTask");
var ASYNC_STATE = /* @__PURE__ */ new Map();
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
__name(promiseWithResolvers, "promiseWithResolvers");
var Waitable = class {
  static {
    __name(this, "Waitable");
  }
  #componentIdx;
  #pendingEventFn = null;
  #promise;
  #resolve;
  #reject;
  #waitableSet = null;
  #hasSyncWaiter = false;
  #idx = null;
  // to component-global waitables
  target;
  constructor(args) {
    const { componentIdx: componentIdx2, target } = args;
    this.#componentIdx = componentIdx2;
    this.target = args.target;
    this.#resetPromise();
  }
  componentIdx() {
    return this.#componentIdx;
  }
  isInSet() {
    return this.#waitableSet !== null;
  }
  idx() {
    return this.#idx;
  }
  setIdx(idx) {
    if (idx === 0) {
      throw new Error("waitable idx cannot be zero");
    }
    this.#idx = idx;
  }
  setTarget(tgt) {
    this.target = tgt;
  }
  #resetPromise() {
    const { promise, resolve, reject } = promiseWithResolvers();
    this.#promise = promise;
    this.#resolve = resolve;
    this.#reject = reject;
  }
  resolve() {
    this.#resolve();
  }
  reject(err) {
    this.#reject(err);
  }
  promise() {
    return this.#promise;
  }
  hasPendingEvent() {
    return this.#pendingEventFn !== null;
  }
  setPendingEvent(fn) {
    _debugLog("[Waitable#setPendingEvent()] args", {
      waitable: this,
      inSet: this.#waitableSet
    });
    this.#pendingEventFn = fn;
  }
  getPendingEvent() {
    _debugLog("[Waitable#getPendingEvent()] args", {
      waitable: this,
      inSet: this.#waitableSet,
      hasPendingEvent: this.#pendingEventFn !== null
    });
    if (this.#pendingEventFn === null) {
      return null;
    }
    const eventFn = this.#pendingEventFn;
    this.#pendingEventFn = null;
    const e = eventFn();
    this.#resetPromise();
    return e;
  }
  join(waitableSet) {
    _debugLog("[Waitable#join()] args", {
      waitable: this,
      waitableSet,
      isRemoval: waitableSet === null
    });
    if (this.#waitableSet === void 0) {
      throw new TypeError("waitable set must be not be undefined");
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
    _debugLog("[Waitable#drop()] args", {
      componentIdx: this.#componentIdx,
      waitable: this
    });
    if (this.hasPendingEvent()) {
      throw new Error("waitables with pending events cannot be dropped");
    }
    this.join(null);
  }
  async waitForPendingEvent(args) {
    const { cstate } = args;
    if (!cstate) {
      throw new TypeError("missing component state");
    }
    if (this.#waitableSet !== null || this.#hasSyncWaiter) {
      throw new Error("waitable is already in a set/has a sync waiter");
    }
    this.#hasSyncWaiter = true;
    await cstate.waitUntil({
      cancellable: false,
      readyFn: /* @__PURE__ */ __name(() => this.hasPendingEvent(), "readyFn")
    });
    this.#hasSyncWaiter = false;
  }
};
var INSTANCE_FLAGS = /* @__PURE__ */ new Map();
var STORE_TRAP = { error: null };
var WebAssemblyRuntimeError = WebAssembly.RuntimeError;
var RepTable = class _RepTable {
  static {
    __name(this, "RepTable");
  }
  // Sentinel marking a freed slot; the freelist link for a freed slot
  // lives in the odd cell. This keeps get()/contains()/remove() on freed
  // reps well-defined (previously they returned/corrupted freelist links).
  static FREE = /* @__PURE__ */ Symbol("RepTable.free");
  #data = [0, null];
  #size = 0;
  #target;
  constructor(args) {
    this.target = args?.target;
  }
  data() {
    return this.#data;
  }
  insert(val) {
    _debugLog("[RepTable#insert()] args", { val, target: this.target });
    const freeIdx = this.#data[0];
    if (freeIdx === 0) {
      this.#data.push(val);
      this.#data.push(null);
      const rep2 = (this.#data.length >> 1) - 1;
      _debugLog("[RepTable#insert()] inserted", { val, target: this.target, rep: rep2 });
      this.#size += 1;
      return rep2;
    }
    const placementIdx = freeIdx << 1;
    if (this.#data[placementIdx] !== _RepTable.FREE) {
      throw new Error("corrupt rep table freelist: head does not point at a freed slot");
    }
    this.#data[0] = this.#data[placementIdx + 1];
    this.#data[placementIdx] = val;
    this.#data[placementIdx + 1] = null;
    _debugLog("[RepTable#insert()] inserted", { val, target: this.target, rep: freeIdx });
    this.#size += 1;
    return freeIdx;
  }
  get(rep2) {
    _debugLog("[RepTable#get()] args", { rep: rep2, target: this.target });
    if (rep2 === 0) {
      throw new Error("invalid resource rep during get, (cannot be 0)");
    }
    const baseIdx = rep2 << 1;
    const val = this.#data[baseIdx];
    if (val === _RepTable.FREE) {
      return void 0;
    }
    return val;
  }
  contains(rep2) {
    _debugLog("[RepTable#contains()] args", { rep: rep2, target: this.target });
    if (rep2 === 0) {
      throw new Error("invalid resource rep during contains, (cannot be 0)");
    }
    const baseIdx = rep2 << 1;
    const val = this.#data[baseIdx];
    return val !== _RepTable.FREE && !!val;
  }
  remove(rep2) {
    _debugLog("[RepTable#remove()] args", { rep: rep2, target: this.target });
    if (rep2 === 0) {
      throw new Error("invalid resource rep during remove, (cannot be 0)");
    }
    if (this.#data.length === 2) {
      throw new Error("invalid");
    }
    const baseIdx = rep2 << 1;
    if (baseIdx >= this.#data.length) {
      throw new Error(`invalid rep [${rep2}] during remove, out of range`);
    }
    const val = this.#data[baseIdx];
    if (val === _RepTable.FREE) {
      throw new Error(`double removal of rep [${rep2}] (already freed)`);
    }
    this.#data[baseIdx] = _RepTable.FREE;
    this.#data[baseIdx + 1] = this.#data[0];
    this.#data[0] = rep2;
    this.#size -= 1;
    return val;
  }
  size() {
    return this.#size;
  }
  clear() {
    _debugLog("[RepTable#clear()] args", { rep, target: this.target });
    this.#data = [0, null];
  }
};
var ComponentAsyncState = class _ComponentAsyncState {
  static {
    __name(this, "ComponentAsyncState");
  }
  static EVENT_HANDLER_EVENTS = ["backpressure-change"];
  static TickResult = {
    // no suspended tasks remain
    DONE: "done",
    // a suspended task was resumed (more may be ready)
    RESUMED: "resumed",
    // suspended tasks remain but none were ready
    IDLE: "idle"
  };
  #componentIdx;
  #callingAsyncImport = false;
  #syncImportWait = promiseWithResolvers();
  #lockHolderTaskID = null;
  #lockWaiters = [];
  #lockHandoffScheduled = false;
  #parkedTasks = /* @__PURE__ */ new Map();
  #suspendedTasksByTaskID = /* @__PURE__ */ new Map();
  #suspendedTaskIDs = [];
  #errored = null;
  #backpressure = 0;
  #backpressureWaiters = 0n;
  #handlerMap = /* @__PURE__ */ new Map();
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
  }
  componentIdx() {
    return this.#componentIdx;
  }
  get mayLeave() {
    const flags = INSTANCE_FLAGS.get(this.#componentIdx);
    return flags === void 0 ? this.#mayLeave : flags.value === 1;
  }
  set mayLeave(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("mayLeave must be a boolean");
    }
    this.#mayLeave = value;
    const flags = INSTANCE_FLAGS.get(this.#componentIdx);
    if (flags !== void 0) {
      flags.value = value ? 1 : 0;
    }
  }
  errored() {
    return this.#errored !== null;
  }
  setErrored(err) {
    _debugLog("[ComponentAsyncState#setErrored()] component errored", { err, componentIdx: this.#componentIdx });
    if (this.#errored) {
      return;
    }
    if (!err) {
      err = new Error("error elswehere (see other component instance error)");
      err.componentIdx = this.#componentIdx;
    }
    this.#errored = err;
  }
  markTrapped(err) {
    if (!(err instanceof WebAssemblyRuntimeError)) {
      return false;
    }
    _debugLog("[ComponentAsyncState#markTrapped()] component trapped", { err, componentIdx: this.#componentIdx });
    if (STORE_TRAP.error === null) {
      STORE_TRAP.error = err;
    }
    return true;
  }
  throwIfTrapped() {
    if (STORE_TRAP.error !== null) {
      throw STORE_TRAP.error;
    }
  }
  callingSyncImport(val) {
    if (val === void 0) {
      return this.#callingAsyncImport;
    }
    if (typeof val !== "boolean") {
      throw new TypeError("invalid setting for async import");
    }
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
    return this.#backpressure;
  }
  getBackpressure() {
    return this.#backpressure;
  }
  incrementBackpressure() {
    const current = this.#backpressure;
    if (current < 0 || current > 2 ** 16) {
      throw new Error(`invalid current backpressure value [${current}]`);
    }
    const newValue = this.getBackpressure() + 1;
    if (newValue >= 2 ** 16) {
      throw new Error(`invalid new backpressure value [${newValue}], overflow`);
    }
    return this.setBackpressure(newValue);
  }
  decrementBackpressure() {
    const current = this.#backpressure;
    if (current < 0 || current > 2 ** 16) {
      throw new Error(`invalid current backpressure value [${current}]`);
    }
    const newValue = Math.max(0, current - 1);
    if (newValue < 0) {
      throw new Error(`invalid new backpressure value [${newValue}], underflow`);
    }
    return this.setBackpressure(newValue);
  }
  hasBackpressure() {
    return this.#backpressure > 0;
  }
  waitForBackpressure() {
    let backpressureCleared = false;
    const cstate = this;
    cstate.addBackpressureWaiter();
    const handlerID = this.registerHandler({
      event: "backpressure-change",
      fn: /* @__PURE__ */ __name((bp) => {
        if (bp === 0) {
          cstate.removeHandler(handlerID);
          backpressureCleared = true;
        }
      }, "fn")
    });
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (backpressureCleared) {
          return;
        }
        clearInterval(interval);
        cstate.removeBackpressureWaiter();
        resolve(null);
      }, 0);
    });
  }
  registerHandler(args) {
    const { event, fn } = args;
    if (!event) {
      throw new Error("missing handler event");
    }
    if (!fn) {
      throw new Error("missing handler fn");
    }
    if (!_ComponentAsyncState.EVENT_HANDLER_EVENTS.includes(event)) {
      throw new Error(`unrecognized event handler [${event}]`);
    }
    const handlerID = this.#nextHandlerID++;
    let handlers = this.#handlerMap.get(event);
    if (!handlers) {
      handlers = [];
      this.#handlerMap.set(event, handlers);
    }
    handlers.push({ id: handlerID, fn, event });
    return handlerID;
  }
  removeHandler(args) {
    const { event, handlerID } = args;
    const registeredHandlers = this.#handlerMap.get(event);
    if (!registeredHandlers) {
      return;
    }
    const found = registeredHandlers.find((h) => h.id === handlerID);
    if (!found) {
      return;
    }
    this.#handlerMap.set(event, this.#handlerMap.get(event).filter((h) => h.id !== handlerID));
  }
  getBackpressureWaiters() {
    return this.#backpressureWaiters;
  }
  addBackpressureWaiter() {
    this.#backpressureWaiters++;
  }
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
  isExclusivelyLocked() {
    return this.#lockHolderTaskID !== null;
  }
  exclusivelyLockedBy(taskID) {
    return this.#lockHolderTaskID === taskID;
  }
  exclusiveLock(taskID) {
    _debugLog("[ComponentAsyncState#exclusiveLock()]", {
      holder: this.#lockHolderTaskID,
      requester: taskID,
      componentIdx: this.#componentIdx
    });
    if (taskID === void 0 || taskID === null) {
      throw new Error("exclusive lock requires the acquiring task id");
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
    if (taskID === void 0 || taskID === null) {
      throw new Error("exclusive lock requires the acquiring task id");
    }
    if (this.#lockHolderTaskID === null) {
      this.#lockHolderTaskID = taskID;
      _debugLog("[ComponentAsyncState#acquireExclusiveLock()] acquired", {
        holder: taskID,
        componentIdx: this.#componentIdx
      });
      return;
    }
    if (this.#lockHolderTaskID === taskID) {
      throw new Error(`task [${taskID}] already holds the lock for component [${this.#componentIdx}]`);
    }
    _debugLog("[ComponentAsyncState#acquireExclusiveLock()] waiting", {
      holder: this.#lockHolderTaskID,
      requester: taskID,
      componentIdx: this.#componentIdx,
      queued: this.#lockWaiters.length
    });
    await new Promise((resolve) => {
      this.#lockWaiters.push({ taskID, resolve });
    });
  }
  exclusiveRelease(taskID) {
    _debugLog("[ComponentAsyncState#exclusiveRelease()] args", {
      holder: this.#lockHolderTaskID,
      releaser: taskID,
      componentIdx: this.#componentIdx
    });
    if (this.#lockHolderTaskID !== taskID) {
      _debugLog("[ComponentAsyncState#exclusiveRelease()] ignoring foreign release", {
        holder: this.#lockHolderTaskID,
        releaser: taskID,
        componentIdx: this.#componentIdx
      });
      return false;
    }
    this.#lockHolderTaskID = null;
    this.#onExclusiveReleaseHandlers = this.#onExclusiveReleaseHandlers.filter((v) => !!v);
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
    if (this.#lockHandoffScheduled || this.#lockWaiters.length === 0) {
      return;
    }
    this.#lockHandoffScheduled = true;
    queueMicrotask(() => {
      this.#lockHandoffScheduled = false;
      if (this.#lockHolderTaskID !== null) {
        this.#scheduleLockHandoff();
        return;
      }
      const next = this.#lockWaiters.shift();
      if (!next) {
        return;
      }
      this.#lockHolderTaskID = next.taskID;
      next.resolve();
    });
  }
  onNextExclusiveRelease(fn) {
    _debugLog("[ComponentAsyncState#()onNextExclusiveRelease] registering");
    this.#onExclusiveReleaseHandlers.push(fn);
  }
  async waitForExclusiveRelease() {
    while (this.isExclusivelyLocked()) {
      await new Promise((resolve) => this.onNextExclusiveRelease(resolve));
    }
  }
  #getSuspendedTaskMeta(taskID) {
    return this.#suspendedTasksByTaskID.get(taskID);
  }
  #removeSuspendedTaskMeta(taskID) {
    _debugLog("[ComponentAsyncState#removeSuspendedTaskMeta()] removing suspended task", {
      taskID,
      componentIdx: this.#componentIdx
    });
    const idx = this.#suspendedTaskIDs.findIndex((t) => t === taskID);
    const meta = this.#suspendedTasksByTaskID.get(taskID);
    this.#suspendedTaskIDs[idx] = null;
    this.#suspendedTasksByTaskID.delete(taskID);
    return meta;
  }
  #addSuspendedTaskMeta(meta) {
    if (!meta) {
      throw new Error("missing task meta");
    }
    const taskID = meta.taskID;
    this.#suspendedTasksByTaskID.set(taskID, meta);
    this.#suspendedTaskIDs.push(taskID);
    if (this.#suspendedTasksByTaskID.size < this.#suspendedTaskIDs.length - 10) {
      this.#suspendedTaskIDs = this.#suspendedTaskIDs.filter((t) => t !== null);
    }
  }
  // TODO(threads): readyFn is normally on the thread
  suspendTask(args) {
    const { task, readyFn } = args;
    const taskID = task.id();
    const componentIdx2 = task.componentIdx();
    _debugLog("[ComponentAsyncState#suspendTask()]", {
      taskID,
      componentIdx: this.#componentIdx,
      taskEntryFnName: task.entryFnName(),
      subtask: task.getParentSubtask()
    });
    if (componentIdx2 !== this.#componentIdx) {
      throw new Error("assert: task component idx should match async state");
    }
    if (this.#getSuspendedTaskMeta(taskID)) {
      throw new Error(`task [${taskID}] already suspended`);
    }
    const { promise, resolve, reject } = promiseWithResolvers();
    this.#addSuspendedTaskMeta({
      task,
      taskID,
      readyFn,
      resume: /* @__PURE__ */ __name(() => {
        _debugLog("[ComponentAsyncState] resuming suspended task", {
          taskID,
          componentIdx: this.#componentIdx
        });
        resolve(!task.isCancelled());
      }, "resume")
    });
    this.runTickLoop();
    return promise;
  }
  resumeTaskByID(taskID) {
    const meta = this.#removeSuspendedTaskMeta(taskID);
    if (!meta) {
      return;
    }
    if (meta.taskID !== taskID) {
      throw new Error("task ID does not match");
    }
    meta.resume();
  }
  async runTickLoop() {
    if (this.#tickLoop !== null) {
      return;
    }
    this.#tickLoop = 1;
    setTimeout(async () => {
      let result = this.tick();
      while (result !== _ComponentAsyncState.TickResult.DONE) {
        const delay = result === _ComponentAsyncState.TickResult.RESUMED ? 0 : 10;
        await new Promise((resolve) => setTimeout(resolve, delay));
        result = this.tick();
      }
      this.#tickLoop = null;
    }, 10);
  }
  tick() {
    const resumableTasks = this.#suspendedTaskIDs.filter((t) => t !== null);
    for (const taskID of resumableTasks) {
      const meta = this.#suspendedTasksByTaskID.get(taskID);
      if (!meta || !meta.readyFn) {
        throw new Error(`missing/invalid task despite ID [${taskID}] being present`);
      }
      if (meta.task.isRejected()) {
        _debugLog("[ComponentAsyncState#tick()] detected task rejection, leaving early", { meta });
        this.resumeTaskByID(taskID);
        return _ComponentAsyncState.TickResult.RESUMED;
      }
      const isReady = meta.readyFn();
      if (!isReady) {
        continue;
      }
      _debugLog("[ComponentAsyncState#tick()] resuming task via tick", {
        taskID,
        componentIdx: this.#componentIdx
      });
      this.resumeTaskByID(taskID);
      return _ComponentAsyncState.TickResult.RESUMED;
    }
    const idle = this.#suspendedTaskIDs.filter((t) => t !== null).length > 0;
    return idle ? _ComponentAsyncState.TickResult.IDLE : _ComponentAsyncState.TickResult.DONE;
  }
  createWaitable(args) {
    return new Waitable({ target: args?.target });
  }
};
function getOrCreateAsyncState(componentIdx2, init) {
  if (!ASYNC_STATE.has(componentIdx2)) {
    const newState = new ComponentAsyncState({ componentIdx: componentIdx2 });
    ASYNC_STATE.set(componentIdx2, newState);
  }
  return ASYNC_STATE.get(componentIdx2);
}
__name(getOrCreateAsyncState, "getOrCreateAsyncState");
var GLOBAL_COMPONENT_MEMORY_MAP = /* @__PURE__ */ new Map();
function lookupMemoriesForComponent(args) {
  const { componentIdx: componentIdx2 } = args ?? {};
  if (args.componentIdx === void 0) {
    throw new TypeError("missing component idx");
  }
  const metas = GLOBAL_COMPONENT_MEMORY_MAP.get(componentIdx2);
  if (!metas) {
    return [];
  }
  if (args.memoryIdx === void 0) {
    return Object.values(metas);
  }
  const meta = metas[args.memoryIdx];
  return meta?.memory;
}
__name(lookupMemoriesForComponent, "lookupMemoriesForComponent");
var AsyncSubtask = class _AsyncSubtask {
  static {
    __name(this, "AsyncSubtask");
  }
  static _ID = 0n;
  static State = {
    STARTING: 0,
    STARTED: 1,
    RETURNED: 2,
    CANCELLED_BEFORE_STARTED: 3,
    CANCELLED_BEFORE_RETURNED: 4
  };
  #id;
  #state = _AsyncSubtask.State.STARTING;
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
    if (typeof args.componentIdx !== "number") {
      throw new Error("invalid componentIdx for subtask creation");
    }
    this.#componentIdx = args.componentIdx;
    this.#id = ++_AsyncSubtask._ID;
    this.fnName = args.fnName;
    if (!args.parentTask) {
      throw new Error("missing parent task during subtask creation");
    }
    this.#parentTask = args.parentTask;
    if (args.childTask) {
      this.#childTask = args.childTask;
    }
    if (args.memoryIdx) {
      this.#memoryIdx = args.memoryIdx;
    }
    if (!args.waitable) {
      throw new Error("missing/invalid waitable");
    }
    this.#waitable = args.waitable;
    if (args.callMetadata) {
      this.#callMetadata = args.callMetadata;
    }
    this.#lenders = [];
    this.target = args.target;
    this.isAsync = args.isAsync;
    this.isManualAsync = args.isManualAsync;
  }
  id() {
    return this.#id;
  }
  parentTaskID() {
    return this.#parentTask?.id();
  }
  childTaskID() {
    return this.#childTask?.id();
  }
  state() {
    return this.#state;
  }
  waitable() {
    return this.#waitable;
  }
  waitableRep() {
    return this.#waitable.idx();
  }
  join() {
    return this.#waitable.join(...arguments);
  }
  getPendingEvent() {
    return this.#waitable.getPendingEvent(...arguments);
  }
  hasPendingEvent() {
    return this.#waitable.hasPendingEvent(...arguments);
  }
  setPendingEvent() {
    return this.#waitable.setPendingEvent(...arguments);
  }
  setTarget(tgt) {
    this.target = tgt;
  }
  getResult() {
    if (!this.#resultSet) {
      throw new Error("subtask result has not been set");
    }
    return this.#result;
  }
  setResult(v) {
    if (this.#resultSet) {
      throw new Error("subtask result has already been set");
    }
    this.#result = v;
    this.#resultSet = true;
  }
  componentIdx() {
    return this.#componentIdx;
  }
  setChildTask(t) {
    if (!t) {
      throw new Error("cannot set missing/invalid child task on subtask");
    }
    if (this.#childTask) {
      throw new Error("child task is already set on subtask");
    }
    if (this.#parentTask === t) {
      throw new Error("parent cannot be child");
    }
    this.#childTask = t;
  }
  getChildTask(t) {
    return this.#childTask;
  }
  getParentTask() {
    return this.#parentTask;
  }
  setCallbackFn(f, name) {
    if (!f) {
      return;
    }
    if (this.#callbackFn) {
      throw new Error("callback fn can only be set once");
    }
    this.#callbackFn = f;
    this.#callbackFnName = name;
  }
  getCallbackFnName() {
    if (!this.#callbackFn) {
      return void 0;
    }
    return this.#callbackFn.name;
  }
  setPostReturnFn(f) {
    if (!f) {
      return;
    }
    if (this.#postReturnFn) {
      throw new Error("postReturn fn can only be set once");
    }
    this.#postReturnFn = f;
  }
  setOnProgressFn(f) {
    if (this.#onProgressFn) {
      throw new Error("on progress fn can only be set once");
    }
    this.#onProgressFn = f;
  }
  isNotStarted() {
    return this.#state == _AsyncSubtask.State.STARTING;
  }
  cancellationRequested() {
    return this.#cancelRequested;
  }
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
    _debugLog("[AsyncSubtask#requestCancellation()] args", {
      componentIdx: this.#componentIdx,
      subtaskID: this.#id,
      state: this.#state,
      childTaskID: this.childTaskID(),
      fnName: this.fnName
    });
    if (this.#cancelRequested) {
      throw new Error("cancellation has already been requested for this subtask");
    }
    this.#cancelRequested = true;
    if (this.#resolved) {
      return;
    }
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
    _debugLog("[AsyncSubtask#onStart()] args", {
      componentIdx: this.#componentIdx,
      subtaskID: this.#id,
      parentTaskID: this.parentTaskID(),
      fnName: this.fnName,
      args
    });
    if (this.#onProgressFn) {
      this.#onProgressFn();
    }
    this.#state = _AsyncSubtask.State.STARTED;
    let result;
    if (this.#callMetadata.startFn) {
      result = this.#callMetadata.startFn.apply(null, args?.startFnParams ?? []);
    }
    return result;
  }
  registerOnResolveHandler(f) {
    this.#onResolveHandlers.push(f);
  }
  reject(subtaskErr) {
    if (this.#resolved) {
      return;
    }
    if (this.#onProgressFn) {
      this.#onProgressFn();
    }
    if (this.#state === _AsyncSubtask.State.STARTING) {
      this.#state = _AsyncSubtask.State.CANCELLED_BEFORE_STARTED;
    } else if (this.#state === _AsyncSubtask.State.STARTED) {
      this.#state = _AsyncSubtask.State.CANCELLED_BEFORE_RETURNED;
    } else {
      throw new Error("cannot reject a completed subtask");
    }
    this.#resolved = true;
    this.#parentTask.removeSubtask(this);
    this.#parentTask.reject(subtaskErr);
  }
  onResolve(subtaskValue) {
    _debugLog("[AsyncSubtask#onResolve()] args", {
      componentIdx: this.#componentIdx,
      subtaskID: this.#id,
      isAsync: this.isAsync,
      childTaskID: this.childTaskID(),
      parentTaskID: this.parentTaskID(),
      parentTaskFnName: this.#parentTask?.entryFnName(),
      fnName: this.fnName
    });
    if (this.#resolved) {
      throw new Error("subtask has already been resolved");
    }
    if (this.#onProgressFn) {
      this.#onProgressFn();
    }
    if (subtaskValue === null && this.#cancelRequested) {
      if (this.#state === _AsyncSubtask.State.STARTING) {
        this.#state = _AsyncSubtask.State.CANCELLED_BEFORE_STARTED;
      } else {
        if (this.#state !== _AsyncSubtask.State.STARTED) {
          throw new Error("resolved subtask must have been started before cancellation");
        }
        this.#state = _AsyncSubtask.State.CANCELLED_BEFORE_RETURNED;
      }
    } else {
      if (this.#state !== _AsyncSubtask.State.STARTED) {
        throw new Error("resolved subtask must have been started before completion");
      }
      this.#state = _AsyncSubtask.State.RETURNED;
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
    const memory = callMetadata.memory ?? this.#parentTask?.getReturnMemory() ?? lookupMemoriesForComponent({ componentIdx: this.#parentTask?.componentIdx() })[0];
    const returned = this.#state === _AsyncSubtask.State.RETURNED;
    if (returned && callMetadata && !callMetadata.returnFn && this.isAsync && callMetadata.resultPtr && memory) {
      const { resultPtr, realloc } = callMetadata;
      const lowers = callMetadata.lowers;
      if (lowers && lowers.length > 0) {
        lowers[0]({
          componentIdx: this.#componentIdx,
          memory,
          realloc,
          vals: [subtaskValue],
          storagePtr: resultPtr,
          stringEncoding: callMetadata.stringEncoding
        });
      }
    }
    this.#resolved = true;
    this.#parentTask.removeSubtask(this);
    if (!this.isAsync) {
      this.deliverResolve();
      const rep2 = this.waitableRep();
      if (rep2) {
        try {
          const removed = this.#getComponentState().handles.remove(rep2);
          if (removed !== this) {
            throw new Error("unexpectedly received non-self Subtask from handle removal");
          }
          this.drop();
        } catch (err) {
          _debugLog("[AsyncSubtask#onResolve()] failed to remove subtask after sync subtask completion", err);
        }
      }
    }
  }
  getStateNumber() {
    return this.#state;
  }
  isReturned() {
    return this.#state === _AsyncSubtask.State.RETURNED;
  }
  getCallMetadata() {
    return this.#callMetadata;
  }
  isResolved() {
    if (this.#state === _AsyncSubtask.State.STARTING || this.#state === _AsyncSubtask.State.STARTED) {
      return false;
    }
    if (this.#state === _AsyncSubtask.State.RETURNED || this.#state === _AsyncSubtask.State.CANCELLED_BEFORE_STARTED || this.#state === _AsyncSubtask.State.CANCELLED_BEFORE_RETURNED) {
      return true;
    }
    throw new Error("unrecognized internal Subtask state [" + this.#state + "]");
  }
  addLender(handle2) {
    _debugLog("[AsyncSubtask#addLender()] args", { handle: handle2 });
    if (!Number.isNumber(handle2)) {
      throw new Error("missing/invalid lender handle [" + handle2 + "]");
    }
    if (this.#lenders.length === 0 || this.isResolved()) {
      throw new Error("subtask has no lendors or has already been resolved");
    }
    handle2.lends++;
    this.#lenders.push(handle2);
  }
  deliverResolve() {
    _debugLog("[AsyncSubtask#deliverResolve()] args", {
      lenders: this.#lenders,
      parentTaskID: this.parentTaskID(),
      subtaskID: this.#id,
      childTaskID: this.childTaskID(),
      resolved: this.isResolved(),
      resolveDelivered: this.resolveDelivered()
    });
    const cannotDeliverResolve = this.resolveDelivered() || !this.isResolved();
    if (cannotDeliverResolve) {
      throw new Error("subtask cannot deliver resolution twice, and the subtask must be resolved");
    }
    for (const lender of this.#lenders) {
      lender.lends--;
    }
    this.#lenders = null;
  }
  resolveDelivered() {
    _debugLog("[AsyncSubtask#resolveDelivered()] args", {});
    if (this.#lenders === null && !this.isResolved()) {
      throw new Error("invalid subtask state, lenders missing and subtask has not been resolved");
    }
    return this.#lenders === null;
  }
  drop() {
    _debugLog("[AsyncSubtask#drop()] args", {
      componentIdx: this.#componentIdx,
      parentTaskID: this.#parentTask?.id(),
      parentTaskFnName: this.#parentTask?.entryFnName(),
      childTaskID: this.#childTask?.id(),
      childTaskFnName: this.#childTask?.entryFnName(),
      subtaskFnName: this.fnName
    });
    if (!this.#waitable) {
      throw new Error("missing/invalid inner waitable");
    }
    if (!this.resolveDelivered()) {
      throw new Error("cannot drop subtask before resolve is delivered");
    }
    if (this.#waitable) {
      this.#waitable.drop();
    }
    this.#dropped = true;
  }
  #getComponentState() {
    const state = getOrCreateAsyncState(this.#componentIdx);
    if (!state) {
      throw new Error("invalid/missing async state for component [" + componentIdx + "]");
    }
    return state;
  }
  getWaitableHandleIdx() {
    _debugLog("[AsyncSubtask#getWaitableHandleIdx()] args", {});
    if (!this.#waitable) {
      throw new Error("missing/invalid waitable");
    }
    return this.waitableRep();
  }
};
var FutureValue = class _FutureValue {
  static {
    __name(this, "FutureValue");
  }
  #start;
  #settled;
  #hideThen = 0;
  #thenFn;
  constructor(start) {
    if (typeof start !== "function") {
      throw new TypeError("future start operation must be a function");
    }
    this.#start = start;
    this.#thenFn = this.#then.bind(this);
  }
  get then() {
    return this.#hideThen === 0 ? this.#thenFn : void 0;
  }
  #read() {
    if (!this.#settled) {
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
    if (value instanceof _FutureValue) {
      value.resolveAsValue(resolve);
      return;
    }
    resolve(value);
  }
  #then(resolve, reject) {
    return this.#read().then(
      (box) => this.#deliver(resolve, box.value),
      reject
    );
  }
};
var ASYNC_DETERMINISM = "random";
var _coinFlip = /* @__PURE__ */ __name(() => {
  return Math.random() > 0.5;
}, "_coinFlip");
var ASYNC_EVENT_CODE = {
  NONE: 0,
  SUBTASK: 1,
  STREAM_READ: 2,
  STREAM_WRITE: 3,
  FUTURE_READ: 4,
  FUTURE_WRITE: 5,
  TASK_CANCELLED: 6
};
var CURRENT_TASK_META = {};
function _withGlobalCurrentTaskMeta(args) {
  _debugLog("[_withGlobalCurrentTaskMeta()] args", args);
  if (!args) {
    throw new TypeError("args missing");
  }
  if (args.taskID === void 0) {
    throw new TypeError("missing task ID");
  }
  if (args.componentIdx === void 0) {
    throw new TypeError("missing component idx");
  }
  if (!args.fn) {
    throw new TypeError("missing fn");
  }
  const { taskID, componentIdx: componentIdx2, fn } = args;
  const previous = CURRENT_TASK_META[componentIdx2] ?? null;
  try {
    CURRENT_TASK_META[componentIdx2] = { taskID, componentIdx: componentIdx2 };
    return fn();
  } catch (err) {
    _debugLog("error while executing sync callee/callback", {
      ...args,
      err
    });
    throw err;
  } finally {
    CURRENT_TASK_META[componentIdx2] = previous;
  }
}
__name(_withGlobalCurrentTaskMeta, "_withGlobalCurrentTaskMeta");
async function _withGlobalCurrentTaskMetaAsync(args) {
  _debugLog("[_withGlobalCurrentTaskMetaAsync()] args", args);
  if (!args) {
    throw new TypeError("args missing");
  }
  if (args.taskID === void 0) {
    throw new TypeError("missing task ID");
  }
  if (args.componentIdx === void 0) {
    throw new TypeError("missing component idx");
  }
  if (!args.fn) {
    throw new TypeError("missing fn");
  }
  const { taskID, componentIdx: componentIdx2, fn } = args;
  try {
    CURRENT_TASK_META[componentIdx2] = { taskID, componentIdx: componentIdx2 };
    return await fn();
  } catch (err) {
    _debugLog("error while executing async callee/callback", {
      ...args,
      err
    });
    throw err;
  } finally {
    CURRENT_TASK_META[componentIdx2] = null;
  }
}
__name(_withGlobalCurrentTaskMetaAsync, "_withGlobalCurrentTaskMetaAsync");
var AsyncTask = class _AsyncTask {
  static {
    __name(this, "AsyncTask");
  }
  static _ID = 0n;
  static State = {
    INITIAL: "initial",
    CANCELLED: "cancelled",
    CANCEL_PENDING: "cancel-pending",
    CANCEL_DELIVERED: "cancel-delivered",
    RESOLVED: "resolved"
  };
  static BlockResult = {
    CANCELLED: "block.cancelled",
    NOT_CANCELLED: "block.not-cancelled"
  };
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
  returnCalls = 0;
  storage = [0, 0];
  borrowedHandles = {};
  tmpRetI64HighBits = 0 | 0;
  constructor(opts) {
    this.#id = ++_AsyncTask._ID;
    if (opts?.componentIdx === void 0) {
      throw new TypeError("missing component id during task creation");
    }
    this.#componentIdx = opts.componentIdx;
    this.#state = _AsyncTask.State.INITIAL;
    this.#isAsync = opts?.isAsync ?? false;
    this.#isManualAsync = opts?.isManualAsync ?? false;
    this.#preserveFutureResult = opts?.preserveFutureResult ?? false;
    this.#entryFnName = opts.entryFnName;
    this.#callingWasmExport = opts?.callingWasmExport !== false;
    const {
      promise: completionPromise,
      resolve: resolveCompletionPromise,
      reject: rejectCompletionPromise
    } = promiseWithResolvers();
    this.#completionPromise = completionPromise;
    completionPromise.catch(() => {
    });
    this.#onResolveHandlers.push((results) => {
      if (this.#parentSubtask !== null) {
        return;
      }
      if (!this.#isAsync) {
        return;
      }
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
      reject: rejectExitPromise
    } = promiseWithResolvers();
    this.#exitPromise = exitPromise;
    this.#onExitHandlers.push(() => {
      resolveExitPromise();
    });
    if (opts.callbackFn) {
      this.#callbackFn = opts.callbackFn;
    }
    if (opts.callbackFnName) {
      this.#callbackFnName = opts.callbackFnName;
    }
    if (opts.getCalleeParamsFn) {
      this.#getCalleeParamsFn = opts.getCalleeParamsFn;
    }
    if (opts.stringEncoding) {
      this.#stringEncoding = opts.stringEncoding;
    }
    if (opts.parentSubtask) {
      this.#parentSubtask = opts.parentSubtask;
    }
    if (opts.errHandling) {
      this.#errHandling = opts.errHandling;
    }
  }
  taskState() {
    return this.#state;
  }
  id() {
    return this.#id;
  }
  componentIdx() {
    return this.#componentIdx;
  }
  entryFnName() {
    return this.#entryFnName;
  }
  completionPromise() {
    return this.#completionPromise;
  }
  exitPromise() {
    return this.#exitPromise;
  }
  isAsync() {
    return this.#isAsync;
  }
  isSync() {
    return !this.isAsync();
  }
  getErrHandling() {
    return this.#errHandling;
  }
  hasCallback() {
    return this.#callbackFn !== null;
  }
  getReturnMemoryIdx() {
    return this.#memoryIdx;
  }
  setReturnMemoryIdx(idx) {
    if (idx === null) {
      return;
    }
    this.#memoryIdx = idx;
  }
  getReturnMemory() {
    return this.#memory;
  }
  setReturnMemory(m) {
    if (m === null) {
      return;
    }
    this.#memory = m;
  }
  setReturnLowerFns(fns) {
    this.#returnLowerFns = fns;
  }
  getReturnLowerFns() {
    return this.#returnLowerFns;
  }
  setParentSubtask(subtask) {
    if (!subtask || !(subtask instanceof AsyncSubtask)) {
      return;
    }
    if (this.#parentSubtask) {
      throw new Error("parent subtask can only be set once");
    }
    this.#parentSubtask = subtask;
  }
  getParentSubtask() {
    return this.#parentSubtask;
  }
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
    if (!f) {
      return;
    }
    if (this.#postReturnFn) {
      throw new Error("postReturn fn can only be set once");
    }
    this.#postReturnFn = f;
  }
  setCallbackFn(f, name) {
    if (!f) {
      return;
    }
    if (this.#callbackFn) {
      throw new Error("callback fn can only be set once");
    }
    this.#callbackFn = f;
    this.#callbackFnName = name;
  }
  getCallbackFnName() {
    if (!this.#callbackFnName) {
      return void 0;
    }
    return this.#callbackFnName;
  }
  async runCallbackFn(...args) {
    if (!this.#callbackFn) {
      throw new Error("no callback function has been set for task");
    }
    return _withGlobalCurrentTaskMetaAsync({
      taskID: this.#id,
      componentIdx: this.#componentIdx,
      fn: /* @__PURE__ */ __name(() => {
        return this.#callbackFn.apply(null, args);
      }, "fn")
    });
  }
  getCalleeParams() {
    if (!this.#getCalleeParamsFn) {
      throw new Error("missing/invalid getCalleeParamsFn");
    }
    return this.#getCalleeParamsFn();
  }
  mayBlock() {
    return this.isAsync() || this.isResolvedState();
  }
  mayEnter(task) {
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    if (cstate.hasBackpressure()) {
      _debugLog("[AsyncTask#mayEnter()] disallowed due to backpressure", { taskID: this.#id });
      return false;
    }
    if (!cstate.callingSyncImport()) {
      _debugLog("[AsyncTask#mayEnter()] disallowed due to sync import call", { taskID: this.#id });
      return false;
    }
    const callingSyncExportWithSyncPending = cstate.callingSyncExport && !task.isAsync;
    if (!callingSyncExportWithSyncPending) {
      _debugLog("[AsyncTask#mayEnter()] disallowed due to sync export w/ sync pending", { taskID: this.#id });
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
        this.#lockFreeEntry = true;
        _debugLog("[AsyncTask#enterSync()] entering without exclusive lock", {
          taskID: this.#id,
          componentIdx: this.#componentIdx
        });
      }
    }
    return true;
  }
  async enter(opts) {
    _debugLog("[AsyncTask#enter()] args", {
      taskID: this.#id,
      componentIdx: this.#componentIdx,
      subtaskID: this.getParentSubtask()?.id(),
      args: opts,
      entryFnName: this.#entryFnName
    });
    if (this.#entered) {
      throw new Error(`task with ID [${this.#id}] should not be entered twice`);
    }
    if (this.deliverPendingCancel({ cancellable: true })) {
      this.cancel();
      return false;
    }
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    if (opts?.isHost) {
      this.#entered = true;
      return this.#entered;
    }
    if (this.isSync()) {
      this.#entered = true;
      if (this.#isManualAsync) {
        if (this.needsExclusiveLock()) {
          await cstate.acquireExclusiveLock(this.#id);
        }
      }
      return this.#entered;
    }
    if (cstate.hasBackpressure()) {
      cstate.addBackpressureWaiter();
      const result = await this.waitUntil({
        readyFn: /* @__PURE__ */ __name(() => {
          return !cstate.hasBackpressure();
        }, "readyFn"),
        cancellable: true
      });
      cstate.removeBackpressureWaiter();
      if (result === _AsyncTask.BlockResult.CANCELLED) {
        this.cancel();
        return false;
      }
    }
    if (this.needsExclusiveLock()) {
      await cstate.acquireExclusiveLock(this.#id);
    }
    this.#entered = true;
    return this.#entered;
  }
  isRunningState() {
    return this.#state !== _AsyncTask.State.RESOLVED;
  }
  isResolvedState() {
    return this.#state === _AsyncTask.State.RESOLVED;
  }
  isResolved() {
    return this.#state === _AsyncTask.State.RESOLVED;
  }
  isExited() {
    return this.#exited;
  }
  async waitUntil(opts) {
    const { readyFn, cancellable } = opts;
    _debugLog("[AsyncTask#waitUntil()] args", { taskID: this.#id, args: { cancellable } });
    const keepGoing = await this.suspendUntil({
      readyFn,
      cancellable
    });
    return keepGoing;
  }
  async yieldUntil(opts) {
    const { readyFn, cancellable } = opts;
    _debugLog("[AsyncTask#yieldUntil()]", {
      taskID: this.#id,
      args: {
        cancellable
      },
      componentIdx: this.#componentIdx
    });
    const keepGoing = await this.suspendUntil({ readyFn, cancellable });
    if (keepGoing) {
      return {
        code: ASYNC_EVENT_CODE.NONE,
        payload0: 0,
        payload1: 0
      };
    }
    return {
      code: ASYNC_EVENT_CODE.TASK_CANCELLED,
      payload0: 0,
      payload1: 0
    };
  }
  async suspendUntil(opts) {
    const { cancellable, readyFn } = opts;
    _debugLog("[AsyncTask#suspendUntil()] args", {
      taskID: this.#id,
      args: {
        cancellable
      },
      componentIdx: this.#componentIdx
    });
    const pendingCancelled = this.deliverPendingCancel({ cancellable });
    if (pendingCancelled) {
      return false;
    }
    const completed = await this.immediateSuspendUntil({ readyFn, cancellable });
    return completed;
  }
  // TODO(threads): equivalent to thread.suspend_until()
  async immediateSuspendUntil(opts) {
    const { cancellable, readyFn } = opts;
    _debugLog("[AsyncTask#immediateSuspendUntil()] args", {
      args: {
        cancellable,
        readyFn
      },
      taskID: this.#id,
      componentIdx: this.#componentIdx
    });
    const ready = readyFn();
    if (ready && ASYNC_DETERMINISM === "random") {
      const coinFlip = _coinFlip();
      if (coinFlip) {
        return true;
      }
    }
    const keepGoing = await this.immediateSuspend({ cancellable, readyFn });
    return keepGoing;
  }
  async immediateSuspend(opts) {
    const { cancellable, readyFn } = opts;
    _debugLog("[AsyncTask#immediateSuspend()] args", { cancellable, readyFn });
    const pendingCancelled = this.deliverPendingCancel({ cancellable });
    if (pendingCancelled) {
      return false;
    }
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    const keepGoing = await cstate.suspendTask({
      task: this,
      readyFn: /* @__PURE__ */ __name(() => {
        if (cancellable && this.#state === _AsyncTask.State.CANCEL_PENDING) {
          return true;
        }
        return readyFn();
      }, "readyFn")
    });
    if (keepGoing && this.deliverPendingCancel({ cancellable })) {
      return false;
    }
    return keepGoing;
  }
  deliverPendingCancel(opts) {
    const { cancellable } = opts;
    _debugLog("[AsyncTask#deliverPendingCancel()]", {
      args: { cancellable },
      taskID: this.#id,
      componentIdx: this.#componentIdx
    });
    if (cancellable && this.#state === _AsyncTask.State.CANCEL_PENDING) {
      this.#state = _AsyncTask.State.CANCEL_DELIVERED;
      return true;
    }
    return false;
  }
  isCancelled() {
    return this.cancelled;
  }
  // Request cooperative cancellation of this task, called on behalf of a
  // supertask performing `subtask.cancel` on the subtask this task backs.
  //
  // The request is delivered at this task's next cancellable wait
  // (see suspendUntil/immediateSuspend), at which point the task is
  // expected to acknowledge via `task.cancel` or still resolve via
  // `task.return`.
  requestCancellation() {
    _debugLog("[AsyncTask#requestCancellation()] args", {
      taskID: this.#id,
      componentIdx: this.#componentIdx,
      state: this.#state
    });
    if (this.isResolvedState() || this.cancelRequested) {
      return;
    }
    this.cancelRequested = true;
    if (this.#state === _AsyncTask.State.INITIAL) {
      this.#state = _AsyncTask.State.CANCEL_PENDING;
    }
    getOrCreateAsyncState(this.#componentIdx).runTickLoop();
  }
  cancel(args) {
    _debugLog("[AsyncTask#cancel()] args", {});
    if (this.taskState() !== _AsyncTask.State.CANCEL_DELIVERED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}] invalid task state [${this.taskState()}] for cancellation`);
    }
    if (this.borrowedHandles.length > 0) {
      throw new Error("task still has borrow handles");
    }
    this.cancelled = true;
    this.onResolve(args?.error ?? null);
    this.#state = _AsyncTask.State.RESOLVED;
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
    if (this.#rejected) {
      this.#parentSubtask?.reject(taskValue);
      return;
    }
    const parentSubtaskPending = this.#parentSubtask && !this.#parentSubtask.isResolved();
    if (parentSubtaskPending) {
      const meta = this.#parentSubtask.getCallMetadata();
      if (meta.returnFn && !meta.returnFnCalled) {
        _debugLog("[AsyncTask#onResolve()] running returnFn", {
          componentIdx: this.#componentIdx,
          taskID: this.#id,
          subtaskID: this.#parentSubtask.id()
        });
        const callerTask = this.#parentSubtask.getParentTask();
        _withGlobalCurrentTaskMeta({
          taskID: callerTask.id(),
          componentIdx: callerTask.componentIdx(),
          fn: /* @__PURE__ */ __name(() => meta.returnFn.apply(null, [taskValue, meta.resultPtr]), "fn")
        });
        meta.returnFnCalled = true;
      }
    }
    if (this.#postReturnFn) {
      _debugLog("[AsyncTask#onResolve()] running post return ", {
        componentIdx: this.#componentIdx,
        taskID: this.#id
      });
      try {
        _withGlobalCurrentTaskMeta({
          taskID: this.#id,
          componentIdx: this.#componentIdx,
          fn: /* @__PURE__ */ __name(() => this.#postReturnFn(taskValue), "fn")
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
  isRejected() {
    return this.#rejected;
  }
  isErrored() {
    return this.#errored;
  }
  setErrored(err) {
    this.#errored = err;
  }
  reject(taskErr) {
    _debugLog("[AsyncTask#reject()] args", {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
      parentSubtask: this.#parentSubtask,
      parentSubtaskID: this.#parentSubtask?.id(),
      entryFnName: this.entryFnName(),
      callbackFnName: this.#callbackFnName,
      errMsg: taskErr.message
    });
    if (this.isResolvedState() || this.#rejected) {
      return;
    }
    this.#rejected = true;
    this.cancelRequested = true;
    this.#state = _AsyncTask.State.CANCEL_PENDING;
    const cancelled = this.deliverPendingCancel({ cancellable: true });
    this.cancel({ error: taskErr });
  }
  resolve(results) {
    _debugLog("[AsyncTask#resolve()] args", {
      componentIdx: this.#componentIdx,
      taskID: this.#id,
      entryFnName: this.entryFnName(),
      callbackFnName: this.#callbackFnName
    });
    if (this.#state === _AsyncTask.State.RESOLVED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}]  is already resolved (did you forget to wait for an import?)`);
    }
    if (this.borrowedHandles.length > 0) {
      throw new Error("task still has borrow handles");
    }
    this.#state = _AsyncTask.State.RESOLVED;
    switch (results.length) {
      case 0:
        this.onResolve(void 0);
        break;
      case 1:
        this.onResolve(results[0]);
        break;
      default:
        _debugLog("[AsyncTask#resolve()] unexpected number of results", {
          componentIdx: this.#componentIdx,
          results,
          taskID: this.#id,
          subtaskID: this.#parentSubtask?.id(),
          entryFnName: this.#entryFnName,
          callbackFnName: this.#callbackFnName
        });
        throw new Error("unexpected number of results");
    }
  }
  exit(args) {
    _debugLog("[AsyncTask#exit()]", {
      componentIdx: this.#componentIdx,
      taskID: this.#id
    });
    if (this.#exited) {
      throw new Error("task has already exited");
    }
    if (this.#state !== _AsyncTask.State.RESOLVED) {
      throw new Error(`(component [${this.#componentIdx}]) task [${this.#id}] exited without resolution`);
    }
    if (this.borrowedHandles > 0) {
      throw new Error("task [${this.#id}] exited without clearing borrowed handles");
    }
    const state = getOrCreateAsyncState(this.#componentIdx);
    if (!state) {
      throw new Error("missing async state for component [" + this.#componentIdx + "]");
    }
    if (this.#componentIdx !== -1 && !args?.skipExclusiveLockCheck && !this.#lockFreeEntry) {
      if (this.needsExclusiveLock() && !state.exclusivelyLockedBy(this.#id)) {
        throw new Error(`task [${this.#id}] exit: component [${this.#componentIdx}] should have been exclusively locked by it`);
      }
    }
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
    if (this.#componentIdx === -1) {
      return false;
    }
    if (!this.#callingWasmExport) {
      return false;
    }
    return !this.#isAsync || this.hasCallback();
  }
  createSubtask(args) {
    _debugLog("[AsyncTask#createSubtask()] args", args);
    const { componentIdx: componentIdx2, childTask, callMetadata, fnName, isAsync, isManualAsync } = args;
    const cstate = getOrCreateAsyncState(this.#componentIdx);
    if (!cstate) {
      throw new Error(`invalid/missing async state for component idx [${componentIdx2}]`);
    }
    const waitable = new Waitable({
      componentIdx: this.#componentIdx,
      target: `subtask (internal ID [${this.#id}])`
    });
    const newSubtask = new AsyncSubtask({
      componentIdx: componentIdx2,
      childTask,
      parentTask: this,
      callMetadata,
      isAsync,
      isManualAsync,
      fnName,
      waitable
    });
    this.#subtasks.push(newSubtask);
    newSubtask.setTarget(`subtask (internal ID [${newSubtask.id()}], waitable [${waitable.idx()}], component [${componentIdx2}])`);
    waitable.setIdx(cstate.handles.insert(newSubtask));
    waitable.setTarget(`waitable for subtask (waitable id [${waitable.idx()}], subtask internal ID [${newSubtask.id()}])`);
    return newSubtask;
  }
  getLatestSubtask() {
    return this.#subtasks.at(-1);
  }
  getSubtaskByWaitableRep(rep2) {
    if (rep2 === void 0) {
      throw new TypeError("missing rep");
    }
    return this.#subtasks.find((s) => s.waitableRep() === rep2);
  }
  currentSubtask() {
    _debugLog("[AsyncTask#currentSubtask()]");
    if (this.#subtasks.length === 0) {
      return void 0;
    }
    return this.#subtasks.at(-1);
  }
  removeSubtask(subtask) {
    if (this.#subtasks.length === 0) {
      throw new Error("cannot end current subtask: no current subtask");
    }
    this.#subtasks = this.#subtasks.filter((t) => t !== subtask);
    return subtask;
  }
};
function createNewCurrentTask(args) {
  _debugLog("[createNewCurrentTask()] args", args);
  const {
    componentIdx: componentIdx2,
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
    callingWasmExport
  } = args;
  if (componentIdx2 === void 0 || componentIdx2 === null) {
    throw new Error("missing/invalid component instance index while starting task");
  }
  let taskMetas = ASYNC_TASKS_BY_COMPONENT_IDX.get(componentIdx2);
  const callbackFn = getCallbackFn ? getCallbackFn() : null;
  const newTask = new AsyncTask({
    componentIdx: componentIdx2,
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
    callingWasmExport
  });
  const newTaskID = newTask.id();
  const newTaskMeta = { id: newTaskID, componentIdx: componentIdx2, task: newTask };
  ASYNC_CURRENT_TASK_IDS.push(newTaskID);
  ASYNC_CURRENT_COMPONENT_IDXS.push(componentIdx2);
  if (!taskMetas) {
    taskMetas = [newTaskMeta];
    ASYNC_TASKS_BY_COMPONENT_IDX.set(componentIdx2, [newTaskMeta]);
  } else {
    taskMetas.push(newTaskMeta);
  }
  return [newTask, newTaskID];
}
__name(createNewCurrentTask, "createNewCurrentTask");
function _checkMayLeave(componentIdx2) {
  if (INSTANCE_FLAGS.get(componentIdx2)?.value !== 1) {
    throw new WebAssemblyRuntimeError("cannot leave component instance");
  }
}
__name(_checkMayLeave, "_checkMayLeave");
function _getGlobalCurrentTaskMeta(componentIdx2) {
  if (componentIdx2 === null || componentIdx2 === void 0) {
    throw new Error("missing/invalid component idx");
  }
  const v = CURRENT_TASK_META[componentIdx2];
  if (v === void 0 || v === null) {
    return void 0;
  }
  return { ...v };
}
__name(_getGlobalCurrentTaskMeta, "_getGlobalCurrentTaskMeta");
function _setGlobalCurrentTaskMeta(args) {
  if (!args) {
    throw new TypeError("args missing");
  }
  if (args.taskID === void 0) {
    throw new TypeError("missing task ID");
  }
  if (args.componentIdx === void 0) {
    throw new TypeError("missing component idx");
  }
  const { taskID, componentIdx: componentIdx2 } = args;
  return CURRENT_TASK_META[componentIdx2] = { taskID, componentIdx: componentIdx2 };
}
__name(_setGlobalCurrentTaskMeta, "_setGlobalCurrentTaskMeta");
async function _clearCurrentTask(args) {
  _debugLog("[_clearCurrentTask()] args", args);
  if (!args) {
    throw new TypeError("args missing");
  }
  if (args.taskID === void 0) {
    throw new TypeError("missing task ID");
  }
  if (args.componentIdx === void 0) {
    throw new TypeError("missing component idx");
  }
  const { taskID, componentIdx: componentIdx2 } = args;
  const meta = CURRENT_TASK_META[componentIdx2];
  if (!meta) {
    throw new Error(`missing current task meta for component idx [${componentIdx2}]`);
  }
  if (meta.taskID !== taskID) {
    throw new Error(`task ID [${meta.taskID}] != requested ID [${taskID}]`);
  }
  if (meta.componentIdx !== componentIdx2) {
    throw new Error(`component idx [${meta.componentIdx}] != requested idx [${componentIdx2}]`);
  }
  CURRENT_TASK_META[componentIdx2] = null;
}
__name(_clearCurrentTask, "_clearCurrentTask");
function _lowerImportBackwardsCompat(args) {
  const params = [...arguments].slice(1);
  _debugLog("[_lowerImportBackwardsCompat()] args", { args, params });
  const {
    functionIdx,
    componentIdx: componentIdx2,
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
    stringEncoding
  } = args;
  _checkMayLeave(componentIdx2);
  let meta = _getGlobalCurrentTaskMeta(componentIdx2);
  let createdTask;
  if (!meta) {
    if (funcTypeIsAsync || isAsync && !isManualAsync) {
      throw new Error("p3 async wasm exports cannot use backwards compat auto-task init");
    }
    const [newTask, newTaskID] = createNewCurrentTask({
      componentIdx: componentIdx2,
      isAsync,
      isManualAsync,
      callingWasmExport: false
    });
    createdTask = newTask;
    createdTask.registerOnResolveHandler(() => {
      _clearCurrentTask({
        taskID: task.id(),
        componentIdx: task.componentIdx()
      });
    });
    _setGlobalCurrentTaskMeta({
      componentIdx: componentIdx2,
      taskID: newTaskID
    });
    meta = _getGlobalCurrentTaskMeta(componentIdx2);
  }
  const { taskID } = meta;
  const taskMeta = getCurrentTask(componentIdx2, taskID);
  if (!taskMeta) {
    throw new Error("invalid/missing async task meta");
  }
  const task = taskMeta.task;
  if (!task) {
    throw new Error("invalid/missing async task");
  }
  const cstate = getOrCreateAsyncState(componentIdx2);
  if (!task.mayBlock() && funcTypeIsAsync && !isAsync) {
    throw new Error("non async exports cannot synchronously call async functions");
  }
  const memory = getMemoryFn();
  const resultPtr = hasResultPointer ? params[params.length - 1] : void 0;
  const subtask = task.createSubtask({
    componentIdx: componentIdx2,
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
      stringEncoding
    }
  });
  task.setReturnMemoryIdx(memoryIdx);
  task.setReturnMemory(getMemoryFn());
  subtask.onStart();
  if (!isManualAsync && !isAsync && !funcTypeIsAsync) {
    if (createdTask) {
      createdTask.enterSync();
    }
    const res = importFn(...params);
    if (!funcTypeIsAsync && !subtask.isReturned()) {
      throw new Error("post-execution subtasks must either be async or returned");
    }
    const syncRes = subtask.getResult();
    if (createdTask) {
      createdTask.resolve([syncRes]);
    }
    return syncRes;
  }
  if (!isManualAsync && !isAsync && funcTypeIsAsync) {
    const { promise, resolve, reject } = promiseWithResolvers();
    queueMicrotask(async () => {
      try {
        await importFn(...params);
        if (!subtask.isResolved()) {
          await task.suspendUntil({ readyFn: /* @__PURE__ */ __name(() => subtask.isResolved(), "readyFn") });
        }
        resolve(subtask.getResult());
      } catch (err) {
        reject(err);
      }
    });
    return promise;
  }
  const subtaskState = subtask.getStateNumber();
  if (subtaskState < 0 || subtaskState >= 2 ** 4) {
    throw new Error("invalid subtask state, out of valid range");
  }
  subtask.setOnProgressFn(() => {
    subtask.setPendingEvent(() => {
      if (subtask.isResolved()) {
        subtask.deliverResolve();
      }
      const event = {
        code: ASYNC_EVENT_CODE.SUBTASK,
        payload0: subtask.waitableRep(),
        payload1: subtask.getStateNumber()
      };
      return event;
    });
  });
  const requiresManualAsyncResult = !isAsync && !funcTypeIsAsync && isManualAsync;
  let manualAsyncResult;
  if (requiresManualAsyncResult) {
    manualAsyncResult = promiseWithResolvers();
  }
  queueMicrotask(async () => {
    try {
      _debugLog("[_lowerImportBackwardsCompat()] calling lowered import", { importFn, params });
      if (createdTask) {
        await createdTask.enter();
      }
      const asyncRes = await importFn(...params);
      if (requiresManualAsyncResult) {
        manualAsyncResult.resolve(subtask.getResult());
      }
      if (createdTask) {
        createdTask.resolve([asyncRes]);
      }
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
  if (requiresManualAsyncResult) {
    return manualAsyncResult.promise;
  }
  _debugLog("[_lowerImportBackwardsCompat()] async-lowered import return", {
    fnName: importFn.fnName,
    componentIdx: componentIdx2,
    subtaskID: subtask.id(),
    waitableRep: subtask.waitableRep(),
    subtaskState,
    packedResult: Number(subtask.waitableRep()) << 4 | subtaskState
  });
  return Number(subtask.waitableRep()) << 4 | subtaskState;
}
__name(_lowerImportBackwardsCompat, "_lowerImportBackwardsCompat");
var CURRENT_TASK_MAY_BLOCK = globalThis.WebAssembly ? new globalThis.WebAssembly.Global({ value: "i32", mutable: true }, 0) : false;
var SYMMETRIC_SYNC_GUEST_CALL_STACK = [];
function _symmetricSyncGuestCallEnter(callerComponentIdx, calleeIsAsync, calleeComponentIdx) {
  _debugLog("[_symmetricSyncGuestCallEnter()] args", {
    callerComponentIdx,
    calleeIsAsync,
    calleeComponentIdx
  });
  const cstate = getOrCreateAsyncState(calleeComponentIdx);
  if (calleeIsAsync) {
    throw new Error("symmetric sync guest->guest call should not be async");
  }
  const callerTaskMeta = getCurrentTask(callerComponentIdx);
  if (!callerTaskMeta) {
    throw new Error("missing current caller task metadata");
  }
  const callerTask = callerTaskMeta.task;
  if (!callerTask) {
    throw new Error("missing current caller task");
  }
  const subtask = callerTask.createSubtask({
    componentIdx: callerComponentIdx,
    parentTask: callerTask,
    isAsync: !!calleeIsAsync
  });
  const [newTask, newTaskID] = createNewCurrentTask({
    componentIdx: calleeComponentIdx,
    isAsync: !!calleeIsAsync,
    entryFnName: [
      "task",
      callerTask.id(),
      "subtask",
      subtask.id(),
      "task",
      "new-sync-guest-task"
    ].join("/")
  });
  subtask.setChildTask(newTask);
  newTask.setParentSubtask(subtask);
  subtask.onStart();
  const finishEnter = /* @__PURE__ */ __name(() => {
    _setGlobalCurrentTaskMeta({
      taskID: newTask.id(),
      componentIdx: newTask.componentIdx()
    });
    SYMMETRIC_SYNC_GUEST_CALL_STACK.push({
      componentIdx: newTask.componentIdx()
    });
    _debugLog("[_symmetricSyncGuestCallEnter()] finished preparing", {
      callerComponentIdx,
      calleeComponentIdx,
      subtaskID: subtask.id(),
      newTaskID: newTask.id()
    });
  }, "finishEnter");
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
__name(_symmetricSyncGuestCallEnter, "_symmetricSyncGuestCallEnter");
function _symmetricSyncGuestCallExit() {
  const { componentIdx: componentIdx2 } = SYMMETRIC_SYNC_GUEST_CALL_STACK.pop();
  const cstate = getOrCreateAsyncState(componentIdx2);
  const taskMeta = getCurrentTask(componentIdx2);
  if (!taskMeta) {
    throw new Error("missing current caller task metadata");
  }
  const task = taskMeta.task;
  if (!task) {
    throw new Error("missing current caller task");
  }
  _debugLog("[_symmetricSyncGuestCallExit()] exiting", {
    componentIdx: componentIdx2,
    taskID: task.id(),
    subtask: task.getParentSubtask(),
    subtaskID: task.getParentSubtask()?.id(),
    parent: task.getParentSubtask()?.getParentTask()
  });
  task.resolve([]);
  task.exit();
  _clearCurrentTask({
    taskID: task.id(),
    componentIdx: task.componentIdx()
  });
}
__name(_symmetricSyncGuestCallExit, "_symmetricSyncGuestCallExit");
function _liftFlatU8(ctx) {
  _debugLog("[_liftFlatU8()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) {
      throw new Error("expected at least a single i32 argument");
    }
    val = ctx.params[0];
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  if (ctx.storageLen !== void 0 && ctx.storageLen < 1) {
    throw new Error(`insufficient storage ([${ctx.storageLen}] bytes) for lift (u8 requires 1 byte)`);
  }
  val = new DataView(ctx.memory.buffer).getUint8(ctx.storagePtr, true);
  ctx.storagePtr += 1;
  if (ctx.storageLen !== void 0) {
    ctx.storageLen -= 1;
  }
  return [val, ctx];
}
__name(_liftFlatU8, "_liftFlatU8");
function _liftFlatU16(ctx) {
  _debugLog("[_liftFlatU16()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) {
      throw new Error("expected at least a single i32 argument");
    }
    val = ctx.params[0];
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  if (ctx.storageLen !== void 0 && ctx.storageLen < 2) {
    throw new Error(`insufficient storage ([${ctx.storageLen}] bytes) for lift (u16 requires 2 bytes)`);
  }
  val = new DataView(ctx.memory.buffer).getUint16(ctx.storagePtr, true);
  ctx.storagePtr += 2;
  if (ctx.storageLen !== void 0) {
    ctx.storageLen -= 2;
  }
  const rem = ctx.storagePtr % 2;
  if (rem !== 0) {
    ctx.storagePtr += 2 - rem;
  }
  return [val, ctx];
}
__name(_liftFlatU16, "_liftFlatU16");
function _liftFlatU32(ctx) {
  _debugLog("[_liftFlatU32()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) {
      throw new Error("expected at least a single i34 argument");
    }
    val = ctx.params[0] >>> 0;
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  if (ctx.storageLen !== void 0 && ctx.storageLen < 4) {
    throw new Error(`insufficient storage ([${ctx.storageLen}] bytes) for lift (u32 requires 4 bytes)`);
  }
  val = new DataView(ctx.memory.buffer).getUint32(ctx.storagePtr, true);
  ctx.storagePtr += 4;
  if (ctx.storageLen !== void 0) {
    ctx.storageLen -= 4;
  }
  return [val, ctx];
}
__name(_liftFlatU32, "_liftFlatU32");
function _liftFlatU64(ctx) {
  _debugLog("[_liftFlatU64()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length === 0) {
      throw new Error("expected at least one single i64 argument");
    }
    if (typeof ctx.params[0] !== "bigint") {
      throw new Error("expected bigint");
    }
    val = BigInt.asUintN(64, ctx.params[0]);
    ctx.params = ctx.params.slice(1);
    return [val, ctx];
  }
  if (ctx.storageLen !== void 0 && ctx.storageLen < 8) {
    throw new Error(`insufficient storage ([${ctx.storageLen}] bytes) for lift (u64 requires 8 bytes)`);
  }
  val = new DataView(ctx.memory.buffer).getBigUint64(ctx.storagePtr, true);
  ctx.storagePtr += 8;
  if (ctx.storageLen !== void 0) {
    ctx.storageLen -= 8;
  }
  return [val, ctx];
}
__name(_liftFlatU64, "_liftFlatU64");
function _liftFlatStringUTF8(ctx) {
  _debugLog("[_liftFlatStringUTF8()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length < 2) {
      throw new Error("expected at least two u32 arguments");
    }
    let offset = ctx.params[0];
    if (typeof offset === "bigint") {
      offset = Number(offset);
    }
    if (!Number.isSafeInteger(offset)) {
      throw new Error("invalid offset");
    }
    const len = ctx.params[1];
    if (!Number.isSafeInteger(len)) {
      throw new Error("invalid len");
    }
    val = TEXT_DECODER_UTF8.decode(new DataView(ctx.memory.buffer, offset, len));
    ctx.params = ctx.params.slice(2);
    return [val, ctx];
  }
  const rem = ctx.storagePtr % 4;
  if (rem !== 0) {
    ctx.storagePtr += 4 - rem;
  }
  const dv2 = new DataView(ctx.memory.buffer);
  const start = dv2.getUint32(ctx.storagePtr, true);
  const codeUnits = dv2.getUint32(ctx.storagePtr + 4, true);
  val = TEXT_DECODER_UTF8.decode(new Uint8Array(ctx.memory.buffer, start, codeUnits));
  ctx.storagePtr += 8;
  if (ctx.storageLen !== void 0) {
    ctx.storagelen -= 8;
  }
  return [val, ctx];
}
__name(_liftFlatStringUTF8, "_liftFlatStringUTF8");
function _liftFlatStringUTF16(ctx) {
  _debugLog("[_liftFlatStringUTF16()] args", { ctx });
  let val;
  if (ctx.useDirectParams) {
    if (ctx.params.length < 2) {
      throw new Error("expected at least two u32 arguments");
    }
    let offset = ctx.params[0];
    if (typeof offset === "bigint") {
      offset = Number(offset);
    }
    if (!Number.isSafeInteger(offset)) {
      throw new Error("invalid offset");
    }
    const len = ctx.params[1];
    if (!Number.isSafeInteger(len)) {
      throw new Error("invalid len");
    }
    val = utf16Decoder.decode(new DataView(ctx.memory.buffer, offset, len));
    ctx.params = ctx.params.slice(2);
    return [val, ctx];
  }
  const data = new DataView(ctx.memory.buffer);
  const start = data.getUint32(ctx.storagePtr, vals[0], true);
  const codeUnits = data.getUint32(ctx.storagePtr, vals[0] + 4, true);
  val = utf16Decoder.decode(new Uint16Array(ctx.memory.buffer, start, codeUnits));
  ctx.storagePtr = ctx.storagePtr + 2 * codeUnits;
  if (ctx.storageLen !== void 0) {
    ctx.storageLen = ctx.storageLen - 2 * codeUnits;
  }
  return [val, ctx];
}
__name(_liftFlatStringUTF16, "_liftFlatStringUTF16");
function _liftFlatStringAny(ctx) {
  switch (ctx.stringEncoding) {
    case "utf8":
      return _liftFlatStringUTF8(ctx);
    case "utf16":
      return _liftFlatStringUTF16(ctx);
    default:
      throw new Error(`missing/unrecognized/unsupported string encoding [${ctx.stringEncoding}]`);
  }
}
__name(_liftFlatStringAny, "_liftFlatStringAny");
function _liftFlatRecord(meta) {
  const { fieldMetas, size32: recordSize32, align32: recordAlign32 } = meta;
  return /* @__PURE__ */ __name(function _liftFlatRecordInner(ctx) {
    _debugLog("[_liftFlatRecord()] args", { ctx });
    const originalPtr = ctx.storagePtr;
    const res = {};
    for (const [key, liftFn, size32, align32] of fieldMetas) {
      let fieldPtr;
      if (ctx.storagePtr !== void 0) {
        const rem = ctx.storagePtr % align32;
        if (rem !== 0) {
          ctx.storagePtr += align32 - rem;
        }
        fieldPtr = ctx.storagePtr;
      }
      let fieldLen;
      if (ctx.storageLen !== void 0) {
        fieldLen = ctx.storageLen;
      }
      let [val, newCtx] = liftFn(ctx);
      res[key] = val;
      ctx = newCtx;
      if (fieldPtr !== void 0) {
        ctx.storagePtr = Math.max(ctx.storagePtr, fieldPtr + size32);
      }
      if (fieldLen !== void 0) {
        ctx.storageLen = fieldLen - size32;
      }
    }
    if (originalPtr !== void 0) {
      ctx.storagePtr = Math.max(ctx.storagePtr, originalPtr + recordSize32);
    }
    if (ctx.storagePtr !== void 0) {
      const rem = ctx.storagePtr % recordAlign32;
      if (rem !== 0) {
        ctx.storagePtr += recordAlign32 - rem;
      }
    }
    return [res, ctx];
  }, "_liftFlatRecordInner");
}
__name(_liftFlatRecord, "_liftFlatRecord");
var _liftFlatVariantScratch = new DataView(new ArrayBuffer(8));
function _liftFlatVariant(meta) {
  const {
    caseMetas,
    variantSize32,
    variantAlign32,
    variantPayloadOffset32,
    variantFlatCount,
    variantPayloadFlatTypes,
    isEnum
  } = meta;
  return /* @__PURE__ */ __name(function _liftFlatVariantInner(ctx) {
    _debugLog("[_liftFlatVariant()] args", { ctx });
    const origUseParams = ctx.useDirectParams;
    let caseIdx;
    let liftRes;
    const originalPtr = ctx.storagePtr;
    const numCases = caseMetas.length;
    if (caseMetas.length < 256) {
      liftRes = _liftFlatU8(ctx);
    } else if (numCases >= 256 && numCases < 65536) {
      liftRes = _liftFlatU16(ctx);
    } else if (numCases >= 65536 && numCases < 4294967296) {
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
      caseFlatTypes
    ] = caseMetas[caseIdx];
    if (variantPayloadOffset32 === void 0) {
      throw new Error("unexpectedly missing payload offset");
    }
    if (originalPtr !== void 0) {
      ctx.storagePtr = originalPtr + variantPayloadOffset32;
    }
    let val;
    if (liftFn === null) {
      val = { tag };
      if (originalPtr !== void 0) {
        ctx.storagePtr = originalPtr + variantSize32;
      }
    } else {
      if (ctx.useDirectParams) {
        if (!variantPayloadFlatTypes || !caseFlatTypes) {
          throw new Error("missing variant flat type metadata during direct-param lift");
        }
        const scratch = _liftFlatVariantScratch;
        for (let i = 0; i < caseFlatTypes.length; i++) {
          const have = variantPayloadFlatTypes[i];
          const want = caseFlatTypes[i];
          if (have === want) {
            continue;
          }
          const val2 = ctx.params[i];
          if (have === "i64" && want === "i32") {
            ctx.params[i] = Number(BigInt.asIntN(32, val2));
          } else if (have === "i64" && want === "f32") {
            scratch.setInt32(0, Number(BigInt.asIntN(32, val2)), true);
            ctx.params[i] = scratch.getFloat32(0, true);
          } else if (have === "i64" && want === "f64") {
            scratch.setBigInt64(0, val2, true);
            ctx.params[i] = scratch.getFloat64(0, true);
          } else if (have === "i32" && want === "f32") {
            scratch.setInt32(0, val2, true);
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
      if (variantFlatCount === void 0 || variantFlatCount === null) {
        _debugLog("[_liftFlatVariant()] variant with unknown flat count", { ctx, meta });
        throw new Error("cannot lift variant with unknown flat count");
      }
      if (caseFlatCount === void 0 || caseFlatCount === null) {
        _debugLog("[_liftFlatVariant()] case with unknown flat count", { ctx, meta, case: meta.caseMetas[caseIdx] });
        throw new Error("cannot lift case with unknown flat count");
      }
      const remainingPayloadParams = variantFlatCount - caseFlatCount - (isEnum ? 0 : 1);
      if (remainingPayloadParams < 0) {
        throw new Error(`invalid variant flat count metadata`);
      }
      if (ctx.params.length < remainingPayloadParams) {
        throw new Error(`expected at least [${remainingPayloadParams}] remaining variant payload params, but got [${ctx.params.length}]`);
      }
      ctx.params = ctx.params.slice(remainingPayloadParams);
    }
    if (ctx.storagePtr !== void 0) {
      const rem = ctx.storagePtr % variantAlign32;
      if (rem !== 0) {
        ctx.storagePtr += variantAlign32 - rem;
      }
    }
    return [val, ctx];
  }, "_liftFlatVariantInner");
}
__name(_liftFlatVariant, "_liftFlatVariant");
function _liftFlatList(meta) {
  const { elemLiftFn, elemSize32, elemAlign32, knownLen, typedArray } = meta;
  const listValue = typedArray === void 0 ? (values) => values : (values) => new typedArray(values);
  const readValuesAndReset = /* @__PURE__ */ __name((ctx, originalPtr, originalLen, dataPtr, len) => {
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
    if (originalPtr !== null) {
      ctx.storagePtr = originalPtr;
    }
    if (originalLen !== null) {
      ctx.storageLen = originalLen;
    }
    return [listValue(val), ctx];
  }, "readValuesAndReset");
  return /* @__PURE__ */ __name(function _liftFlatListInner(ctx) {
    _debugLog("[_liftFlatList()] args", { ctx });
    let liftResults;
    if (knownLen !== void 0) {
      if (ctx.useDirectParams) {
        _debugLog("memory unexpectedly missing while lifting unknown length list", { ctx });
        liftResults = [listValue(ctx.params.slice(0, knownLen)), ctx];
        ctx.params = ctx.params.slice(knownLen);
      } else {
        if (ctx.memory === null) {
          _debugLog("memory unexpectedly missing while lifting known length list", { knownLen, ctx });
          throw new Error(`memory missing while lifting known length (${knownLen}) list`);
        }
        const originalLen = ctx.storageLen;
        const originalPtr = ctx.storagePtr;
        ctx.storageLen = knownLen * elemSize32;
        liftResults = readValuesAndReset(ctx, null, originalLen, ctx.storagePtr, knownLen);
      }
    } else {
      if (ctx.useDirectParams) {
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
  }, "_liftFlatListInner");
}
__name(_liftFlatList, "_liftFlatList");
function _liftFlatFlags(meta) {
  const { names, size32, align32, intSizeBytes } = meta;
  return /* @__PURE__ */ __name(function _liftFlatFlagsInner(ctx) {
    _debugLog("[_liftFlatFlags()] args", { ctx });
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
        throw new Error("invalid flags size");
    }
    let bits = liftRes[0];
    ctx = liftRes[1];
    for (const name of names) {
      val[name] = (bits & 1) === 1;
      bits >>>= 1;
    }
    const rem = ctx.storagePtr % align32;
    if (rem !== 0) {
      ctx.storagePtr += align32 - rem;
    }
    return [val, ctx];
  }, "_liftFlatFlagsInner");
}
__name(_liftFlatFlags, "_liftFlatFlags");
function _liftFlatOption(meta) {
  const f = _liftFlatVariant(meta);
  return /* @__PURE__ */ __name(function _liftFlatOptionInner(ctx) {
    _debugLog("[_liftFlatOption()] args", { ctx });
    return f(ctx);
  }, "_liftFlatOptionInner");
}
__name(_liftFlatOption, "_liftFlatOption");
function _liftFlatResult(meta) {
  const f = _liftFlatVariant(meta);
  return /* @__PURE__ */ __name(function _liftFlatResultInner(ctx) {
    _debugLog("[_liftFlatResult()] args", { ctx });
    return f(ctx);
  }, "_liftFlatResultInner");
}
__name(_liftFlatResult, "_liftFlatResult");
function _liftFlatOwn(meta) {
  const { classNameFn, createResourceFn, componentIdx: componentIdx2 } = meta;
  return /* @__PURE__ */ __name(function _liftFlatOwnInner(ctx) {
    _debugLog("[_liftFlatOwn()] args", { ctx, className: classNameFn() });
    if (ctx.componentIdx !== componentIdx2) {
      throw new Error("invalid component for resource lift");
    }
    const [handle2, newCtx] = _liftFlatU32(ctx);
    const resource = createResourceFn(handle2);
    return [resource, newCtx];
  }, "_liftFlatOwnInner");
}
__name(_liftFlatOwn, "_liftFlatOwn");
function _liftFlatBorrow(componentTableIdx, size, memory, vals2, storagePtr, storageLen) {
  _debugLog("[_liftFlatBorrow()] args", { size, memory, vals: vals2, storagePtr, storageLen });
  throw new Error("flat lift for borrowed resources is not supported!");
}
__name(_liftFlatBorrow, "_liftFlatBorrow");
function _lowerFlatU8(ctx) {
  _debugLog("[_lowerFlatU8()] args", ctx);
  if (ctx.vals.length !== 1) {
    throw new Error(`unexpected number [${ctx.vals.length}] of vals (expected 1)`);
  }
  _requireValidNumericPrimitive.bind("u8", ctx.vals[0]);
  if (!ctx.memory) {
    throw new Error("missing memory for lower");
  }
  new DataView(ctx.memory.buffer).setUint8(ctx.storagePtr, ctx.vals[0]);
  ctx.storagePtr += 1;
}
__name(_lowerFlatU8, "_lowerFlatU8");
function _lowerFlatU16(ctx) {
  _debugLog("[_lowerFlatU16()] args", { ctx });
  if (!ctx.memory) {
    throw new Error("missing memory for lower");
  }
  if (ctx.vals.length !== 1) {
    throw new Error(`unexpected number [${ctx.vals.length}] of vals (expected 1)`);
  }
  const rem = ctx.storagePtr % 2;
  if (rem !== 0) {
    ctx.storagePtr += 2 - rem;
  }
  _requireValidNumericPrimitive.bind("u16", ctx.vals[0]);
  new DataView(ctx.memory.buffer).setUint16(ctx.storagePtr, ctx.vals[0], true);
  ctx.storagePtr += 2;
}
__name(_lowerFlatU16, "_lowerFlatU16");
function _lowerFlatU32(ctx) {
  _debugLog("[_lowerFlatU32()] args", { ctx });
  if (ctx.vals.length !== 1) {
    throw new Error(`expected single value to lower, got [${ctx.vals.length}]`);
  }
  const rem = ctx.storagePtr % 4;
  if (rem !== 0) {
    ctx.storagePtr += 4 - rem;
  }
  _requireValidNumericPrimitive.bind("u32", ctx.vals[0]);
  new DataView(ctx.memory.buffer).setUint32(ctx.storagePtr, ctx.vals[0], true);
  ctx.storagePtr += 4;
}
__name(_lowerFlatU32, "_lowerFlatU32");
function _lowerFlatU64(ctx) {
  _debugLog("[_lowerFlatU64()] args", { ctx });
  if (ctx.vals.length !== 1) {
    throw new Error("unexpected number of vals");
  }
  const rem = ctx.storagePtr % 8;
  if (rem !== 0) {
    ctx.storagePtr += 8 - rem;
  }
  _requireValidNumericPrimitive.bind("u64", ctx.vals[0]);
  new DataView(ctx.memory.buffer).setBigUint64(ctx.storagePtr, ctx.vals[0], true);
  ctx.storagePtr += 8;
}
__name(_lowerFlatU64, "_lowerFlatU64");
function _lowerFlatStringUTF8(ctx) {
  _debugLog("[_lowerFlatStringUTF8()] args", ctx);
  if (!ctx.realloc) {
    throw new Error("missing realloc during flat string lower");
  }
  const { ptr, len } = _utf8AllocateAndEncode(ctx.vals[0], ctx.realloc, ctx.memory);
  const view = new DataView(ctx.memory.buffer);
  view.setUint32(ctx.storagePtr, ptr, true);
  view.setUint32(ctx.storagePtr + 4, len, true);
  ctx.storagePtr += 8;
}
__name(_lowerFlatStringUTF8, "_lowerFlatStringUTF8");
function _lowerFlatStringUTF16(ctx) {
  _debugLog("[_lowerFlatStringUTF16()] args", { ctx });
  if (!ctx.realloc) {
    throw new Error("missing realloc during flat string lower");
  }
  const { ptr, len } = _utf16AllocateAndEncode(ctx.vals[0], ctx.realloc, ctx.memory);
  const view = new DataView(ctx.memory.buffer);
  view.setUint32(ctx.storagePtr, ptr, true);
  view.setUint32(ctx.storagePtr + 4, len, true);
  ctx.storagePtr += 8;
}
__name(_lowerFlatStringUTF16, "_lowerFlatStringUTF16");
function _lowerFlatStringAny(ctx) {
  switch (ctx.stringEncoding) {
    case "utf8":
      return _lowerFlatStringUTF8(ctx);
    case "utf16":
      return _lowerFlatStringUTF16(ctx);
    default:
      throw new Error(`missing/unrecognized/unsupported string encoding [${ctx.stringEncoding}]`);
  }
}
__name(_lowerFlatStringAny, "_lowerFlatStringAny");
function _lowerFlatRecord(meta) {
  const { fieldMetas, size32: recordSize32, align32: recordAlign32 } = meta;
  return /* @__PURE__ */ __name(function _lowerFlatRecordInner(ctx) {
    _debugLog("[_lowerFlatRecord()] args", { ctx });
    const originalPtr = ctx.storagePtr;
    const r = ctx.vals[0];
    for (const [tag, lowerFn, size32, align32] of fieldMetas) {
      const rem2 = ctx.storagePtr % align32;
      if (rem2 !== 0) {
        ctx.storagePtr += align32 - rem2;
      }
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
  }, "_lowerFlatRecordInner");
}
__name(_lowerFlatRecord, "_lowerFlatRecord");
function _lowerFlatVariant(meta) {
  const { variantSize32, variantAlign32, variantPayloadOffset32, caseMetas } = meta;
  let caseLookup = {};
  for (const [idx, meta2] of caseMetas.entries()) {
    let tag = meta2[0];
    caseLookup[tag] = { discriminant: idx, meta: meta2 };
  }
  return /* @__PURE__ */ __name(function _lowerFlatVariantInner(ctx) {
    _debugLog("[_lowerFlatVariant()] args", { ctx });
    const { tag, val } = ctx.vals[0];
    const variantCase = caseLookup[tag];
    if (!variantCase) {
      throw new Error(`missing tag [${tag}] (valid tags: ${Object.keys(caseLookup)})`);
    }
    const [_tag, lowerFn, caseSize32, caseAlign32, caseFlatCount] = variantCase.meta;
    const originalPtr = ctx.storagePtr;
    ctx.vals = [variantCase.discriminant];
    let discLowerRes;
    if (caseMetas.length < 256) {
      discLowerRes = _lowerFlatU8(ctx);
    } else if (caseMetas.length >= 256 && caseMetas.length < 65536) {
      discLowerRes = _lowerFlatU16(ctx);
    } else if (caseMetas.length >= 65536 && caseMetas.length < 4294967296) {
      discLowerRes = _lowerFlatU32(ctx);
    } else {
      throw new Error(`unsupported number of cases [${caseMetas.length}]`);
    }
    const payloadOffsetPtr = originalPtr + variantPayloadOffset32;
    ctx.storagePtr = payloadOffsetPtr;
    ctx.vals = [val];
    if (lowerFn) {
      lowerFn(ctx);
    }
    ctx.storagePtr = Math.max(ctx.storagePtr, originalPtr + variantSize32);
    const rem = ctx.storagePtr % variantAlign32;
    if (rem !== 0) {
      ctx.storagePtr += variantAlign32 - rem;
    }
  }, "_lowerFlatVariantInner");
}
__name(_lowerFlatVariant, "_lowerFlatVariant");
function _lowerFlatList(meta) {
  const {
    elemLowerFn,
    knownLen,
    size32,
    align32,
    elemSize32,
    elemAlign32
  } = meta;
  if (!elemLowerFn) {
    throw new TypeError("missing/invalid element lower fn for list");
  }
  return /* @__PURE__ */ __name(function _lowerFlatListInner(ctx) {
    _debugLog("[_lowerFlatList()] args", { ctx });
    if (ctx.useDirectParams) {
      if (ctx.params.length < 2) {
        throw new Error("insufficient params left to lower list");
      }
      const storagePtr = ctx.params[0];
      const elemCount = ctx.params[1];
      ctx.params = ctx.params.slice(2);
      const list = ctx.vals[0];
      if (!list) {
        throw new Error("missing direct param value");
      }
      const lowerCtx = {
        storagePtr,
        memory: ctx.memory,
        stringEncoding: ctx.stringEncoding
      };
      for (let idx = 0; idx < list.length; idx++) {
        const elemPtr = storagePtr + idx * elemSize32;
        lowerCtx.storagePtr = elemPtr;
        lowerCtx.vals = list.slice(idx, idx + 1);
        elemLowerFn(lowerCtx);
        lowerCtx.storagePtr = Math.max(lowerCtx.storagePtr, elemPtr + elemSize32);
      }
      ctx.storagePtr = lowerCtx.storagePtr;
      return;
    }
    const elems = ctx.vals[0];
    if (knownLen === void 0) {
      if (!ctx.realloc) {
        throw new Error("missing realloc during flat string lower");
      }
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
    const totalSizeBytes = elems.length * size32;
    if (ctx.storageLen !== void 0 && totalSizeBytes > ctx.storageLen) {
      throw new Error("not enough storage remaining for list flat lower");
    }
  }, "_lowerFlatListInner");
}
__name(_lowerFlatList, "_lowerFlatList");
function _lowerFlatTuple(meta) {
  const { elemLowerMetas, size32: tupleSize32, align32: tupleAlign32 } = meta;
  return /* @__PURE__ */ __name(function _lowerFlatTupleInner(ctx) {
    _debugLog("[_lowerFlatTuple()] args", { ctx });
    const originalPtr = ctx.storagePtr;
    const tuple = ctx.vals[0];
    for (const [idx, [lowerFn, size32, align32]] of elemLowerMetas.entries()) {
      const rem2 = ctx.storagePtr % align32;
      if (rem2 !== 0) {
        ctx.storagePtr += align32 - rem2;
      }
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
  }, "_lowerFlatTupleInner");
}
__name(_lowerFlatTuple, "_lowerFlatTuple");
function _lowerFlatFlags(meta) {
  const { names, size32, align32, intSizeBytes } = meta;
  return /* @__PURE__ */ __name(function _lowerFlatFlagsInner(ctx) {
    _debugLog("[_lowerFlatFlags()] args", { ctx });
    if (ctx.vals.length !== 1) {
      throw new Error("unexpected number of vals");
    }
    const flagObj = ctx.vals[0];
    let flagValue = 0;
    if (typeof flagObj === "object" && flagObj !== null) {
      for (const [idx, name] of names.entries()) {
        if (flagObj[name] === true) {
          flagValue |= 1 << idx;
        }
      }
    } else if (flagObj !== null && flagObj !== void 0) {
      throw new TypeError("only an object, undefined or null can be converted to flags");
    }
    const rem = ctx.storagePtr % align32;
    if (rem !== 0) {
      ctx.storagePtr += align32 - rem;
    }
    const dv2 = new DataView(ctx.memory.buffer);
    if (intSizeBytes === 1) {
      dv2.setUint8(ctx.storagePtr, flagValue);
    } else if (intSizeBytes === 2) {
      dv2.setUint16(ctx.storagePtr, flagValue, true);
    } else if (intSizeBytes === 4) {
      dv2.setUint32(ctx.storagePtr, flagValue, true);
    } else {
      throw new Error(`unrecognized flag size [${intSizeBytes} bytes]`);
    }
    ctx.storagePtr += intSizeBytes;
  }, "_lowerFlatFlagsInner");
}
__name(_lowerFlatFlags, "_lowerFlatFlags");
function _lowerFlatEnum(meta) {
  const f = _lowerFlatVariant(meta);
  return /* @__PURE__ */ __name(function _lowerFlatEnumInner(ctx) {
    _debugLog("[_lowerFlatEnum()] args", { ctx });
    const v = ctx.vals[0];
    const isNotEnumObject = typeof v !== "object" || Object.keys(v).length !== 2 || !("tag" in v);
    if (isNotEnumObject) {
      ctx.vals[0] = { tag: v };
    }
    f(ctx);
  }, "_lowerFlatEnumInner");
}
__name(_lowerFlatEnum, "_lowerFlatEnum");
function _lowerFlatOption(meta) {
  const f = _lowerFlatVariant(meta);
  return /* @__PURE__ */ __name(function _lowerFlatOptionInner(ctx) {
    _debugLog("[_lowerFlatOption()] args", { ctx });
    const v = ctx.vals[0];
    if (v === null || v === void 0) {
      ctx.vals[0] = { tag: "none" };
    } else {
      const isNotOptionObject = typeof v !== "object" || Object.keys(v).length !== 2 || !("tag" in v) || !(v.tag === "some" || v.tag === "none") || !("val" in v);
      if (isNotOptionObject) {
        ctx.vals[0] = { tag: "some", val: v };
      }
    }
    f(ctx);
  }, "_lowerFlatOptionInner");
}
__name(_lowerFlatOption, "_lowerFlatOption");
function _lowerFlatResult(meta) {
  const f = _lowerFlatVariant(meta);
  return /* @__PURE__ */ __name(function _lowerFlatResultInner(ctx) {
    _debugLog("[_lowerFlatResult()] args", { ctx });
    const v = ctx.vals[0];
    const isNotResultObject = typeof v !== "object" || Object.keys(v).length !== 2 || !("tag" in v) || !("ok" === v.tag || "err" === v.tag) || !("val" in v);
    if (isNotResultObject) {
      ctx.vals[0] = { tag: "ok", val: v };
    }
    f(ctx);
  }, "_lowerFlatResultInner");
}
__name(_lowerFlatResult, "_lowerFlatResult");
function _lowerFlatOwn(meta) {
  const { lowerFn, componentIdx: componentIdx2 } = meta;
  return /* @__PURE__ */ __name(function _lowerFlatOwnInner(ctx) {
    _debugLog("[_lowerFlatOwn()] args", { ctx });
    const { createFn } = ctx;
    if (ctx.componentIdx !== componentIdx2) {
      throw new Error(`component index mismatch (expected [${componentIdx2}], lift called from [${ctx.componentIdx}])`);
    }
    const obj = ctx.vals[0];
    if (obj === void 0 || obj === null) {
      throw new Error("missing resource");
    }
    const handle2 = lowerFn(obj);
    ctx.vals[0] = handle2;
    _lowerFlatU32(ctx);
  }, "_lowerFlatOwnInner");
}
__name(_lowerFlatOwn, "_lowerFlatOwn");
function _guardMayLeave(componentIdx2, fn) {
  return function(...args) {
    _checkMayLeave(componentIdx2);
    return fn.apply(this, args);
  };
}
__name(_guardMayLeave, "_guardMayLeave");
var base64Compile = /* @__PURE__ */ __name((str) => WebAssembly.compile(
  typeof Buffer !== "undefined" ? Buffer.from(str, "base64") : Uint8Array.from(atob(str), (b) => b.charCodeAt(0))
), "base64Compile");
function clampGuest(i, min, max) {
  if (i < min || i > max) {
    throw new TypeError(`must be between ${min} and ${max}`);
  }
  return i;
}
__name(clampGuest, "clampGuest");
var isNode = typeof process !== "undefined" && process.versions && process.versions.node;
var _fs;
async function fetchCompile(url) {
  if (isNode) {
    _fs = _fs || await import("node:fs/promises");
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}
__name(fetchCompile, "fetchCompile");
var symbolCabiDispose = /* @__PURE__ */ Symbol.for("cabiDispose");
var symbolRscHandle = /* @__PURE__ */ Symbol("handle");
var symbolRscRep = /* @__PURE__ */ Symbol.for("cabiRep");
var symbolDispose4 = Symbol.dispose || /* @__PURE__ */ Symbol.for("dispose");
var HANDLE_TABLES = [];
var hasOwnProperty = Object.prototype.hasOwnProperty;
function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, "payload")) return e.payload;
  if (e instanceof Error) throw e;
  return e;
}
__name(getErrorPayload, "getErrorPayload");
var instantiateCore = WebAssembly.instantiate;
function _suspendingImport(componentIdx2, fn) {
  return async function(...args) {
    _checkMayLeave(componentIdx2);
    const saved = CURRENT_TASK_META[componentIdx2] ?? null;
    try {
      return await fn.apply(null, args);
    } finally {
      CURRENT_TASK_META[componentIdx2] = saved;
    }
  };
}
__name(_suspendingImport, "_suspendingImport");
var exports0;
var exports1;
var handleTable16 = [T_FLAG, 0];
handleTable16._createdReps = /* @__PURE__ */ new Set();
var captureTable5 = /* @__PURE__ */ new Map();
var captureCnt5 = 0;
HANDLE_TABLES[16] = handleTable16;
var handleTable18 = [T_FLAG, 0];
handleTable18._createdReps = /* @__PURE__ */ new Set();
var captureTable8 = /* @__PURE__ */ new Map();
var captureCnt8 = 0;
HANDLE_TABLES[18] = handleTable18;
var _trampoline8 = /* @__PURE__ */ __name(function(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable16[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingBody2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  } else {
    captureTable5.delete(rep2);
  }
  rscTableRemove(handleTable16, handle1);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[static]incoming-body.finish"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "IncomingBody.finish",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => IncomingBody2.finish(rsc0), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  if (!(ret instanceof FutureTrailers2)) {
    throw new TypeError('Resource error: Not a valid "FutureTrailers" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep3 = ret[symbolRscRep] || ++captureCnt8;
    captureTable8.set(rep3, ret);
    handle3 = rscTableCreateOwn(handleTable18, rep3);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[static]incoming-body.finish"][Instruction::Return]', {
    funcName: "[static]incoming-body.finish",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle3]);
  task.exit();
  return handle3;
}, "_trampoline8");
_trampoline8.fnName = "wasi:http/types@0.2.12#IncomingBody.finish";
var handleTable20 = [T_FLAG, 0];
handleTable20._createdReps = /* @__PURE__ */ new Set();
var captureTable7 = /* @__PURE__ */ new Map();
var captureCnt7 = 0;
HANDLE_TABLES[20] = handleTable20;
var _trampoline9 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable20[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable7.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingResponse2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-response.set-status-code"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "setStatusCode",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.setStatusCode(clampGuest(arg1, 0, 65535)), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  let variant4_0;
  switch (variant4.tag) {
    case "ok": {
      const e = variant4.val;
      variant4_0 = 0;
      break;
    }
    case "err": {
      const e = variant4.val;
      variant4_0 = 1;
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant4, valueType: typeof variant4 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-response.set-status-code"][Instruction::Return]', {
    funcName: "[method]outgoing-response.set-status-code",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([variant4_0]);
  task.exit();
  return variant4_0;
}, "_trampoline9");
_trampoline9.fnName = "wasi:http/types@0.2.12#setStatusCode";
var handleTable22 = [T_FLAG, 0];
handleTable22._createdReps = /* @__PURE__ */ new Set();
var captureTable3 = /* @__PURE__ */ new Map();
var captureCnt3 = 0;
HANDLE_TABLES[22] = handleTable22;
var _trampoline10 = /* @__PURE__ */ __name(function(arg0) {
  var handle1 = arg0;
  var rep2 = handleTable22[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Fields2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  } else {
    captureTable3.delete(rep2);
  }
  rscTableRemove(handleTable22, handle1);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]outgoing-response"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "new OutgoingResponse",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => new OutgoingResponse2(rsc0), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  if (!(ret instanceof OutgoingResponse2)) {
    throw new TypeError('Resource error: Not a valid "OutgoingResponse" resource.');
  }
  var handle3 = ret[symbolRscHandle];
  if (!handle3) {
    const rep3 = ret[symbolRscRep] || ++captureCnt7;
    captureTable7.set(rep3, ret);
    handle3 = rscTableCreateOwn(handleTable20, rep3);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]outgoing-response"][Instruction::Return]', {
    funcName: "[constructor]outgoing-response",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle3]);
  task.exit();
  return handle3;
}, "_trampoline10");
_trampoline10.fnName = "wasi:http/types@0.2.12#new OutgoingResponse";
var _trampoline11 = /* @__PURE__ */ __name(function() {
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]fields"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "new Fields",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => new Fields2(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  if (!(ret instanceof Fields2)) {
    throw new TypeError('Resource error: Not a valid "Fields" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep2 = ret[symbolRscRep] || ++captureCnt3;
    captureTable3.set(rep2, ret);
    handle0 = rscTableCreateOwn(handleTable22, rep2);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[constructor]fields"][Instruction::Return]', {
    funcName: "[constructor]fields",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}, "_trampoline11");
_trampoline11.fnName = "wasi:http/types@0.2.12#new Fields";
var exports2;
var handleTable15 = [T_FLAG, 0];
handleTable15._createdReps = /* @__PURE__ */ new Set();
var captureTable2 = /* @__PURE__ */ new Map();
var captureCnt2 = 0;
HANDLE_TABLES[15] = handleTable15;
var _trampoline16 = /* @__PURE__ */ __name(function() {
  _debugLog('[iface="wasi:cli/stderr@0.2.12", function="get-stderr"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getStderr",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => getStderr(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  if (!(ret instanceof OutputStream2)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep2 = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep2, ret);
    handle0 = rscTableCreateOwn(handleTable15, rep2);
  }
  _debugLog('[iface="wasi:cli/stderr@0.2.12", function="get-stderr"][Instruction::Return]', {
    funcName: "get-stderr",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}, "_trampoline16");
_trampoline16.fnName = "wasi:cli/stderr@0.2.12#getStderr";
var handleTable14 = [T_FLAG, 0];
handleTable14._createdReps = /* @__PURE__ */ new Set();
var captureTable1 = /* @__PURE__ */ new Map();
var captureCnt1 = 0;
HANDLE_TABLES[14] = handleTable14;
var _trampoline19 = /* @__PURE__ */ __name(function() {
  _debugLog('[iface="wasi:cli/stdin@0.2.12", function="get-stdin"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getStdin",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => getStdin(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  if (!(ret instanceof InputStream2)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep2 = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep2, ret);
    handle0 = rscTableCreateOwn(handleTable14, rep2);
  }
  _debugLog('[iface="wasi:cli/stdin@0.2.12", function="get-stdin"][Instruction::Return]', {
    funcName: "get-stdin",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}, "_trampoline19");
_trampoline19.fnName = "wasi:cli/stdin@0.2.12#getStdin";
var _trampoline20 = /* @__PURE__ */ __name(function() {
  _debugLog('[iface="wasi:cli/stdout@0.2.12", function="get-stdout"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getStdout",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => getStdout(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  if (!(ret instanceof OutputStream2)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep2 = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep2, ret);
    handle0 = rscTableCreateOwn(handleTable15, rep2);
  }
  _debugLog('[iface="wasi:cli/stdout@0.2.12", function="get-stdout"][Instruction::Return]', {
    funcName: "get-stdout",
    paramCount: 1,
    async: false,
    postReturn: false
  });
  task.resolve([handle0]);
  task.exit();
  return handle0;
}, "_trampoline20");
_trampoline20.fnName = "wasi:cli/stdout@0.2.12#getStdout";
var _trampoline21 = /* @__PURE__ */ __name(function(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0 = {
        tag: "ok",
        val: void 0
      };
      break;
    }
    case 1: {
      variant0 = {
        tag: "err",
        val: void 0
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  _debugLog('[iface="wasi:cli/exit@0.2.3", function="exit"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "exit",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => exit2(variant0), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  _debugLog('[iface="wasi:cli/exit@0.2.3", function="exit"][Instruction::Return]', {
    funcName: "exit",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline21");
_trampoline21.fnName = "wasi:cli/exit@0.2.3#exit";
var exports3;
var memory0;
var realloc0;
var realloc0Async;
var memory1;
var handleTable23 = [T_FLAG, 0];
handleTable23._createdReps = /* @__PURE__ */ new Set();
var captureTable0 = /* @__PURE__ */ new Map();
var captureCnt0 = 0;
HANDLE_TABLES[23] = handleTable23;
var _trampoline22 = /* @__PURE__ */ __name(function(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable14[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.read"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "read",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.read(BigInt.asUintN(64, BigInt(arg1))), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case "ok": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val4 = e;
      var len4 = Array.isArray(val4) ? val4.length : val4.byteLength;
      var ptr4 = realloc0(0, 0, 1, len4 * 1);
      let valData4;
      const valLenBytes4 = len4 * 1;
      if (Array.isArray(val4)) {
        let offset = 0;
        const dv4 = new DataView(memory0.buffer);
        for (const v of val4) {
          _requireValidNumericPrimitive.bind(null, "u8")(v);
          dv4.setUint8(ptr4 + offset, v, true);
          offset += 1;
        }
      } else {
        valData4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, valLenBytes4);
        const out4 = new Uint8Array(memory0.buffer, ptr4, valLenBytes4);
        out4.set(valData4);
      }
      dataView(memory0).setUint32(arg2 + 8, len4, true);
      dataView(memory0).setUint32(arg2 + 4, ptr4, true);
      break;
    }
    case "err": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case "last-operation-failed": {
          const e2 = variant6.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle5 = e2[symbolRscHandle];
          if (!handle5) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle5 = rscTableCreateOwn(handleTable23, rep3);
          }
          dataView(memory0).setInt32(arg2 + 8, handle5, true);
          break;
        }
        case "closed": {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.read"][Instruction::Return]', {
    funcName: "[method]input-stream.read",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline22");
_trampoline22.fnName = "wasi:io/streams@0.2.12#read";
var _trampoline23 = /* @__PURE__ */ __name(function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable15[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
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
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "blockingWriteAndFlush",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.blockingWriteAndFlush(result3), "fn")
    });
    ret = hostRet4 !== null && typeof hostRet4 === "object" && (hostRet4.tag === "ok" || hostRet4.tag === "err") ? hostRet4 : { tag: "ok", val: hostRet4 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case "ok": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case "last-operation-failed": {
          const e2 = variant6.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle5 = e2[symbolRscHandle];
          if (!handle5) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle5 = rscTableCreateOwn(handleTable23, rep3);
          }
          dataView(memory0).setInt32(arg3 + 8, handle5, true);
          break;
        }
        case "closed": {
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
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-write-and-flush"][Instruction::Return]', {
    funcName: "[method]output-stream.blocking-write-and-flush",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline23");
_trampoline23.fnName = "wasi:io/streams@0.2.12#blockingWriteAndFlush";
var _trampoline24 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable16[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable5.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingBody2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-body.stream"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "stream",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.stream(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof InputStream2)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep3 = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep3, e);
        handle4 = rscTableCreateOwn(handleTable14, rep3);
      }
      dataView(memory0).setInt32(arg1 + 4, handle4, true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-body.stream"][Instruction::Return]', {
    funcName: "[method]incoming-body.stream",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline24");
_trampoline24.fnName = "wasi:http/types@0.2.12#stream";
var handleTable17 = [T_FLAG, 0];
handleTable17._createdReps = /* @__PURE__ */ new Set();
var captureTable9 = /* @__PURE__ */ new Map();
var captureCnt9 = 0;
HANDLE_TABLES[17] = handleTable17;
var _trampoline25 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable17[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingBody2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-body.write"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "write",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.write(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream2)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep3 = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep3, e);
        handle4 = rscTableCreateOwn(handleTable15, rep3);
      }
      dataView(memory0).setInt32(arg1 + 4, handle4, true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-body.write"][Instruction::Return]', {
    funcName: "[method]outgoing-body.write",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline25");
_trampoline25.fnName = "wasi:http/types@0.2.12#write";
var _trampoline26 = /* @__PURE__ */ __name(function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable17[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable9.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingBody2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  } else {
    captureTable9.delete(rep2);
  }
  rscTableRemove(handleTable17, handle1);
  let variant6;
  switch (arg1) {
    case 0: {
      variant6 = void 0;
      break;
    }
    case 1: {
      var handle4 = arg2;
      var rep5 = handleTable22[(handle4 << 1) + 1] & ~T_FLAG;
      var rsc3 = captureTable3.get(rep5);
      if (!rsc3) {
        rsc3 = Object.create(Fields2.prototype);
        Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4 });
        Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5 });
      } else {
        captureTable3.delete(rep5);
      }
      rscTableRemove(handleTable22, handle4);
      variant6 = rsc3;
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for option");
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[static]outgoing-body.finish"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "OutgoingBody.finish",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => OutgoingBody2.finish(rsc0, variant6), "fn")
    });
    ret = hostRet7 !== null && typeof hostRet7 === "object" && (hostRet7.tag === "ok" || hostRet7.tag === "err") ? hostRet7 : { tag: "ok", val: hostRet7 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  var variant46 = ret;
  switch (variant46.tag) {
    case "ok": {
      const e = variant46.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant46.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant45 = e;
      switch (variant45.tag) {
        case "DNS-timeout": {
          dataView(memory0).setInt8(arg3 + 8, 0, true);
          break;
        }
        case "DNS-error": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 1, true);
          var { rcode: v8_0, infoCode: v8_1 } = e2;
          var variant10 = v8_0;
          if (variant10 === null || variant10 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant10;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var encodeRes = _utf8AllocateAndEncode(e3, realloc0, memory0);
            var ptr9 = encodeRes.ptr;
            var len9 = encodeRes.len;
            dataView(memory0).setUint32(arg3 + 24, len9, true);
            dataView(memory0).setUint32(arg3 + 20, ptr9, true);
          }
          var variant11 = v8_1;
          if (variant11 === null || variant11 === void 0) {
            dataView(memory0).setInt8(arg3 + 28, 0, true);
          } else {
            const e3 = variant11;
            dataView(memory0).setInt8(arg3 + 28, 1, true);
            dataView(memory0).setInt16(arg3 + 30, toUint16(e3), true);
          }
          break;
        }
        case "destination-not-found": {
          dataView(memory0).setInt8(arg3 + 8, 2, true);
          break;
        }
        case "destination-unavailable": {
          dataView(memory0).setInt8(arg3 + 8, 3, true);
          break;
        }
        case "destination-IP-prohibited": {
          dataView(memory0).setInt8(arg3 + 8, 4, true);
          break;
        }
        case "destination-IP-unroutable": {
          dataView(memory0).setInt8(arg3 + 8, 5, true);
          break;
        }
        case "connection-refused": {
          dataView(memory0).setInt8(arg3 + 8, 6, true);
          break;
        }
        case "connection-terminated": {
          dataView(memory0).setInt8(arg3 + 8, 7, true);
          break;
        }
        case "connection-timeout": {
          dataView(memory0).setInt8(arg3 + 8, 8, true);
          break;
        }
        case "connection-read-timeout": {
          dataView(memory0).setInt8(arg3 + 8, 9, true);
          break;
        }
        case "connection-write-timeout": {
          dataView(memory0).setInt8(arg3 + 8, 10, true);
          break;
        }
        case "connection-limit-reached": {
          dataView(memory0).setInt8(arg3 + 8, 11, true);
          break;
        }
        case "TLS-protocol-error": {
          dataView(memory0).setInt8(arg3 + 8, 12, true);
          break;
        }
        case "TLS-certificate-error": {
          dataView(memory0).setInt8(arg3 + 8, 13, true);
          break;
        }
        case "TLS-alert-received": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 14, true);
          var { alertId: v12_0, alertMessage: v12_1 } = e2;
          var variant13 = v12_0;
          if (variant13 === null || variant13 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant13;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt8(arg3 + 17, toUint8(e3), true);
          }
          var variant15 = v12_1;
          if (variant15 === null || variant15 === void 0) {
            dataView(memory0).setInt8(arg3 + 20, 0, true);
          } else {
            const e3 = variant15;
            dataView(memory0).setInt8(arg3 + 20, 1, true);
            var encodeRes = _utf8AllocateAndEncode(e3, realloc0, memory0);
            var ptr14 = encodeRes.ptr;
            var len14 = encodeRes.len;
            dataView(memory0).setUint32(arg3 + 28, len14, true);
            dataView(memory0).setUint32(arg3 + 24, ptr14, true);
          }
          break;
        }
        case "HTTP-request-denied": {
          dataView(memory0).setInt8(arg3 + 8, 15, true);
          break;
        }
        case "HTTP-request-length-required": {
          dataView(memory0).setInt8(arg3 + 8, 16, true);
          break;
        }
        case "HTTP-request-body-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 17, true);
          var variant16 = e2;
          if (variant16 === null || variant16 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant16;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setBigInt64(arg3 + 24, toUint64(e3), true);
          }
          break;
        }
        case "HTTP-request-method-invalid": {
          dataView(memory0).setInt8(arg3 + 8, 18, true);
          break;
        }
        case "HTTP-request-URI-invalid": {
          dataView(memory0).setInt8(arg3 + 8, 19, true);
          break;
        }
        case "HTTP-request-URI-too-long": {
          dataView(memory0).setInt8(arg3 + 8, 20, true);
          break;
        }
        case "HTTP-request-header-section-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 21, true);
          var variant17 = e2;
          if (variant17 === null || variant17 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant17;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt32(arg3 + 20, toUint32(e3), true);
          }
          break;
        }
        case "HTTP-request-header-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 22, true);
          var variant22 = e2;
          if (variant22 === null || variant22 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant22;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var { fieldName: v18_0, fieldSize: v18_1 } = e3;
            var variant20 = v18_0;
            if (variant20 === null || variant20 === void 0) {
              dataView(memory0).setInt8(arg3 + 20, 0, true);
            } else {
              const e4 = variant20;
              dataView(memory0).setInt8(arg3 + 20, 1, true);
              var encodeRes = _utf8AllocateAndEncode(e4, realloc0, memory0);
              var ptr19 = encodeRes.ptr;
              var len19 = encodeRes.len;
              dataView(memory0).setUint32(arg3 + 28, len19, true);
              dataView(memory0).setUint32(arg3 + 24, ptr19, true);
            }
            var variant21 = v18_1;
            if (variant21 === null || variant21 === void 0) {
              dataView(memory0).setInt8(arg3 + 32, 0, true);
            } else {
              const e4 = variant21;
              dataView(memory0).setInt8(arg3 + 32, 1, true);
              dataView(memory0).setInt32(arg3 + 36, toUint32(e4), true);
            }
          }
          break;
        }
        case "HTTP-request-trailer-section-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 23, true);
          var variant23 = e2;
          if (variant23 === null || variant23 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant23;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt32(arg3 + 20, toUint32(e3), true);
          }
          break;
        }
        case "HTTP-request-trailer-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 24, true);
          var { fieldName: v24_0, fieldSize: v24_1 } = e2;
          var variant26 = v24_0;
          if (variant26 === null || variant26 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant26;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var encodeRes = _utf8AllocateAndEncode(e3, realloc0, memory0);
            var ptr25 = encodeRes.ptr;
            var len25 = encodeRes.len;
            dataView(memory0).setUint32(arg3 + 24, len25, true);
            dataView(memory0).setUint32(arg3 + 20, ptr25, true);
          }
          var variant27 = v24_1;
          if (variant27 === null || variant27 === void 0) {
            dataView(memory0).setInt8(arg3 + 28, 0, true);
          } else {
            const e3 = variant27;
            dataView(memory0).setInt8(arg3 + 28, 1, true);
            dataView(memory0).setInt32(arg3 + 32, toUint32(e3), true);
          }
          break;
        }
        case "HTTP-response-incomplete": {
          dataView(memory0).setInt8(arg3 + 8, 25, true);
          break;
        }
        case "HTTP-response-header-section-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 26, true);
          var variant28 = e2;
          if (variant28 === null || variant28 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant28;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt32(arg3 + 20, toUint32(e3), true);
          }
          break;
        }
        case "HTTP-response-header-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 27, true);
          var { fieldName: v29_0, fieldSize: v29_1 } = e2;
          var variant31 = v29_0;
          if (variant31 === null || variant31 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant31;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var encodeRes = _utf8AllocateAndEncode(e3, realloc0, memory0);
            var ptr30 = encodeRes.ptr;
            var len30 = encodeRes.len;
            dataView(memory0).setUint32(arg3 + 24, len30, true);
            dataView(memory0).setUint32(arg3 + 20, ptr30, true);
          }
          var variant32 = v29_1;
          if (variant32 === null || variant32 === void 0) {
            dataView(memory0).setInt8(arg3 + 28, 0, true);
          } else {
            const e3 = variant32;
            dataView(memory0).setInt8(arg3 + 28, 1, true);
            dataView(memory0).setInt32(arg3 + 32, toUint32(e3), true);
          }
          break;
        }
        case "HTTP-response-body-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 28, true);
          var variant33 = e2;
          if (variant33 === null || variant33 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant33;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setBigInt64(arg3 + 24, toUint64(e3), true);
          }
          break;
        }
        case "HTTP-response-trailer-section-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 29, true);
          var variant34 = e2;
          if (variant34 === null || variant34 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant34;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            dataView(memory0).setInt32(arg3 + 20, toUint32(e3), true);
          }
          break;
        }
        case "HTTP-response-trailer-size": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 30, true);
          var { fieldName: v35_0, fieldSize: v35_1 } = e2;
          var variant37 = v35_0;
          if (variant37 === null || variant37 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant37;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var encodeRes = _utf8AllocateAndEncode(e3, realloc0, memory0);
            var ptr36 = encodeRes.ptr;
            var len36 = encodeRes.len;
            dataView(memory0).setUint32(arg3 + 24, len36, true);
            dataView(memory0).setUint32(arg3 + 20, ptr36, true);
          }
          var variant38 = v35_1;
          if (variant38 === null || variant38 === void 0) {
            dataView(memory0).setInt8(arg3 + 28, 0, true);
          } else {
            const e3 = variant38;
            dataView(memory0).setInt8(arg3 + 28, 1, true);
            dataView(memory0).setInt32(arg3 + 32, toUint32(e3), true);
          }
          break;
        }
        case "HTTP-response-transfer-coding": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 31, true);
          var variant40 = e2;
          if (variant40 === null || variant40 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant40;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var encodeRes = _utf8AllocateAndEncode(e3, realloc0, memory0);
            var ptr39 = encodeRes.ptr;
            var len39 = encodeRes.len;
            dataView(memory0).setUint32(arg3 + 24, len39, true);
            dataView(memory0).setUint32(arg3 + 20, ptr39, true);
          }
          break;
        }
        case "HTTP-response-content-coding": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 32, true);
          var variant42 = e2;
          if (variant42 === null || variant42 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant42;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var encodeRes = _utf8AllocateAndEncode(e3, realloc0, memory0);
            var ptr41 = encodeRes.ptr;
            var len41 = encodeRes.len;
            dataView(memory0).setUint32(arg3 + 24, len41, true);
            dataView(memory0).setUint32(arg3 + 20, ptr41, true);
          }
          break;
        }
        case "HTTP-response-timeout": {
          dataView(memory0).setInt8(arg3 + 8, 33, true);
          break;
        }
        case "HTTP-upgrade-failed": {
          dataView(memory0).setInt8(arg3 + 8, 34, true);
          break;
        }
        case "HTTP-protocol-error": {
          dataView(memory0).setInt8(arg3 + 8, 35, true);
          break;
        }
        case "loop-detected": {
          dataView(memory0).setInt8(arg3 + 8, 36, true);
          break;
        }
        case "configuration-error": {
          dataView(memory0).setInt8(arg3 + 8, 37, true);
          break;
        }
        case "internal-error": {
          const e2 = variant45.val;
          dataView(memory0).setInt8(arg3 + 8, 38, true);
          var variant44 = e2;
          if (variant44 === null || variant44 === void 0) {
            dataView(memory0).setInt8(arg3 + 16, 0, true);
          } else {
            const e3 = variant44;
            dataView(memory0).setInt8(arg3 + 16, 1, true);
            var encodeRes = _utf8AllocateAndEncode(e3, realloc0, memory0);
            var ptr43 = encodeRes.ptr;
            var len43 = encodeRes.len;
            dataView(memory0).setUint32(arg3 + 24, len43, true);
            dataView(memory0).setUint32(arg3 + 20, ptr43, true);
          }
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant45.tag)}\` (received \`${variant45}\`) specified for \`ErrorCode\``);
        }
      }
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant46, valueType: typeof variant46 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[static]outgoing-body.finish"][Instruction::Return]', {
    funcName: "[static]outgoing-body.finish",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline26");
_trampoline26.fnName = "wasi:http/types@0.2.12#OutgoingBody.finish";
var handleTable19 = [T_FLAG, 0];
handleTable19._createdReps = /* @__PURE__ */ new Set();
var captureTable4 = /* @__PURE__ */ new Map();
var captureCnt4 = 0;
HANDLE_TABLES[19] = handleTable19;
var _trampoline27 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingRequest2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-request.path-with-query"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "pathWithQuery",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.pathWithQuery(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
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
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  if (variant4 === null || variant4 === void 0) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
    var ptr3 = encodeRes.ptr;
    var len3 = encodeRes.len;
    dataView(memory0).setUint32(arg1 + 8, len3, true);
    dataView(memory0).setUint32(arg1 + 4, ptr3, true);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-request.path-with-query"][Instruction::Return]', {
    funcName: "[method]incoming-request.path-with-query",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline27");
_trampoline27.fnName = "wasi:http/types@0.2.12#pathWithQuery";
var _trampoline28 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingRequest2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-request.method"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "method",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.method(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
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
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  switch (variant4.tag) {
    case "get": {
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case "head": {
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      break;
    }
    case "post": {
      dataView(memory0).setInt8(arg1 + 0, 2, true);
      break;
    }
    case "put": {
      dataView(memory0).setInt8(arg1 + 0, 3, true);
      break;
    }
    case "delete": {
      dataView(memory0).setInt8(arg1 + 0, 4, true);
      break;
    }
    case "connect": {
      dataView(memory0).setInt8(arg1 + 0, 5, true);
      break;
    }
    case "options": {
      dataView(memory0).setInt8(arg1 + 0, 6, true);
      break;
    }
    case "trace": {
      dataView(memory0).setInt8(arg1 + 0, 7, true);
      break;
    }
    case "patch": {
      dataView(memory0).setInt8(arg1 + 0, 8, true);
      break;
    }
    case "other": {
      const e = variant4.val;
      dataView(memory0).setInt8(arg1 + 0, 9, true);
      var encodeRes = _utf8AllocateAndEncode(e, realloc0, memory0);
      var ptr3 = encodeRes.ptr;
      var len3 = encodeRes.len;
      dataView(memory0).setUint32(arg1 + 8, len3, true);
      dataView(memory0).setUint32(arg1 + 4, ptr3, true);
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`Method\``);
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-request.method"][Instruction::Return]', {
    funcName: "[method]incoming-request.method",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline28");
_trampoline28.fnName = "wasi:http/types@0.2.12#method";
var _trampoline29 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable19[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable4.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(IncomingRequest2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-request.consume"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "consume",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.consume(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof IncomingBody2)) {
        throw new TypeError('Resource error: Not a valid "IncomingBody" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep3 = e[symbolRscRep] || ++captureCnt5;
        captureTable5.set(rep3, e);
        handle4 = rscTableCreateOwn(handleTable16, rep3);
      }
      dataView(memory0).setInt32(arg1 + 4, handle4, true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]incoming-request.consume"][Instruction::Return]', {
    funcName: "[method]incoming-request.consume",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline29");
_trampoline29.fnName = "wasi:http/types@0.2.12#consume";
var _trampoline30 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable20[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable7.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutgoingResponse2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-response.body"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "body",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.body(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case "ok": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutgoingBody2)) {
        throw new TypeError('Resource error: Not a valid "OutgoingBody" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep3 = e[symbolRscRep] || ++captureCnt9;
        captureTable9.set(rep3, e);
        handle4 = rscTableCreateOwn(handleTable17, rep3);
      }
      dataView(memory0).setInt32(arg1 + 4, handle4, true);
      break;
    }
    case "err": {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant5, valueType: typeof variant5 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]outgoing-response.body"][Instruction::Return]', {
    funcName: "[method]outgoing-response.body",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline30");
_trampoline30.fnName = "wasi:http/types@0.2.12#body";
var handleTable21 = [T_FLAG, 0];
handleTable21._createdReps = /* @__PURE__ */ new Set();
var captureTable6 = /* @__PURE__ */ new Map();
var captureCnt6 = 0;
HANDLE_TABLES[21] = handleTable21;
var _trampoline31 = /* @__PURE__ */ __name(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
  var handle1 = arg0;
  var rep2 = handleTable21[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable6.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(ResponseOutparam2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  } else {
    captureTable6.delete(rep2);
  }
  rscTableRemove(handleTable21, handle1);
  let variant38;
  switch (arg1) {
    case 0: {
      var handle4 = arg2;
      var rep5 = handleTable20[(handle4 << 1) + 1] & ~T_FLAG;
      var rsc3 = captureTable7.get(rep5);
      if (!rsc3) {
        rsc3 = Object.create(OutgoingResponse2.prototype);
        Object.defineProperty(rsc3, symbolRscHandle, { writable: true, value: handle4 });
        Object.defineProperty(rsc3, symbolRscRep, { writable: true, value: rep5 });
      } else {
        captureTable7.delete(rep5);
      }
      rscTableRemove(handleTable20, handle4);
      variant38 = {
        tag: "ok",
        val: rsc3
      };
      break;
    }
    case 1: {
      let variant37;
      switch (arg2) {
        case 0: {
          variant37 = {
            tag: "DNS-timeout"
          };
          break;
        }
        case 1: {
          let variant7;
          switch (arg3) {
            case 0: {
              variant7 = void 0;
              break;
            }
            case 1: {
              var ptr6 = Number(arg4);
              var len6 = arg5;
              var result6 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr6, len6));
              variant7 = result6;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          let variant8;
          switch (arg6) {
            case 0: {
              variant8 = void 0;
              break;
            }
            case 1: {
              variant8 = clampGuest(arg7, 0, 65535);
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "DNS-error",
            val: {
              rcode: variant7,
              infoCode: variant8
            }
          };
          break;
        }
        case 2: {
          variant37 = {
            tag: "destination-not-found"
          };
          break;
        }
        case 3: {
          variant37 = {
            tag: "destination-unavailable"
          };
          break;
        }
        case 4: {
          variant37 = {
            tag: "destination-IP-prohibited"
          };
          break;
        }
        case 5: {
          variant37 = {
            tag: "destination-IP-unroutable"
          };
          break;
        }
        case 6: {
          variant37 = {
            tag: "connection-refused"
          };
          break;
        }
        case 7: {
          variant37 = {
            tag: "connection-terminated"
          };
          break;
        }
        case 8: {
          variant37 = {
            tag: "connection-timeout"
          };
          break;
        }
        case 9: {
          variant37 = {
            tag: "connection-read-timeout"
          };
          break;
        }
        case 10: {
          variant37 = {
            tag: "connection-write-timeout"
          };
          break;
        }
        case 11: {
          variant37 = {
            tag: "connection-limit-reached"
          };
          break;
        }
        case 12: {
          variant37 = {
            tag: "TLS-protocol-error"
          };
          break;
        }
        case 13: {
          variant37 = {
            tag: "TLS-certificate-error"
          };
          break;
        }
        case 14: {
          let variant9;
          switch (arg3) {
            case 0: {
              variant9 = void 0;
              break;
            }
            case 1: {
              variant9 = clampGuest(Number(arg4), 0, 255);
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          let variant11;
          switch (arg5) {
            case 0: {
              variant11 = void 0;
              break;
            }
            case 1: {
              var ptr10 = arg6;
              var len10 = arg7;
              var result10 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr10, len10));
              variant11 = result10;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "TLS-alert-received",
            val: {
              alertId: variant9,
              alertMessage: variant11
            }
          };
          break;
        }
        case 15: {
          variant37 = {
            tag: "HTTP-request-denied"
          };
          break;
        }
        case 16: {
          variant37 = {
            tag: "HTTP-request-length-required"
          };
          break;
        }
        case 17: {
          let variant12;
          switch (arg3) {
            case 0: {
              variant12 = void 0;
              break;
            }
            case 1: {
              variant12 = BigInt.asUintN(64, BigInt(arg4));
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-request-body-size",
            val: variant12
          };
          break;
        }
        case 18: {
          variant37 = {
            tag: "HTTP-request-method-invalid"
          };
          break;
        }
        case 19: {
          variant37 = {
            tag: "HTTP-request-URI-invalid"
          };
          break;
        }
        case 20: {
          variant37 = {
            tag: "HTTP-request-URI-too-long"
          };
          break;
        }
        case 21: {
          let variant13;
          switch (arg3) {
            case 0: {
              variant13 = void 0;
              break;
            }
            case 1: {
              variant13 = Number(arg4) >>> 0;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-request-header-section-size",
            val: variant13
          };
          break;
        }
        case 22: {
          let variant17;
          switch (arg3) {
            case 0: {
              variant17 = void 0;
              break;
            }
            case 1: {
              let variant15;
              switch (Number(arg4)) {
                case 0: {
                  variant15 = void 0;
                  break;
                }
                case 1: {
                  var ptr14 = arg5;
                  var len14 = arg6;
                  var result14 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr14, len14));
                  variant15 = result14;
                  break;
                }
                default: {
                  throw new TypeError("invalid variant discriminant for option");
                }
              }
              let variant16;
              switch (arg7) {
                case 0: {
                  variant16 = void 0;
                  break;
                }
                case 1: {
                  variant16 = arg8 >>> 0;
                  break;
                }
                default: {
                  throw new TypeError("invalid variant discriminant for option");
                }
              }
              variant17 = {
                fieldName: variant15,
                fieldSize: variant16
              };
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-request-header-size",
            val: variant17
          };
          break;
        }
        case 23: {
          let variant18;
          switch (arg3) {
            case 0: {
              variant18 = void 0;
              break;
            }
            case 1: {
              variant18 = Number(arg4) >>> 0;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-request-trailer-section-size",
            val: variant18
          };
          break;
        }
        case 24: {
          let variant20;
          switch (arg3) {
            case 0: {
              variant20 = void 0;
              break;
            }
            case 1: {
              var ptr19 = Number(arg4);
              var len19 = arg5;
              var result19 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr19, len19));
              variant20 = result19;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          let variant21;
          switch (arg6) {
            case 0: {
              variant21 = void 0;
              break;
            }
            case 1: {
              variant21 = arg7 >>> 0;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-request-trailer-size",
            val: {
              fieldName: variant20,
              fieldSize: variant21
            }
          };
          break;
        }
        case 25: {
          variant37 = {
            tag: "HTTP-response-incomplete"
          };
          break;
        }
        case 26: {
          let variant22;
          switch (arg3) {
            case 0: {
              variant22 = void 0;
              break;
            }
            case 1: {
              variant22 = Number(arg4) >>> 0;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-response-header-section-size",
            val: variant22
          };
          break;
        }
        case 27: {
          let variant24;
          switch (arg3) {
            case 0: {
              variant24 = void 0;
              break;
            }
            case 1: {
              var ptr23 = Number(arg4);
              var len23 = arg5;
              var result23 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr23, len23));
              variant24 = result23;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          let variant25;
          switch (arg6) {
            case 0: {
              variant25 = void 0;
              break;
            }
            case 1: {
              variant25 = arg7 >>> 0;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-response-header-size",
            val: {
              fieldName: variant24,
              fieldSize: variant25
            }
          };
          break;
        }
        case 28: {
          let variant26;
          switch (arg3) {
            case 0: {
              variant26 = void 0;
              break;
            }
            case 1: {
              variant26 = BigInt.asUintN(64, BigInt(arg4));
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-response-body-size",
            val: variant26
          };
          break;
        }
        case 29: {
          let variant27;
          switch (arg3) {
            case 0: {
              variant27 = void 0;
              break;
            }
            case 1: {
              variant27 = Number(arg4) >>> 0;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-response-trailer-section-size",
            val: variant27
          };
          break;
        }
        case 30: {
          let variant29;
          switch (arg3) {
            case 0: {
              variant29 = void 0;
              break;
            }
            case 1: {
              var ptr28 = Number(arg4);
              var len28 = arg5;
              var result28 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr28, len28));
              variant29 = result28;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          let variant30;
          switch (arg6) {
            case 0: {
              variant30 = void 0;
              break;
            }
            case 1: {
              variant30 = arg7 >>> 0;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-response-trailer-size",
            val: {
              fieldName: variant29,
              fieldSize: variant30
            }
          };
          break;
        }
        case 31: {
          let variant32;
          switch (arg3) {
            case 0: {
              variant32 = void 0;
              break;
            }
            case 1: {
              var ptr31 = Number(arg4);
              var len31 = arg5;
              var result31 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr31, len31));
              variant32 = result31;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-response-transfer-coding",
            val: variant32
          };
          break;
        }
        case 32: {
          let variant34;
          switch (arg3) {
            case 0: {
              variant34 = void 0;
              break;
            }
            case 1: {
              var ptr33 = Number(arg4);
              var len33 = arg5;
              var result33 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr33, len33));
              variant34 = result33;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "HTTP-response-content-coding",
            val: variant34
          };
          break;
        }
        case 33: {
          variant37 = {
            tag: "HTTP-response-timeout"
          };
          break;
        }
        case 34: {
          variant37 = {
            tag: "HTTP-upgrade-failed"
          };
          break;
        }
        case 35: {
          variant37 = {
            tag: "HTTP-protocol-error"
          };
          break;
        }
        case 36: {
          variant37 = {
            tag: "loop-detected"
          };
          break;
        }
        case 37: {
          variant37 = {
            tag: "configuration-error"
          };
          break;
        }
        case 38: {
          let variant36;
          switch (arg3) {
            case 0: {
              variant36 = void 0;
              break;
            }
            case 1: {
              var ptr35 = Number(arg4);
              var len35 = arg5;
              var result35 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr35, len35));
              variant36 = result35;
              break;
            }
            default: {
              throw new TypeError("invalid variant discriminant for option");
            }
          }
          variant37 = {
            tag: "internal-error",
            val: variant36
          };
          break;
        }
        default: {
          throw new TypeError("invalid variant discriminant for ErrorCode");
        }
      }
      variant38 = {
        tag: "err",
        val: variant37
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[static]response-outparam.set"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "ResponseOutparam.set",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => ResponseOutparam2.set(rsc0, variant38), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[static]response-outparam.set"][Instruction::Return]', {
    funcName: "[static]response-outparam.set",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline31");
_trampoline31.fnName = "wasi:http/types@0.2.12#ResponseOutparam.set";
var _trampoline32 = /* @__PURE__ */ __name(function(arg0, arg1, arg2, arg3, arg4, arg5) {
  var handle1 = arg0;
  var rep2 = handleTable22[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Fields2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr3, len3));
  var len5 = arg4;
  var base5 = arg3;
  if (base5 % 4 !== 0) throw new TypeError(`list pointer [${base5}] is not aligned to 4`);
  var result5 = [];
  for (let i = 0; i < len5; i++) {
    const base = base5 + i * 8;
    var ptr4 = dataView(memory0).getUint32(base + 0, true);
    var len4 = dataView(memory0).getUint32(base + 4, true);
    if (ptr4 % 1 !== 0) throw new TypeError(`list pointer [${ptr4}] is not aligned to 1`);
    var result4 = new Uint8Array(memory0.buffer.slice(ptr4, ptr4 + len4 * 1));
    result5.push(result4);
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]fields.set"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "set",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
    const hostRet6 = _withGlobalCurrentTaskMeta({
      componentIdx: task.componentIdx(),
      taskID: task.id(),
      fn: /* @__PURE__ */ __name(() => rsc0.set(result3, result5), "fn")
    });
    ret = hostRet6 !== null && typeof hostRet6 === "object" && (hostRet6.tag === "ok" || hostRet6.tag === "err") ? hostRet6 : { tag: "ok", val: hostRet6 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case "ok": {
      const e = variant8.val;
      dataView(memory0).setInt8(arg5 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant8.val;
      dataView(memory0).setInt8(arg5 + 0, 1, true);
      var variant7 = e;
      switch (variant7.tag) {
        case "invalid-syntax": {
          dataView(memory0).setInt8(arg5 + 1, 0, true);
          break;
        }
        case "forbidden": {
          dataView(memory0).setInt8(arg5 + 1, 1, true);
          break;
        }
        case "immutable": {
          dataView(memory0).setInt8(arg5 + 1, 2, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant7.tag)}\` (received \`${variant7}\`) specified for \`HeaderError\``);
        }
      }
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant8, valueType: typeof variant8 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:http/types@0.2.12", function="[method]fields.set"][Instruction::Return]', {
    funcName: "[method]fields.set",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline32");
_trampoline32.fnName = "wasi:http/types@0.2.12#set";
var exports4;
var realloc1;
var realloc1Async;
var _trampoline38 = /* @__PURE__ */ __name(function(arg0) {
  _debugLog('[iface="wasi:cli/environment@0.2.3", function="get-environment"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getEnvironment",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => getEnvironment(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
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
    const base = result3 + i * 16;
    var [tuple0_0, tuple0_1] = e;
    var encodeRes = _utf8AllocateAndEncode(tuple0_0, realloc1, memory0);
    var ptr1 = encodeRes.ptr;
    var len1 = encodeRes.len;
    dataView(memory0).setUint32(base + 4, len1, true);
    dataView(memory0).setUint32(base + 0, ptr1, true);
    var encodeRes = _utf8AllocateAndEncode(tuple0_1, realloc1, memory0);
    var ptr2 = encodeRes.ptr;
    var len2 = encodeRes.len;
    dataView(memory0).setUint32(base + 12, len2, true);
    dataView(memory0).setUint32(base + 8, ptr2, true);
  }
  dataView(memory0).setUint32(arg0 + 4, len3, true);
  dataView(memory0).setUint32(arg0 + 0, result3, true);
  _debugLog('[iface="wasi:cli/environment@0.2.3", function="get-environment"][Instruction::Return]', {
    funcName: "get-environment",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline38");
_trampoline38.fnName = "wasi:cli/environment@0.2.3#getEnvironment";
var handleTable25 = [T_FLAG, 0];
handleTable25._createdReps = /* @__PURE__ */ new Set();
var captureTable12 = /* @__PURE__ */ new Map();
var captureCnt12 = 0;
HANDLE_TABLES[25] = handleTable25;
var _trampoline39 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.get-flags"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getFlags",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.getFlags(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      let flags4 = 0;
      if (typeof e === "object" && e !== null) {
        flags4 = Boolean(e.read) << 0 | Boolean(e.write) << 1 | Boolean(e.fileIntegritySync) << 2 | Boolean(e.dataIntegritySync) << 3 | Boolean(e.requestedWriteSync) << 4 | Boolean(e.mutateDirectory) << 5;
      } else if (e !== null && e !== void 0) {
        throw new TypeError("only an object, undefined or null can be converted to flags");
      }
      dataView(memory0).setInt8(arg1 + 1, flags4, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case "access": {
          enum5 = 0;
          break;
        }
        case "would-block": {
          enum5 = 1;
          break;
        }
        case "already": {
          enum5 = 2;
          break;
        }
        case "bad-descriptor": {
          enum5 = 3;
          break;
        }
        case "busy": {
          enum5 = 4;
          break;
        }
        case "deadlock": {
          enum5 = 5;
          break;
        }
        case "quota": {
          enum5 = 6;
          break;
        }
        case "exist": {
          enum5 = 7;
          break;
        }
        case "file-too-large": {
          enum5 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum5 = 9;
          break;
        }
        case "in-progress": {
          enum5 = 10;
          break;
        }
        case "interrupted": {
          enum5 = 11;
          break;
        }
        case "invalid": {
          enum5 = 12;
          break;
        }
        case "io": {
          enum5 = 13;
          break;
        }
        case "is-directory": {
          enum5 = 14;
          break;
        }
        case "loop": {
          enum5 = 15;
          break;
        }
        case "too-many-links": {
          enum5 = 16;
          break;
        }
        case "message-size": {
          enum5 = 17;
          break;
        }
        case "name-too-long": {
          enum5 = 18;
          break;
        }
        case "no-device": {
          enum5 = 19;
          break;
        }
        case "no-entry": {
          enum5 = 20;
          break;
        }
        case "no-lock": {
          enum5 = 21;
          break;
        }
        case "insufficient-memory": {
          enum5 = 22;
          break;
        }
        case "insufficient-space": {
          enum5 = 23;
          break;
        }
        case "not-directory": {
          enum5 = 24;
          break;
        }
        case "not-empty": {
          enum5 = 25;
          break;
        }
        case "not-recoverable": {
          enum5 = 26;
          break;
        }
        case "unsupported": {
          enum5 = 27;
          break;
        }
        case "no-tty": {
          enum5 = 28;
          break;
        }
        case "no-such-device": {
          enum5 = 29;
          break;
        }
        case "overflow": {
          enum5 = 30;
          break;
        }
        case "not-permitted": {
          enum5 = 31;
          break;
        }
        case "pipe": {
          enum5 = 32;
          break;
        }
        case "read-only": {
          enum5 = 33;
          break;
        }
        case "invalid-seek": {
          enum5 = 34;
          break;
        }
        case "text-file-busy": {
          enum5 = 35;
          break;
        }
        case "cross-device": {
          enum5 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum5, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.get-flags"][Instruction::Return]', {
    funcName: "[method]descriptor.get-flags",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline39");
_trampoline39.fnName = "wasi:filesystem/types@0.2.3#getFlags";
var _trampoline40 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable23[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="filesystem-error-code"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "filesystemErrorCode",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => filesystemErrorCode(rsc0), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
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
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  if (variant4 === null || variant4 === void 0) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val3 = e;
    let enum3;
    switch (val3) {
      case "access": {
        enum3 = 0;
        break;
      }
      case "would-block": {
        enum3 = 1;
        break;
      }
      case "already": {
        enum3 = 2;
        break;
      }
      case "bad-descriptor": {
        enum3 = 3;
        break;
      }
      case "busy": {
        enum3 = 4;
        break;
      }
      case "deadlock": {
        enum3 = 5;
        break;
      }
      case "quota": {
        enum3 = 6;
        break;
      }
      case "exist": {
        enum3 = 7;
        break;
      }
      case "file-too-large": {
        enum3 = 8;
        break;
      }
      case "illegal-byte-sequence": {
        enum3 = 9;
        break;
      }
      case "in-progress": {
        enum3 = 10;
        break;
      }
      case "interrupted": {
        enum3 = 11;
        break;
      }
      case "invalid": {
        enum3 = 12;
        break;
      }
      case "io": {
        enum3 = 13;
        break;
      }
      case "is-directory": {
        enum3 = 14;
        break;
      }
      case "loop": {
        enum3 = 15;
        break;
      }
      case "too-many-links": {
        enum3 = 16;
        break;
      }
      case "message-size": {
        enum3 = 17;
        break;
      }
      case "name-too-long": {
        enum3 = 18;
        break;
      }
      case "no-device": {
        enum3 = 19;
        break;
      }
      case "no-entry": {
        enum3 = 20;
        break;
      }
      case "no-lock": {
        enum3 = 21;
        break;
      }
      case "insufficient-memory": {
        enum3 = 22;
        break;
      }
      case "insufficient-space": {
        enum3 = 23;
        break;
      }
      case "not-directory": {
        enum3 = 24;
        break;
      }
      case "not-empty": {
        enum3 = 25;
        break;
      }
      case "not-recoverable": {
        enum3 = 26;
        break;
      }
      case "unsupported": {
        enum3 = 27;
        break;
      }
      case "no-tty": {
        enum3 = 28;
        break;
      }
      case "no-such-device": {
        enum3 = 29;
        break;
      }
      case "overflow": {
        enum3 = 30;
        break;
      }
      case "not-permitted": {
        enum3 = 31;
        break;
      }
      case "pipe": {
        enum3 = 32;
        break;
      }
      case "read-only": {
        enum3 = 33;
        break;
      }
      case "invalid-seek": {
        enum3 = 34;
        break;
      }
      case "text-file-busy": {
        enum3 = 35;
        break;
      }
      case "cross-device": {
        enum3 = 36;
        break;
      }
      default: {
        if (e instanceof Error) {
          console.error(e);
        }
        throw new TypeError(`"${val3}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum3, true);
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="filesystem-error-code"][Instruction::Return]', {
    funcName: "filesystem-error-code",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline40");
_trampoline40.fnName = "wasi:filesystem/types@0.2.3#filesystemErrorCode";
var _trampoline41 = /* @__PURE__ */ __name(function(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1)
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.stat-at"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "statAt",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.statAt(flags3, result4), "fn")
    });
    ret = hostRet5 !== null && typeof hostRet5 === "object" && (hostRet5.tag === "ok" || hostRet5.tag === "err") ? hostRet5 : { tag: "ok", val: hostRet5 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant15 = ret;
  switch (variant15.tag) {
    case "ok": {
      const e = variant15.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      var { type: v6_0, linkCount: v6_1, size: v6_2, dataAccessTimestamp: v6_3, dataModificationTimestamp: v6_4, statusChangeTimestamp: v6_5 } = e;
      var val7 = v6_0;
      let enum7;
      switch (val7) {
        case "unknown": {
          enum7 = 0;
          break;
        }
        case "block-device": {
          enum7 = 1;
          break;
        }
        case "character-device": {
          enum7 = 2;
          break;
        }
        case "directory": {
          enum7 = 3;
          break;
        }
        case "fifo": {
          enum7 = 4;
          break;
        }
        case "symbolic-link": {
          enum7 = 5;
          break;
        }
        case "regular-file": {
          enum7 = 6;
          break;
        }
        case "socket": {
          enum7 = 7;
          break;
        }
        default: {
          if (v6_0 instanceof Error) {
            console.error(v6_0);
          }
          throw new TypeError(`"${val7}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum7, true);
      dataView(memory0).setBigInt64(arg4 + 16, toUint64(v6_1), true);
      dataView(memory0).setBigInt64(arg4 + 24, toUint64(v6_2), true);
      var variant9 = v6_3;
      if (variant9 === null || variant9 === void 0) {
        dataView(memory0).setInt8(arg4 + 32, 0, true);
      } else {
        const e2 = variant9;
        dataView(memory0).setInt8(arg4 + 32, 1, true);
        var { seconds: v8_0, nanoseconds: v8_1 } = e2;
        dataView(memory0).setBigInt64(arg4 + 40, toUint64(v8_0), true);
        dataView(memory0).setInt32(arg4 + 48, toUint32(v8_1), true);
      }
      var variant11 = v6_4;
      if (variant11 === null || variant11 === void 0) {
        dataView(memory0).setInt8(arg4 + 56, 0, true);
      } else {
        const e2 = variant11;
        dataView(memory0).setInt8(arg4 + 56, 1, true);
        var { seconds: v10_0, nanoseconds: v10_1 } = e2;
        dataView(memory0).setBigInt64(arg4 + 64, toUint64(v10_0), true);
        dataView(memory0).setInt32(arg4 + 72, toUint32(v10_1), true);
      }
      var variant13 = v6_5;
      if (variant13 === null || variant13 === void 0) {
        dataView(memory0).setInt8(arg4 + 80, 0, true);
      } else {
        const e2 = variant13;
        dataView(memory0).setInt8(arg4 + 80, 1, true);
        var { seconds: v12_0, nanoseconds: v12_1 } = e2;
        dataView(memory0).setBigInt64(arg4 + 88, toUint64(v12_0), true);
        dataView(memory0).setInt32(arg4 + 96, toUint32(v12_1), true);
      }
      break;
    }
    case "err": {
      const e = variant15.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val14 = e;
      let enum14;
      switch (val14) {
        case "access": {
          enum14 = 0;
          break;
        }
        case "would-block": {
          enum14 = 1;
          break;
        }
        case "already": {
          enum14 = 2;
          break;
        }
        case "bad-descriptor": {
          enum14 = 3;
          break;
        }
        case "busy": {
          enum14 = 4;
          break;
        }
        case "deadlock": {
          enum14 = 5;
          break;
        }
        case "quota": {
          enum14 = 6;
          break;
        }
        case "exist": {
          enum14 = 7;
          break;
        }
        case "file-too-large": {
          enum14 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum14 = 9;
          break;
        }
        case "in-progress": {
          enum14 = 10;
          break;
        }
        case "interrupted": {
          enum14 = 11;
          break;
        }
        case "invalid": {
          enum14 = 12;
          break;
        }
        case "io": {
          enum14 = 13;
          break;
        }
        case "is-directory": {
          enum14 = 14;
          break;
        }
        case "loop": {
          enum14 = 15;
          break;
        }
        case "too-many-links": {
          enum14 = 16;
          break;
        }
        case "message-size": {
          enum14 = 17;
          break;
        }
        case "name-too-long": {
          enum14 = 18;
          break;
        }
        case "no-device": {
          enum14 = 19;
          break;
        }
        case "no-entry": {
          enum14 = 20;
          break;
        }
        case "no-lock": {
          enum14 = 21;
          break;
        }
        case "insufficient-memory": {
          enum14 = 22;
          break;
        }
        case "insufficient-space": {
          enum14 = 23;
          break;
        }
        case "not-directory": {
          enum14 = 24;
          break;
        }
        case "not-empty": {
          enum14 = 25;
          break;
        }
        case "not-recoverable": {
          enum14 = 26;
          break;
        }
        case "unsupported": {
          enum14 = 27;
          break;
        }
        case "no-tty": {
          enum14 = 28;
          break;
        }
        case "no-such-device": {
          enum14 = 29;
          break;
        }
        case "overflow": {
          enum14 = 30;
          break;
        }
        case "not-permitted": {
          enum14 = 31;
          break;
        }
        case "pipe": {
          enum14 = 32;
          break;
        }
        case "read-only": {
          enum14 = 33;
          break;
        }
        case "invalid-seek": {
          enum14 = 34;
          break;
        }
        case "text-file-busy": {
          enum14 = 35;
          break;
        }
        case "cross-device": {
          enum14 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val14}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum14, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant15, valueType: typeof variant15 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.stat-at"][Instruction::Return]', {
    funcName: "[method]descriptor.stat-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline41");
_trampoline41.fnName = "wasi:filesystem/types@0.2.3#statAt";
var _trampoline42 = /* @__PURE__ */ __name(function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1)
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  if ((arg4 & 4294967280) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags5 = {
    create: Boolean(arg4 & 1),
    directory: Boolean(arg4 & 2),
    exclusive: Boolean(arg4 & 4),
    truncate: Boolean(arg4 & 8)
  };
  if ((arg5 & 4294967232) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags6 = {
    read: Boolean(arg5 & 1),
    write: Boolean(arg5 & 2),
    fileIntegritySync: Boolean(arg5 & 4),
    dataIntegritySync: Boolean(arg5 & 8),
    requestedWriteSync: Boolean(arg5 & 16),
    mutateDirectory: Boolean(arg5 & 32)
  };
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.open-at"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "openAt",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.openAt(flags3, result4, flags5, flags6), "fn")
    });
    ret = hostRet7 !== null && typeof hostRet7 === "object" && (hostRet7.tag === "ok" || hostRet7.tag === "err") ? hostRet7 : { tag: "ok", val: hostRet7 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant10 = ret;
  switch (variant10.tag) {
    case "ok": {
      const e = variant10.val;
      dataView(memory0).setInt8(arg6 + 0, 0, true);
      if (!(e instanceof Descriptor2)) {
        throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
      }
      var handle8 = e[symbolRscHandle];
      if (!handle8) {
        const rep3 = e[symbolRscRep] || ++captureCnt12;
        captureTable12.set(rep3, e);
        handle8 = rscTableCreateOwn(handleTable25, rep3);
      }
      dataView(memory0).setInt32(arg6 + 4, handle8, true);
      break;
    }
    case "err": {
      const e = variant10.val;
      dataView(memory0).setInt8(arg6 + 0, 1, true);
      var val9 = e;
      let enum9;
      switch (val9) {
        case "access": {
          enum9 = 0;
          break;
        }
        case "would-block": {
          enum9 = 1;
          break;
        }
        case "already": {
          enum9 = 2;
          break;
        }
        case "bad-descriptor": {
          enum9 = 3;
          break;
        }
        case "busy": {
          enum9 = 4;
          break;
        }
        case "deadlock": {
          enum9 = 5;
          break;
        }
        case "quota": {
          enum9 = 6;
          break;
        }
        case "exist": {
          enum9 = 7;
          break;
        }
        case "file-too-large": {
          enum9 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum9 = 9;
          break;
        }
        case "in-progress": {
          enum9 = 10;
          break;
        }
        case "interrupted": {
          enum9 = 11;
          break;
        }
        case "invalid": {
          enum9 = 12;
          break;
        }
        case "io": {
          enum9 = 13;
          break;
        }
        case "is-directory": {
          enum9 = 14;
          break;
        }
        case "loop": {
          enum9 = 15;
          break;
        }
        case "too-many-links": {
          enum9 = 16;
          break;
        }
        case "message-size": {
          enum9 = 17;
          break;
        }
        case "name-too-long": {
          enum9 = 18;
          break;
        }
        case "no-device": {
          enum9 = 19;
          break;
        }
        case "no-entry": {
          enum9 = 20;
          break;
        }
        case "no-lock": {
          enum9 = 21;
          break;
        }
        case "insufficient-memory": {
          enum9 = 22;
          break;
        }
        case "insufficient-space": {
          enum9 = 23;
          break;
        }
        case "not-directory": {
          enum9 = 24;
          break;
        }
        case "not-empty": {
          enum9 = 25;
          break;
        }
        case "not-recoverable": {
          enum9 = 26;
          break;
        }
        case "unsupported": {
          enum9 = 27;
          break;
        }
        case "no-tty": {
          enum9 = 28;
          break;
        }
        case "no-such-device": {
          enum9 = 29;
          break;
        }
        case "overflow": {
          enum9 = 30;
          break;
        }
        case "not-permitted": {
          enum9 = 31;
          break;
        }
        case "pipe": {
          enum9 = 32;
          break;
        }
        case "read-only": {
          enum9 = 33;
          break;
        }
        case "invalid-seek": {
          enum9 = 34;
          break;
        }
        case "text-file-busy": {
          enum9 = 35;
          break;
        }
        case "cross-device": {
          enum9 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val9}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg6 + 4, enum9, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant10, valueType: typeof variant10 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.open-at"][Instruction::Return]', {
    funcName: "[method]descriptor.open-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline42");
_trampoline42.fnName = "wasi:filesystem/types@0.2.3#openAt";
var _trampoline43 = /* @__PURE__ */ __name(function(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.read-via-stream"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "readViaStream",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.readViaStream(BigInt.asUintN(64, BigInt(arg1))), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof InputStream2)) {
        throw new TypeError('Resource error: Not a valid "InputStream" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep3 = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep3, e);
        handle4 = rscTableCreateOwn(handleTable14, rep3);
      }
      dataView(memory0).setInt32(arg2 + 4, handle4, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case "access": {
          enum5 = 0;
          break;
        }
        case "would-block": {
          enum5 = 1;
          break;
        }
        case "already": {
          enum5 = 2;
          break;
        }
        case "bad-descriptor": {
          enum5 = 3;
          break;
        }
        case "busy": {
          enum5 = 4;
          break;
        }
        case "deadlock": {
          enum5 = 5;
          break;
        }
        case "quota": {
          enum5 = 6;
          break;
        }
        case "exist": {
          enum5 = 7;
          break;
        }
        case "file-too-large": {
          enum5 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum5 = 9;
          break;
        }
        case "in-progress": {
          enum5 = 10;
          break;
        }
        case "interrupted": {
          enum5 = 11;
          break;
        }
        case "invalid": {
          enum5 = 12;
          break;
        }
        case "io": {
          enum5 = 13;
          break;
        }
        case "is-directory": {
          enum5 = 14;
          break;
        }
        case "loop": {
          enum5 = 15;
          break;
        }
        case "too-many-links": {
          enum5 = 16;
          break;
        }
        case "message-size": {
          enum5 = 17;
          break;
        }
        case "name-too-long": {
          enum5 = 18;
          break;
        }
        case "no-device": {
          enum5 = 19;
          break;
        }
        case "no-entry": {
          enum5 = 20;
          break;
        }
        case "no-lock": {
          enum5 = 21;
          break;
        }
        case "insufficient-memory": {
          enum5 = 22;
          break;
        }
        case "insufficient-space": {
          enum5 = 23;
          break;
        }
        case "not-directory": {
          enum5 = 24;
          break;
        }
        case "not-empty": {
          enum5 = 25;
          break;
        }
        case "not-recoverable": {
          enum5 = 26;
          break;
        }
        case "unsupported": {
          enum5 = 27;
          break;
        }
        case "no-tty": {
          enum5 = 28;
          break;
        }
        case "no-such-device": {
          enum5 = 29;
          break;
        }
        case "overflow": {
          enum5 = 30;
          break;
        }
        case "not-permitted": {
          enum5 = 31;
          break;
        }
        case "pipe": {
          enum5 = 32;
          break;
        }
        case "read-only": {
          enum5 = 33;
          break;
        }
        case "invalid-seek": {
          enum5 = 34;
          break;
        }
        case "text-file-busy": {
          enum5 = 35;
          break;
        }
        case "cross-device": {
          enum5 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum5, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.read-via-stream"][Instruction::Return]', {
    funcName: "[method]descriptor.read-via-stream",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline43");
_trampoline43.fnName = "wasi:filesystem/types@0.2.3#readViaStream";
var _trampoline44 = /* @__PURE__ */ __name(function(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.write-via-stream"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "writeViaStream",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.writeViaStream(BigInt.asUintN(64, BigInt(arg1))), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream2)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep3 = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep3, e);
        handle4 = rscTableCreateOwn(handleTable15, rep3);
      }
      dataView(memory0).setInt32(arg2 + 4, handle4, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case "access": {
          enum5 = 0;
          break;
        }
        case "would-block": {
          enum5 = 1;
          break;
        }
        case "already": {
          enum5 = 2;
          break;
        }
        case "bad-descriptor": {
          enum5 = 3;
          break;
        }
        case "busy": {
          enum5 = 4;
          break;
        }
        case "deadlock": {
          enum5 = 5;
          break;
        }
        case "quota": {
          enum5 = 6;
          break;
        }
        case "exist": {
          enum5 = 7;
          break;
        }
        case "file-too-large": {
          enum5 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum5 = 9;
          break;
        }
        case "in-progress": {
          enum5 = 10;
          break;
        }
        case "interrupted": {
          enum5 = 11;
          break;
        }
        case "invalid": {
          enum5 = 12;
          break;
        }
        case "io": {
          enum5 = 13;
          break;
        }
        case "is-directory": {
          enum5 = 14;
          break;
        }
        case "loop": {
          enum5 = 15;
          break;
        }
        case "too-many-links": {
          enum5 = 16;
          break;
        }
        case "message-size": {
          enum5 = 17;
          break;
        }
        case "name-too-long": {
          enum5 = 18;
          break;
        }
        case "no-device": {
          enum5 = 19;
          break;
        }
        case "no-entry": {
          enum5 = 20;
          break;
        }
        case "no-lock": {
          enum5 = 21;
          break;
        }
        case "insufficient-memory": {
          enum5 = 22;
          break;
        }
        case "insufficient-space": {
          enum5 = 23;
          break;
        }
        case "not-directory": {
          enum5 = 24;
          break;
        }
        case "not-empty": {
          enum5 = 25;
          break;
        }
        case "not-recoverable": {
          enum5 = 26;
          break;
        }
        case "unsupported": {
          enum5 = 27;
          break;
        }
        case "no-tty": {
          enum5 = 28;
          break;
        }
        case "no-such-device": {
          enum5 = 29;
          break;
        }
        case "overflow": {
          enum5 = 30;
          break;
        }
        case "not-permitted": {
          enum5 = 31;
          break;
        }
        case "pipe": {
          enum5 = 32;
          break;
        }
        case "read-only": {
          enum5 = 33;
          break;
        }
        case "invalid-seek": {
          enum5 = 34;
          break;
        }
        case "text-file-busy": {
          enum5 = 35;
          break;
        }
        case "cross-device": {
          enum5 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum5, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.write-via-stream"][Instruction::Return]', {
    funcName: "[method]descriptor.write-via-stream",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline44");
_trampoline44.fnName = "wasi:filesystem/types@0.2.3#writeViaStream";
var _trampoline45 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.append-via-stream"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "appendViaStream",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.appendViaStream(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream2)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle4 = e[symbolRscHandle];
      if (!handle4) {
        const rep3 = e[symbolRscRep] || ++captureCnt2;
        captureTable2.set(rep3, e);
        handle4 = rscTableCreateOwn(handleTable15, rep3);
      }
      dataView(memory0).setInt32(arg1 + 4, handle4, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case "access": {
          enum5 = 0;
          break;
        }
        case "would-block": {
          enum5 = 1;
          break;
        }
        case "already": {
          enum5 = 2;
          break;
        }
        case "bad-descriptor": {
          enum5 = 3;
          break;
        }
        case "busy": {
          enum5 = 4;
          break;
        }
        case "deadlock": {
          enum5 = 5;
          break;
        }
        case "quota": {
          enum5 = 6;
          break;
        }
        case "exist": {
          enum5 = 7;
          break;
        }
        case "file-too-large": {
          enum5 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum5 = 9;
          break;
        }
        case "in-progress": {
          enum5 = 10;
          break;
        }
        case "interrupted": {
          enum5 = 11;
          break;
        }
        case "invalid": {
          enum5 = 12;
          break;
        }
        case "io": {
          enum5 = 13;
          break;
        }
        case "is-directory": {
          enum5 = 14;
          break;
        }
        case "loop": {
          enum5 = 15;
          break;
        }
        case "too-many-links": {
          enum5 = 16;
          break;
        }
        case "message-size": {
          enum5 = 17;
          break;
        }
        case "name-too-long": {
          enum5 = 18;
          break;
        }
        case "no-device": {
          enum5 = 19;
          break;
        }
        case "no-entry": {
          enum5 = 20;
          break;
        }
        case "no-lock": {
          enum5 = 21;
          break;
        }
        case "insufficient-memory": {
          enum5 = 22;
          break;
        }
        case "insufficient-space": {
          enum5 = 23;
          break;
        }
        case "not-directory": {
          enum5 = 24;
          break;
        }
        case "not-empty": {
          enum5 = 25;
          break;
        }
        case "not-recoverable": {
          enum5 = 26;
          break;
        }
        case "unsupported": {
          enum5 = 27;
          break;
        }
        case "no-tty": {
          enum5 = 28;
          break;
        }
        case "no-such-device": {
          enum5 = 29;
          break;
        }
        case "overflow": {
          enum5 = 30;
          break;
        }
        case "not-permitted": {
          enum5 = 31;
          break;
        }
        case "pipe": {
          enum5 = 32;
          break;
        }
        case "read-only": {
          enum5 = 33;
          break;
        }
        case "invalid-seek": {
          enum5 = 34;
          break;
        }
        case "text-file-busy": {
          enum5 = 35;
          break;
        }
        case "cross-device": {
          enum5 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum5, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.append-via-stream"][Instruction::Return]', {
    funcName: "[method]descriptor.append-via-stream",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline45");
_trampoline45.fnName = "wasi:filesystem/types@0.2.3#appendViaStream";
var _trampoline46 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.get-type"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getType",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.getType(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case "unknown": {
          enum4 = 0;
          break;
        }
        case "block-device": {
          enum4 = 1;
          break;
        }
        case "character-device": {
          enum4 = 2;
          break;
        }
        case "directory": {
          enum4 = 3;
          break;
        }
        case "fifo": {
          enum4 = 4;
          break;
        }
        case "symbolic-link": {
          enum4 = 5;
          break;
        }
        case "regular-file": {
          enum4 = 6;
          break;
        }
        case "socket": {
          enum4 = 7;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum4, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case "access": {
          enum5 = 0;
          break;
        }
        case "would-block": {
          enum5 = 1;
          break;
        }
        case "already": {
          enum5 = 2;
          break;
        }
        case "bad-descriptor": {
          enum5 = 3;
          break;
        }
        case "busy": {
          enum5 = 4;
          break;
        }
        case "deadlock": {
          enum5 = 5;
          break;
        }
        case "quota": {
          enum5 = 6;
          break;
        }
        case "exist": {
          enum5 = 7;
          break;
        }
        case "file-too-large": {
          enum5 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum5 = 9;
          break;
        }
        case "in-progress": {
          enum5 = 10;
          break;
        }
        case "interrupted": {
          enum5 = 11;
          break;
        }
        case "invalid": {
          enum5 = 12;
          break;
        }
        case "io": {
          enum5 = 13;
          break;
        }
        case "is-directory": {
          enum5 = 14;
          break;
        }
        case "loop": {
          enum5 = 15;
          break;
        }
        case "too-many-links": {
          enum5 = 16;
          break;
        }
        case "message-size": {
          enum5 = 17;
          break;
        }
        case "name-too-long": {
          enum5 = 18;
          break;
        }
        case "no-device": {
          enum5 = 19;
          break;
        }
        case "no-entry": {
          enum5 = 20;
          break;
        }
        case "no-lock": {
          enum5 = 21;
          break;
        }
        case "insufficient-memory": {
          enum5 = 22;
          break;
        }
        case "insufficient-space": {
          enum5 = 23;
          break;
        }
        case "not-directory": {
          enum5 = 24;
          break;
        }
        case "not-empty": {
          enum5 = 25;
          break;
        }
        case "not-recoverable": {
          enum5 = 26;
          break;
        }
        case "unsupported": {
          enum5 = 27;
          break;
        }
        case "no-tty": {
          enum5 = 28;
          break;
        }
        case "no-such-device": {
          enum5 = 29;
          break;
        }
        case "overflow": {
          enum5 = 30;
          break;
        }
        case "not-permitted": {
          enum5 = 31;
          break;
        }
        case "pipe": {
          enum5 = 32;
          break;
        }
        case "read-only": {
          enum5 = 33;
          break;
        }
        case "invalid-seek": {
          enum5 = 34;
          break;
        }
        case "text-file-busy": {
          enum5 = 35;
          break;
        }
        case "cross-device": {
          enum5 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum5, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.get-type"][Instruction::Return]', {
    funcName: "[method]descriptor.get-type",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline46");
_trampoline46.fnName = "wasi:filesystem/types@0.2.3#getType";
var _trampoline47 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.stat"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "stat",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.stat(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant13 = ret;
  switch (variant13.tag) {
    case "ok": {
      const e = variant13.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var { type: v4_0, linkCount: v4_1, size: v4_2, dataAccessTimestamp: v4_3, dataModificationTimestamp: v4_4, statusChangeTimestamp: v4_5 } = e;
      var val5 = v4_0;
      let enum5;
      switch (val5) {
        case "unknown": {
          enum5 = 0;
          break;
        }
        case "block-device": {
          enum5 = 1;
          break;
        }
        case "character-device": {
          enum5 = 2;
          break;
        }
        case "directory": {
          enum5 = 3;
          break;
        }
        case "fifo": {
          enum5 = 4;
          break;
        }
        case "symbolic-link": {
          enum5 = 5;
          break;
        }
        case "regular-file": {
          enum5 = 6;
          break;
        }
        case "socket": {
          enum5 = 7;
          break;
        }
        default: {
          if (v4_0 instanceof Error) {
            console.error(v4_0);
          }
          throw new TypeError(`"${val5}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum5, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v4_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v4_2), true);
      var variant7 = v4_3;
      if (variant7 === null || variant7 === void 0) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e2 = variant7;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var { seconds: v6_0, nanoseconds: v6_1 } = e2;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v6_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v6_1), true);
      }
      var variant9 = v4_4;
      if (variant9 === null || variant9 === void 0) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e2 = variant9;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var { seconds: v8_0, nanoseconds: v8_1 } = e2;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v8_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v8_1), true);
      }
      var variant11 = v4_5;
      if (variant11 === null || variant11 === void 0) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e2 = variant11;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var { seconds: v10_0, nanoseconds: v10_1 } = e2;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v10_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v10_1), true);
      }
      break;
    }
    case "err": {
      const e = variant13.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val12 = e;
      let enum12;
      switch (val12) {
        case "access": {
          enum12 = 0;
          break;
        }
        case "would-block": {
          enum12 = 1;
          break;
        }
        case "already": {
          enum12 = 2;
          break;
        }
        case "bad-descriptor": {
          enum12 = 3;
          break;
        }
        case "busy": {
          enum12 = 4;
          break;
        }
        case "deadlock": {
          enum12 = 5;
          break;
        }
        case "quota": {
          enum12 = 6;
          break;
        }
        case "exist": {
          enum12 = 7;
          break;
        }
        case "file-too-large": {
          enum12 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum12 = 9;
          break;
        }
        case "in-progress": {
          enum12 = 10;
          break;
        }
        case "interrupted": {
          enum12 = 11;
          break;
        }
        case "invalid": {
          enum12 = 12;
          break;
        }
        case "io": {
          enum12 = 13;
          break;
        }
        case "is-directory": {
          enum12 = 14;
          break;
        }
        case "loop": {
          enum12 = 15;
          break;
        }
        case "too-many-links": {
          enum12 = 16;
          break;
        }
        case "message-size": {
          enum12 = 17;
          break;
        }
        case "name-too-long": {
          enum12 = 18;
          break;
        }
        case "no-device": {
          enum12 = 19;
          break;
        }
        case "no-entry": {
          enum12 = 20;
          break;
        }
        case "no-lock": {
          enum12 = 21;
          break;
        }
        case "insufficient-memory": {
          enum12 = 22;
          break;
        }
        case "insufficient-space": {
          enum12 = 23;
          break;
        }
        case "not-directory": {
          enum12 = 24;
          break;
        }
        case "not-empty": {
          enum12 = 25;
          break;
        }
        case "not-recoverable": {
          enum12 = 26;
          break;
        }
        case "unsupported": {
          enum12 = 27;
          break;
        }
        case "no-tty": {
          enum12 = 28;
          break;
        }
        case "no-such-device": {
          enum12 = 29;
          break;
        }
        case "overflow": {
          enum12 = 30;
          break;
        }
        case "not-permitted": {
          enum12 = 31;
          break;
        }
        case "pipe": {
          enum12 = 32;
          break;
        }
        case "read-only": {
          enum12 = 33;
          break;
        }
        case "invalid-seek": {
          enum12 = 34;
          break;
        }
        case "text-file-busy": {
          enum12 = 35;
          break;
        }
        case "cross-device": {
          enum12 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val12}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum12, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant13, valueType: typeof variant13 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.stat"][Instruction::Return]', {
    funcName: "[method]descriptor.stat",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline47");
_trampoline47.fnName = "wasi:filesystem/types@0.2.3#stat";
var _trampoline48 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.metadata-hash"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "metadataHash",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.metadataHash(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var { lower: v4_0, upper: v4_1 } = e;
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(v4_0), true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v4_1), true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val5 = e;
      let enum5;
      switch (val5) {
        case "access": {
          enum5 = 0;
          break;
        }
        case "would-block": {
          enum5 = 1;
          break;
        }
        case "already": {
          enum5 = 2;
          break;
        }
        case "bad-descriptor": {
          enum5 = 3;
          break;
        }
        case "busy": {
          enum5 = 4;
          break;
        }
        case "deadlock": {
          enum5 = 5;
          break;
        }
        case "quota": {
          enum5 = 6;
          break;
        }
        case "exist": {
          enum5 = 7;
          break;
        }
        case "file-too-large": {
          enum5 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum5 = 9;
          break;
        }
        case "in-progress": {
          enum5 = 10;
          break;
        }
        case "interrupted": {
          enum5 = 11;
          break;
        }
        case "invalid": {
          enum5 = 12;
          break;
        }
        case "io": {
          enum5 = 13;
          break;
        }
        case "is-directory": {
          enum5 = 14;
          break;
        }
        case "loop": {
          enum5 = 15;
          break;
        }
        case "too-many-links": {
          enum5 = 16;
          break;
        }
        case "message-size": {
          enum5 = 17;
          break;
        }
        case "name-too-long": {
          enum5 = 18;
          break;
        }
        case "no-device": {
          enum5 = 19;
          break;
        }
        case "no-entry": {
          enum5 = 20;
          break;
        }
        case "no-lock": {
          enum5 = 21;
          break;
        }
        case "insufficient-memory": {
          enum5 = 22;
          break;
        }
        case "insufficient-space": {
          enum5 = 23;
          break;
        }
        case "not-directory": {
          enum5 = 24;
          break;
        }
        case "not-empty": {
          enum5 = 25;
          break;
        }
        case "not-recoverable": {
          enum5 = 26;
          break;
        }
        case "unsupported": {
          enum5 = 27;
          break;
        }
        case "no-tty": {
          enum5 = 28;
          break;
        }
        case "no-such-device": {
          enum5 = 29;
          break;
        }
        case "overflow": {
          enum5 = 30;
          break;
        }
        case "not-permitted": {
          enum5 = 31;
          break;
        }
        case "pipe": {
          enum5 = 32;
          break;
        }
        case "read-only": {
          enum5 = 33;
          break;
        }
        case "invalid-seek": {
          enum5 = 34;
          break;
        }
        case "text-file-busy": {
          enum5 = 35;
          break;
        }
        case "cross-device": {
          enum5 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val5}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum5, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.metadata-hash"][Instruction::Return]', {
    funcName: "[method]descriptor.metadata-hash",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline48");
_trampoline48.fnName = "wasi:filesystem/types@0.2.3#metadataHash";
var _trampoline49 = /* @__PURE__ */ __name(function(arg0, arg1, arg2, arg3, arg4) {
  var handle1 = arg0;
  var rep2 = handleTable25[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable12.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  if ((arg1 & 4294967294) !== 0) {
    throw new TypeError("flags have extraneous bits set");
  }
  var flags3 = {
    symlinkFollow: Boolean(arg1 & 1)
  };
  var ptr4 = arg2;
  var len4 = arg3;
  var result4 = TEXT_DECODER_UTF8.decode(new Uint8Array(memory0.buffer, ptr4, len4));
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.metadata-hash-at"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "metadataHashAt",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.metadataHashAt(flags3, result4), "fn")
    });
    ret = hostRet5 !== null && typeof hostRet5 === "object" && (hostRet5.tag === "ok" || hostRet5.tag === "err") ? hostRet5 : { tag: "ok", val: hostRet5 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant8 = ret;
  switch (variant8.tag) {
    case "ok": {
      const e = variant8.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      var { lower: v6_0, upper: v6_1 } = e;
      dataView(memory0).setBigInt64(arg4 + 8, toUint64(v6_0), true);
      dataView(memory0).setBigInt64(arg4 + 16, toUint64(v6_1), true);
      break;
    }
    case "err": {
      const e = variant8.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      var val7 = e;
      let enum7;
      switch (val7) {
        case "access": {
          enum7 = 0;
          break;
        }
        case "would-block": {
          enum7 = 1;
          break;
        }
        case "already": {
          enum7 = 2;
          break;
        }
        case "bad-descriptor": {
          enum7 = 3;
          break;
        }
        case "busy": {
          enum7 = 4;
          break;
        }
        case "deadlock": {
          enum7 = 5;
          break;
        }
        case "quota": {
          enum7 = 6;
          break;
        }
        case "exist": {
          enum7 = 7;
          break;
        }
        case "file-too-large": {
          enum7 = 8;
          break;
        }
        case "illegal-byte-sequence": {
          enum7 = 9;
          break;
        }
        case "in-progress": {
          enum7 = 10;
          break;
        }
        case "interrupted": {
          enum7 = 11;
          break;
        }
        case "invalid": {
          enum7 = 12;
          break;
        }
        case "io": {
          enum7 = 13;
          break;
        }
        case "is-directory": {
          enum7 = 14;
          break;
        }
        case "loop": {
          enum7 = 15;
          break;
        }
        case "too-many-links": {
          enum7 = 16;
          break;
        }
        case "message-size": {
          enum7 = 17;
          break;
        }
        case "name-too-long": {
          enum7 = 18;
          break;
        }
        case "no-device": {
          enum7 = 19;
          break;
        }
        case "no-entry": {
          enum7 = 20;
          break;
        }
        case "no-lock": {
          enum7 = 21;
          break;
        }
        case "insufficient-memory": {
          enum7 = 22;
          break;
        }
        case "insufficient-space": {
          enum7 = 23;
          break;
        }
        case "not-directory": {
          enum7 = 24;
          break;
        }
        case "not-empty": {
          enum7 = 25;
          break;
        }
        case "not-recoverable": {
          enum7 = 26;
          break;
        }
        case "unsupported": {
          enum7 = 27;
          break;
        }
        case "no-tty": {
          enum7 = 28;
          break;
        }
        case "no-such-device": {
          enum7 = 29;
          break;
        }
        case "overflow": {
          enum7 = 30;
          break;
        }
        case "not-permitted": {
          enum7 = 31;
          break;
        }
        case "pipe": {
          enum7 = 32;
          break;
        }
        case "read-only": {
          enum7 = 33;
          break;
        }
        case "invalid-seek": {
          enum7 = 34;
          break;
        }
        case "text-file-busy": {
          enum7 = 35;
          break;
        }
        case "cross-device": {
          enum7 = 36;
          break;
        }
        default: {
          if (e instanceof Error) {
            console.error(e);
          }
          throw new TypeError(`"${val7}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg4 + 8, enum7, true);
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant8, valueType: typeof variant8 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:filesystem/types@0.2.3", function="[method]descriptor.metadata-hash-at"][Instruction::Return]', {
    funcName: "[method]descriptor.metadata-hash-at",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline49");
_trampoline49.fnName = "wasi:filesystem/types@0.2.3#metadataHashAt";
var _trampoline50 = /* @__PURE__ */ __name(function(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable14[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.read"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "read",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.read(BigInt.asUintN(64, BigInt(arg1))), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case "ok": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val4 = e;
      var len4 = Array.isArray(val4) ? val4.length : val4.byteLength;
      var ptr4 = realloc1(0, 0, 1, len4 * 1);
      let valData4;
      const valLenBytes4 = len4 * 1;
      if (Array.isArray(val4)) {
        let offset = 0;
        const dv4 = new DataView(memory0.buffer);
        for (const v of val4) {
          _requireValidNumericPrimitive.bind(null, "u8")(v);
          dv4.setUint8(ptr4 + offset, v, true);
          offset += 1;
        }
      } else {
        valData4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, valLenBytes4);
        const out4 = new Uint8Array(memory0.buffer, ptr4, valLenBytes4);
        out4.set(valData4);
      }
      dataView(memory0).setUint32(arg2 + 8, len4, true);
      dataView(memory0).setUint32(arg2 + 4, ptr4, true);
      break;
    }
    case "err": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case "last-operation-failed": {
          const e2 = variant6.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle5 = e2[symbolRscHandle];
          if (!handle5) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle5 = rscTableCreateOwn(handleTable23, rep3);
          }
          dataView(memory0).setInt32(arg2 + 8, handle5, true);
          break;
        }
        case "closed": {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.read"][Instruction::Return]', {
    funcName: "[method]input-stream.read",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline50");
_trampoline50.fnName = "wasi:io/streams@0.2.12#read";
var _trampoline51 = /* @__PURE__ */ __name(function(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable14[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(InputStream2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.blocking-read"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "blockingRead",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.blockingRead(BigInt.asUintN(64, BigInt(arg1))), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case "ok": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      var val4 = e;
      var len4 = Array.isArray(val4) ? val4.length : val4.byteLength;
      var ptr4 = realloc1(0, 0, 1, len4 * 1);
      let valData4;
      const valLenBytes4 = len4 * 1;
      if (Array.isArray(val4)) {
        let offset = 0;
        const dv4 = new DataView(memory0.buffer);
        for (const v of val4) {
          _requireValidNumericPrimitive.bind(null, "u8")(v);
          dv4.setUint8(ptr4 + offset, v, true);
          offset += 1;
        }
      } else {
        valData4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, valLenBytes4);
        const out4 = new Uint8Array(memory0.buffer, ptr4, valLenBytes4);
        out4.set(valData4);
      }
      dataView(memory0).setUint32(arg2 + 8, len4, true);
      dataView(memory0).setUint32(arg2 + 4, ptr4, true);
      break;
    }
    case "err": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case "last-operation-failed": {
          const e2 = variant6.val;
          dataView(memory0).setInt8(arg2 + 4, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle5 = e2[symbolRscHandle];
          if (!handle5) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle5 = rscTableCreateOwn(handleTable23, rep3);
          }
          dataView(memory0).setInt32(arg2 + 8, handle5, true);
          break;
        }
        case "closed": {
          dataView(memory0).setInt8(arg2 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]input-stream.blocking-read"][Instruction::Return]', {
    funcName: "[method]input-stream.blocking-read",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline51");
_trampoline51.fnName = "wasi:io/streams@0.2.12#blockingRead";
var _trampoline52 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable15[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.check-write"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "checkWrite",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.checkWrite(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case "last-operation-failed": {
          const e2 = variant5.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e2[symbolRscHandle];
          if (!handle4) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle4 = rscTableCreateOwn(handleTable23, rep3);
          }
          dataView(memory0).setInt32(arg1 + 12, handle4, true);
          break;
        }
        case "closed": {
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
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.check-write"][Instruction::Return]', {
    funcName: "[method]output-stream.check-write",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline52");
_trampoline52.fnName = "wasi:io/streams@0.2.12#checkWrite";
var _trampoline53 = /* @__PURE__ */ __name(function(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable15[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
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
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "write",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.write(result3), "fn")
    });
    ret = hostRet4 !== null && typeof hostRet4 === "object" && (hostRet4.tag === "ok" || hostRet4.tag === "err") ? hostRet4 : { tag: "ok", val: hostRet4 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant7 = ret;
  switch (variant7.tag) {
    case "ok": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant7.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant6 = e;
      switch (variant6.tag) {
        case "last-operation-failed": {
          const e2 = variant6.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle5 = e2[symbolRscHandle];
          if (!handle5) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle5 = rscTableCreateOwn(handleTable23, rep3);
          }
          dataView(memory0).setInt32(arg3 + 8, handle5, true);
          break;
        }
        case "closed": {
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
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant7, valueType: typeof variant7 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.write"][Instruction::Return]', {
    funcName: "[method]output-stream.write",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline53");
_trampoline53.fnName = "wasi:io/streams@0.2.12#write";
var _trampoline54 = /* @__PURE__ */ __name(function(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable15[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable2.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream2.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1 });
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2 });
  }
  curResourceBorrows.push(rsc0);
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-flush"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "blockingFlush",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "result-catch-handler",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => rsc0.blockingFlush(), "fn")
    });
    ret = hostRet3 !== null && typeof hostRet3 === "object" && (hostRet3.tag === "ok" || hostRet3.tag === "err") ? hostRet3 : { tag: "ok", val: hostRet3 };
  } catch (e) {
    if (getOrCreateAsyncState(3).markTrapped(e)) {
      throw e;
    }
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  for (const entry of curResourceBorrows) {
    const rsc = entry.rsc ?? entry;
    if (entry.drop) {
      if (rsc[symbolRscHandle]) {
        entry.drop(rsc[symbolRscHandle]);
      }
    }
    rsc[symbolRscHandle] = void 0;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case "last-operation-failed": {
          const e2 = variant5.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e2 instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e2[symbolRscHandle];
          if (!handle4) {
            const rep3 = e2[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep3, e2);
            handle4 = rscTableCreateOwn(handleTable23, rep3);
          }
          dataView(memory0).setInt32(arg1 + 8, handle4, true);
          break;
        }
        case "closed": {
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
      _debugLog("ERROR: invalid value (expected result as object with 'tag' member)", { value: variant6, valueType: typeof variant6 });
      throw new TypeError("invalid variant specified for result");
    }
  }
  _debugLog('[iface="wasi:io/streams@0.2.12", function="[method]output-stream.blocking-flush"][Instruction::Return]', {
    funcName: "[method]output-stream.blocking-flush",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline54");
_trampoline54.fnName = "wasi:io/streams@0.2.12#blockingFlush";
var _trampoline55 = /* @__PURE__ */ __name(function(arg0, arg1) {
  _debugLog('[iface="wasi:random/random@0.2.12", function="get-random-bytes"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getRandomBytes",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => getRandomBytes(BigInt.asUintN(64, BigInt(arg0))), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  var val0 = ret;
  var len0 = Array.isArray(val0) ? val0.length : val0.byteLength;
  var ptr0 = realloc1(0, 0, 1, len0 * 1);
  let valData0;
  const valLenBytes0 = len0 * 1;
  if (Array.isArray(val0)) {
    let offset = 0;
    const dv0 = new DataView(memory0.buffer);
    for (const v of val0) {
      _requireValidNumericPrimitive.bind(null, "u8")(v);
      dv0.setUint8(ptr0 + offset, v, true);
      offset += 1;
    }
  } else {
    valData0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, valLenBytes0);
    const out0 = new Uint8Array(memory0.buffer, ptr0, valLenBytes0);
    out0.set(valData0);
  }
  dataView(memory0).setUint32(arg1 + 4, len0, true);
  dataView(memory0).setUint32(arg1 + 0, ptr0, true);
  _debugLog('[iface="wasi:random/random@0.2.12", function="get-random-bytes"][Instruction::Return]', {
    funcName: "get-random-bytes",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline55");
_trampoline55.fnName = "wasi:random/random@0.2.12#getRandomBytes";
var _trampoline56 = /* @__PURE__ */ __name(function(arg0) {
  _debugLog('[iface="wasi:filesystem/preopens@0.2.3", function="get-directories"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getDirectories",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => getDirectories(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
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
    const base = result3 + i * 12;
    var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor2)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep2 = tuple0_0[symbolRscRep] || ++captureCnt12;
      captureTable12.set(rep2, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable25, rep2);
    }
    dataView(memory0).setInt32(base + 0, handle1, true);
    var encodeRes = _utf8AllocateAndEncode(tuple0_1, realloc1, memory0);
    var ptr2 = encodeRes.ptr;
    var len2 = encodeRes.len;
    dataView(memory0).setUint32(base + 8, len2, true);
    dataView(memory0).setUint32(base + 4, ptr2, true);
  }
  dataView(memory0).setUint32(arg0 + 4, len3, true);
  dataView(memory0).setUint32(arg0 + 0, result3, true);
  _debugLog('[iface="wasi:filesystem/preopens@0.2.3", function="get-directories"][Instruction::Return]', {
    funcName: "get-directories",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline56");
_trampoline56.fnName = "wasi:filesystem/preopens@0.2.3#getDirectories";
var handleTable26 = [T_FLAG, 0];
handleTable26._createdReps = /* @__PURE__ */ new Set();
var captureTable10 = /* @__PURE__ */ new Map();
var captureCnt10 = 0;
HANDLE_TABLES[26] = handleTable26;
var _trampoline57 = /* @__PURE__ */ __name(function(arg0) {
  _debugLog('[iface="wasi:cli/terminal-stdin@0.2.3", function="get-terminal-stdin"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getTerminalStdin",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => getTerminalStdin(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  var variant1 = ret;
  if (variant1 === null || variant1 === void 0) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalInput2)) {
      throw new TypeError('Resource error: Not a valid "TerminalInput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep2 = e[symbolRscRep] || ++captureCnt10;
      captureTable10.set(rep2, e);
      handle0 = rscTableCreateOwn(handleTable26, rep2);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
  _debugLog('[iface="wasi:cli/terminal-stdin@0.2.3", function="get-terminal-stdin"][Instruction::Return]', {
    funcName: "get-terminal-stdin",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline57");
_trampoline57.fnName = "wasi:cli/terminal-stdin@0.2.3#getTerminalStdin";
var handleTable27 = [T_FLAG, 0];
handleTable27._createdReps = /* @__PURE__ */ new Set();
var captureTable11 = /* @__PURE__ */ new Map();
var captureCnt11 = 0;
HANDLE_TABLES[27] = handleTable27;
var _trampoline58 = /* @__PURE__ */ __name(function(arg0) {
  _debugLog('[iface="wasi:cli/terminal-stdout@0.2.3", function="get-terminal-stdout"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getTerminalStdout",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => getTerminalStdout(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  var variant1 = ret;
  if (variant1 === null || variant1 === void 0) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput2)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep2 = e[symbolRscRep] || ++captureCnt11;
      captureTable11.set(rep2, e);
      handle0 = rscTableCreateOwn(handleTable27, rep2);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
  _debugLog('[iface="wasi:cli/terminal-stdout@0.2.3", function="get-terminal-stdout"][Instruction::Return]', {
    funcName: "get-terminal-stdout",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline58");
_trampoline58.fnName = "wasi:cli/terminal-stdout@0.2.3#getTerminalStdout";
var _trampoline59 = /* @__PURE__ */ __name(function(arg0) {
  _debugLog('[iface="wasi:cli/terminal-stderr@0.2.3", function="get-terminal-stderr"] [Instruction::CallInterface] (sync, @ enter)');
  const hostProvided = true;
  let parentTask;
  let task;
  let subtask;
  const createTask = /* @__PURE__ */ __name(() => {
    const results = createNewCurrentTask({
      componentIdx: -1,
      isAsync: false,
      entryFnName: "getTerminalStderr",
      getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
      callbackFnName: null,
      errHandling: "none",
      callingWasmExport: false
    });
    task = results[0];
  }, "createTask");
  taskCreation: {
    parentTask = getCurrentTask(
      3,
      _getGlobalCurrentTaskMeta(3)?.taskID
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
      fn: /* @__PURE__ */ __name(() => getTerminalStderr(), "fn")
    });
  } catch (err) {
    _debugLog("[Instruction::CallInterface] error during sync call", {
      taskID: task.id(),
      subtaskID: task.getParentSubtask()?.id(),
      err
    });
    getOrCreateAsyncState(3).markTrapped(err);
    task.setErrored(err);
    task.reject(err);
    task.exit();
    throw err;
  }
  var variant1 = ret;
  if (variant1 === null || variant1 === void 0) {
    dataView(memory0).setInt8(arg0 + 0, 0, true);
  } else {
    const e = variant1;
    dataView(memory0).setInt8(arg0 + 0, 1, true);
    if (!(e instanceof TerminalOutput2)) {
      throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
    }
    var handle0 = e[symbolRscHandle];
    if (!handle0) {
      const rep2 = e[symbolRscRep] || ++captureCnt11;
      captureTable11.set(rep2, e);
      handle0 = rscTableCreateOwn(handleTable27, rep2);
    }
    dataView(memory0).setInt32(arg0 + 4, handle0, true);
  }
  _debugLog('[iface="wasi:cli/terminal-stderr@0.2.3", function="get-terminal-stderr"][Instruction::Return]', {
    funcName: "get-terminal-stderr",
    paramCount: 0,
    async: false,
    postReturn: false
  });
  task.resolve([ret]);
  task.exit();
}, "_trampoline59");
_trampoline59.fnName = "wasi:cli/terminal-stderr@0.2.3#getTerminalStderr";
var exports5;
var handleTable1 = [T_FLAG, 0];
handleTable1._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[1] = handleTable1;
var handleTable0 = [T_FLAG, 0];
handleTable0._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[0] = handleTable0;
var handleTable2 = [T_FLAG, 0];
handleTable2._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[2] = handleTable2;
var handleTable3 = [T_FLAG, 0];
handleTable3._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[3] = handleTable3;
var handleTable4 = [T_FLAG, 0];
handleTable4._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[4] = handleTable4;
var handleTable5 = [T_FLAG, 0];
handleTable5._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[5] = handleTable5;
var handleTable6 = [T_FLAG, 0];
handleTable6._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[6] = handleTable6;
var handleTable7 = [T_FLAG, 0];
handleTable7._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[7] = handleTable7;
var handleTable8 = [T_FLAG, 0];
handleTable8._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[8] = handleTable8;
var handleTable9 = [T_FLAG, 0];
handleTable9._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[9] = handleTable9;
var handleTable12 = [T_FLAG, 0];
handleTable12._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[12] = handleTable12;
var handleTable10 = [T_FLAG, 0];
handleTable10._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[10] = handleTable10;
var handleTable11 = [T_FLAG, 0];
handleTable11._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[11] = handleTable11;
var incomingHandler0212Handle;
function handle(arg0, arg1) {
  const hostProvided = false;
  getOrCreateAsyncState(3).throwIfTrapped();
  const [task, _wasm_call_currentTaskID] = createNewCurrentTask({
    componentIdx: 3,
    isAsync: false,
    isManualAsync: false,
    preserveFutureResult: false,
    entryFnName: "incomingHandler0212Handle",
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    callbackFnName: null,
    errHandling: "none",
    callingWasmExport: true
  });
  const started = task.enterSync();
  if (false) {
    task.setReturnMemoryIdx(null);
    task.setReturnMemory(() => null());
  }
  return _withGlobalCurrentTaskMeta({
    taskID: task.id(),
    componentIdx: task.componentIdx(),
    fn: /* @__PURE__ */ __name(() => {
      try {
        if (!(arg0 instanceof IncomingRequest2)) {
          throw new TypeError('Resource error: Not a valid "IncomingRequest" resource.');
        }
        var handle0 = arg0[symbolRscHandle];
        if (!handle0) {
          const rep2 = arg0[symbolRscRep] || ++captureCnt4;
          captureTable4.set(rep2, arg0);
          handle0 = rscTableCreateOwn(handleTable19, rep2);
        }
        if (!(arg1 instanceof ResponseOutparam2)) {
          throw new TypeError('Resource error: Not a valid "ResponseOutparam" resource.');
        }
        var handle1 = arg1[symbolRscHandle];
        if (!handle1) {
          const rep2 = arg1[symbolRscRep] || ++captureCnt6;
          captureTable6.set(rep2, arg1);
          handle1 = rscTableCreateOwn(handleTable21, rep2);
        }
        _debugLog('[iface="wasi:http/incoming-handler@0.2.12", function="handle"][Instruction::CallWasm] enter', {
          funcName: "handle",
          paramCount: 2,
          async: false,
          postReturn: false
        });
        let ret;
        try {
          incomingHandler0212Handle(handle0, handle1);
        } catch (err) {
          _debugLog("[Instruction::CallWasm] error during sync call", {
            taskID: task.id(),
            err
          });
          getOrCreateAsyncState(3).markTrapped(err);
          task.setErrored(err);
          task.reject(err);
          task.exit();
          throw err;
        }
        _debugLog('[iface="wasi:http/incoming-handler@0.2.12", function="handle"][Instruction::Return]', {
          funcName: "handle",
          paramCount: 0,
          async: false,
          postReturn: false
        });
        task.resolve([ret]);
        task.exit();
      } catch (err) {
        if (!task.isResolvedState()) {
          task.setErrored(err);
          task.reject(err);
        }
        if (!task.isExited()) {
          task.exit({ skipExclusiveLockCheck: true });
        }
        throw err;
      }
    }, "fn")
  });
}
__name(handle, "handle");
function trampoline0(handle2) {
  const handleEntry = rscTableRemove(handleTable14, handle2);
  if (handleEntry.own) {
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable1.delete(handleEntry.rep);
    } else if (InputStream2[symbolCabiDispose]) {
      InputStream2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline0, "trampoline0");
function trampoline1(handle2) {
  const handleEntry = rscTableRemove(handleTable15, handle2);
  if (handleEntry.own) {
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable2.delete(handleEntry.rep);
    } else if (OutputStream2[symbolCabiDispose]) {
      OutputStream2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline1, "trampoline1");
function trampoline2(handle2) {
  const handleEntry = rscTableRemove(handleTable16, handle2);
  if (handleEntry.own) {
    const rsc = captureTable5.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable5.delete(handleEntry.rep);
    } else if (IncomingBody2[symbolCabiDispose]) {
      IncomingBody2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline2, "trampoline2");
function trampoline3(handle2) {
  const handleEntry = rscTableRemove(handleTable17, handle2);
  if (handleEntry.own) {
    const rsc = captureTable9.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable9.delete(handleEntry.rep);
    } else if (OutgoingBody2[symbolCabiDispose]) {
      OutgoingBody2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline3, "trampoline3");
function trampoline4(handle2) {
  const handleEntry = rscTableRemove(handleTable18, handle2);
  if (handleEntry.own) {
    const rsc = captureTable8.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable8.delete(handleEntry.rep);
    } else if (FutureTrailers2[symbolCabiDispose]) {
      FutureTrailers2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline4, "trampoline4");
function trampoline5(handle2) {
  const handleEntry = rscTableRemove(handleTable19, handle2);
  if (handleEntry.own) {
    const rsc = captureTable4.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable4.delete(handleEntry.rep);
    } else if (IncomingRequest2[symbolCabiDispose]) {
      IncomingRequest2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline5, "trampoline5");
function trampoline6(handle2) {
  const handleEntry = rscTableRemove(handleTable20, handle2);
  if (handleEntry.own) {
    const rsc = captureTable7.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable7.delete(handleEntry.rep);
    } else if (OutgoingResponse2[symbolCabiDispose]) {
      OutgoingResponse2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline6, "trampoline6");
function trampoline7(handle2) {
  const handleEntry = rscTableRemove(handleTable21, handle2);
  if (handleEntry.own) {
    const rsc = captureTable6.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable6.delete(handleEntry.rep);
    } else if (ResponseOutparam2[symbolCabiDispose]) {
      ResponseOutparam2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline7, "trampoline7");
var trampoline8 = _trampoline8.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 8,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline8.manuallyAsync,
    paramLiftFns: [
      _liftFlatOwn({
        componentIdx: 3,
        classNameFn: /* @__PURE__ */ __name(() => IncomingBody2, "classNameFn"),
        createResourceFn: /* @__PURE__ */ __name((handle2) => {
          const rep2 = handleTable5[(handle2 << 1) + 1] & ~T_FLAG;
          let resourceObj = captureTable5.get(rep2);
          if (!resourceObj) {
            resourceObj = Object.create(IncomingBody2.prototype);
            Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
            Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
          } else {
            captureTable5.delete(rep2);
          }
          rscTableRemove(handleTable5, handle2);
          return resourceObj;
        }, "createResourceFn")
      })
    ],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_FutureTrailers(obj) {
        if (!(obj instanceof FutureTrailers2)) {
          throw new TypeError('Resource error: Not a valid "FutureTrailers" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt8;
          captureTable8.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable8, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_FutureTrailers")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline8
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 8,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline8.manuallyAsync,
    paramLiftFns: [
      _liftFlatOwn({
        componentIdx: 3,
        classNameFn: /* @__PURE__ */ __name(() => IncomingBody2, "classNameFn"),
        createResourceFn: /* @__PURE__ */ __name((handle2) => {
          const rep2 = handleTable5[(handle2 << 1) + 1] & ~T_FLAG;
          let resourceObj = captureTable5.get(rep2);
          if (!resourceObj) {
            resourceObj = Object.create(IncomingBody2.prototype);
            Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
            Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
          } else {
            captureTable5.delete(rep2);
          }
          rscTableRemove(handleTable5, handle2);
          return resourceObj;
        }, "createResourceFn")
      })
    ],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_FutureTrailers2(obj) {
        if (!(obj instanceof FutureTrailers2)) {
          throw new TypeError('Resource error: Not a valid "FutureTrailers" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt8;
          captureTable8.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable8, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_FutureTrailers")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline8
  }
);
var trampoline9 = _trampoline9.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 9,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline9.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 20), _liftFlatU16],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 1, 1, 1],
          ["err", null, 1, 1, 1]
        ],
        variantSize32: 1,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 1
      })
    ],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline9
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 9,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline9.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 20), _liftFlatU16],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 1, 1, 1],
          ["err", null, 1, 1, 1]
        ],
        variantSize32: 1,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 1
      })
    ],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline9
  }
);
var trampoline10 = _trampoline10.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 10,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline10.manuallyAsync,
    paramLiftFns: [
      _liftFlatOwn({
        componentIdx: 3,
        classNameFn: /* @__PURE__ */ __name(() => Fields2, "classNameFn"),
        createResourceFn: /* @__PURE__ */ __name((handle2) => {
          const rep2 = handleTable3[(handle2 << 1) + 1] & ~T_FLAG;
          let resourceObj = captureTable3.get(rep2);
          if (!resourceObj) {
            resourceObj = Object.create(Fields2.prototype);
            Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
            Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
          } else {
            captureTable3.delete(rep2);
          }
          rscTableRemove(handleTable3, handle2);
          return resourceObj;
        }, "createResourceFn")
      })
    ],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutgoingResponse(obj) {
        if (!(obj instanceof OutgoingResponse2)) {
          throw new TypeError('Resource error: Not a valid "OutgoingResponse" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt7;
          captureTable7.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable7, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_OutgoingResponse")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline10
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 10,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline10.manuallyAsync,
    paramLiftFns: [
      _liftFlatOwn({
        componentIdx: 3,
        classNameFn: /* @__PURE__ */ __name(() => Fields2, "classNameFn"),
        createResourceFn: /* @__PURE__ */ __name((handle2) => {
          const rep2 = handleTable3[(handle2 << 1) + 1] & ~T_FLAG;
          let resourceObj = captureTable3.get(rep2);
          if (!resourceObj) {
            resourceObj = Object.create(Fields2.prototype);
            Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
            Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
          } else {
            captureTable3.delete(rep2);
          }
          rscTableRemove(handleTable3, handle2);
          return resourceObj;
        }, "createResourceFn")
      })
    ],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutgoingResponse2(obj) {
        if (!(obj instanceof OutgoingResponse2)) {
          throw new TypeError('Resource error: Not a valid "OutgoingResponse" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt7;
          captureTable7.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable7, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_OutgoingResponse")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline10
  }
);
var trampoline11 = _trampoline11.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 11,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline11.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Fields(obj) {
        if (!(obj instanceof Fields2)) {
          throw new TypeError('Resource error: Not a valid "Fields" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt3;
          captureTable3.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable3, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_Fields")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline11
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 11,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline11.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Fields2(obj) {
        if (!(obj instanceof Fields2)) {
          throw new TypeError('Resource error: Not a valid "Fields" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt3;
          captureTable3.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable3, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_Fields")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline11
  }
);
function trampoline12(handle2) {
  const handleEntry = rscTableRemove(handleTable22, handle2);
  if (handleEntry.own) {
    const rsc = captureTable3.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable3.delete(handleEntry.rep);
    } else if (Fields2[symbolCabiDispose]) {
      Fields2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline12, "trampoline12");
function trampoline13(handle2) {
  const handleEntry = rscTableRemove(handleTable23, handle2);
  if (handleEntry.own) {
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline13, "trampoline13");
var handleTable24 = [T_FLAG, 0];
handleTable24._createdReps = /* @__PURE__ */ new Set();
HANDLE_TABLES[24] = handleTable24;
function trampoline14(handle2) {
  const handleEntry = rscTableRemove(handleTable24, handle2);
  if (handleEntry.own) {
    throw new TypeError("unreachable trampoline for resource [ResourceIndex(13)]");
  }
}
__name(trampoline14, "trampoline14");
function trampoline15(handle2) {
  const handleEntry = rscTableRemove(handleTable25, handle2);
  if (handleEntry.own) {
    const rsc = captureTable12.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable12.delete(handleEntry.rep);
    } else if (Descriptor2[symbolCabiDispose]) {
      Descriptor2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline15, "trampoline15");
var trampoline16 = _trampoline16.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 16,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline16.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream(obj) {
        if (!(obj instanceof OutputStream2)) {
          throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt2;
          captureTable2.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable2, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_OutputStream")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline16
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 16,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline16.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream2(obj) {
        if (!(obj instanceof OutputStream2)) {
          throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt2;
          captureTable2.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable2, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_OutputStream")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline16
  }
);
function trampoline17(handle2) {
  const handleEntry = rscTableRemove(handleTable26, handle2);
  if (handleEntry.own) {
    const rsc = captureTable10.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable10.delete(handleEntry.rep);
    } else if (TerminalInput2[symbolCabiDispose]) {
      TerminalInput2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline17, "trampoline17");
function trampoline18(handle2) {
  const handleEntry = rscTableRemove(handleTable27, handle2);
  if (handleEntry.own) {
    const rsc = captureTable11.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose4]) rsc[symbolDispose4]();
      captureTable11.delete(handleEntry.rep);
    } else if (TerminalOutput2[symbolCabiDispose]) {
      TerminalOutput2[symbolCabiDispose](handleEntry.rep);
    }
  }
}
__name(trampoline18, "trampoline18");
var trampoline19 = _trampoline19.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 19,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline19.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_InputStream(obj) {
        if (!(obj instanceof InputStream2)) {
          throw new TypeError('Resource error: Not a valid "InputStream" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable1, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_InputStream")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline19
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 19,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline19.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_InputStream2(obj) {
        if (!(obj instanceof InputStream2)) {
          throw new TypeError('Resource error: Not a valid "InputStream" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt1;
          captureTable1.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable1, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_InputStream")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline19
  }
);
var trampoline20 = _trampoline20.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 20,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline20.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream3(obj) {
        if (!(obj instanceof OutputStream2)) {
          throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt2;
          captureTable2.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable2, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_OutputStream")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline20
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 20,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline20.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatOwn({
      componentIdx: 3,
      lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream4(obj) {
        if (!(obj instanceof OutputStream2)) {
          throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
        }
        let handle2 = obj[symbolRscHandle];
        if (!handle2) {
          const rep2 = obj[symbolRscRep] || ++captureCnt2;
          captureTable2.set(rep2, obj);
          handle2 = rscTableCreateOwn(handleTable2, rep2);
        }
        return handle2;
      }, "lowerImportedOwnedHost_OutputStream")
    })],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline20
  }
);
var trampoline21 = _trampoline21.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 21,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline21.manuallyAsync,
    paramLiftFns: [
      _liftFlatResult({
        caseMetas: [["ok", null, 0, 0, 0, []], ["err", null, 0, 0, 0, []]],
        variantSize32: 1,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 1,
        variantPayloadFlatTypes: []
      })
    ],
    resultLowerFns: [],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline21
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 21,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline21.manuallyAsync,
    paramLiftFns: [
      _liftFlatResult({
        caseMetas: [["ok", null, 0, 0, 0, []], ["err", null, 0, 0, 0, []]],
        variantSize32: 1,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 1,
        variantPayloadFlatTypes: []
      })
    ],
    resultLowerFns: [],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: null,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => null, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline21
  }
);
var trampoline22 = _trampoline22.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 22,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline22.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 14), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatList({
            elemLowerFn: _lowerFlatU8,
            elemSize32: 1,
            elemAlign32: 1
          }), 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$1(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc0, "getReallocFn"),
    importFn: _trampoline22
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 22,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline22.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 14), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatList({
            elemLowerFn: _lowerFlatU8,
            elemSize32: 1,
            elemAlign32: 1
          }), 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$12(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc0, "getReallocFn"),
    importFn: _trampoline22
  }
);
var trampoline23 = _trampoline23.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 23,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline23.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 15), _liftFlatList({
      elemLiftFn: _liftFlatU8,
      elemAlign32: 1,
      elemSize32: 1,
      typedArray: Uint8Array
    })],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$13(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline23
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 23,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline23.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 15), _liftFlatList({
      elemLiftFn: _liftFlatU8,
      elemAlign32: 1,
      elemSize32: 1,
      typedArray: Uint8Array
    })],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$14(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline23
  }
);
var trampoline24 = _trampoline24.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 24,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline24.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 16)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_InputStream3(obj) {
              if (!(obj instanceof InputStream2)) {
                throw new TypeError('Resource error: Not a valid "InputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt1;
                captureTable1.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable1, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_InputStream")
          }), 8, 4, 4],
          ["err", null, 8, 4, 4]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline24
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 24,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline24.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 16)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_InputStream4(obj) {
              if (!(obj instanceof InputStream2)) {
                throw new TypeError('Resource error: Not a valid "InputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt1;
                captureTable1.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable1, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_InputStream")
          }), 8, 4, 4],
          ["err", null, 8, 4, 4]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline24
  }
);
var trampoline25 = _trampoline25.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 25,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline25.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 17)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream5(obj) {
              if (!(obj instanceof OutputStream2)) {
                throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt2;
                captureTable2.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable2, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_OutputStream")
          }), 8, 4, 4],
          ["err", null, 8, 4, 4]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline25
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 25,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline25.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 17)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream6(obj) {
              if (!(obj instanceof OutputStream2)) {
                throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt2;
                captureTable2.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable2, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_OutputStream")
          }), 8, 4, 4],
          ["err", null, 8, 4, 4]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline25
  }
);
var trampoline26 = _trampoline26.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 26,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline26.manuallyAsync,
    paramLiftFns: [
      _liftFlatOwn({
        componentIdx: 3,
        classNameFn: /* @__PURE__ */ __name(() => OutgoingBody2, "classNameFn"),
        createResourceFn: /* @__PURE__ */ __name((handle2) => {
          const rep2 = handleTable9[(handle2 << 1) + 1] & ~T_FLAG;
          let resourceObj = captureTable9.get(rep2);
          if (!resourceObj) {
            resourceObj = Object.create(OutgoingBody2.prototype);
            Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
            Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
          } else {
            captureTable9.delete(rep2);
          }
          rscTableRemove(handleTable9, handle2);
          return resourceObj;
        }, "createResourceFn")
      }),
      _liftFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0, []],
          [
            "some",
            _liftFlatOwn({
              componentIdx: 3,
              classNameFn: /* @__PURE__ */ __name(() => Fields2, "classNameFn"),
              createResourceFn: /* @__PURE__ */ __name((handle2) => {
                const rep2 = handleTable3[(handle2 << 1) + 1] & ~T_FLAG;
                let resourceObj = captureTable3.get(rep2);
                if (!resourceObj) {
                  resourceObj = Object.create(Fields2.prototype);
                  Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
                  Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
                } else {
                  captureTable3.delete(rep2);
                }
                rscTableRemove(handleTable3, handle2);
                return resourceObj;
              }, "createResourceFn")
            }),
            4,
            4,
            1,
            ["i32"]
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2,
        variantPayloadFlatTypes: ["i32"]
      })
    ],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 40, 8, 8],
          ["err", _lowerFlatVariant({
            caseMetas: [["DNS-timeout", null, 0, 0, 0], ["DNS-error", _lowerFlatRecord({ fieldMetas: [[
              "rcode",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ], [
              "infoCode",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU16, 2, 2, 1]
                ],
                variantSize32: 4,
                variantAlign32: 2,
                variantPayloadOffset32: 2,
                variantFlatCount: 2
              }),
              4,
              2
            ]], size32: 16, align32: 4 }), 16, 4, 5], ["destination-not-found", null, 0, 0, 0], ["destination-unavailable", null, 0, 0, 0], ["destination-IP-prohibited", null, 0, 0, 0], ["destination-IP-unroutable", null, 0, 0, 0], ["connection-refused", null, 0, 0, 0], ["connection-terminated", null, 0, 0, 0], ["connection-timeout", null, 0, 0, 0], ["connection-read-timeout", null, 0, 0, 0], ["connection-write-timeout", null, 0, 0, 0], ["connection-limit-reached", null, 0, 0, 0], ["TLS-protocol-error", null, 0, 0, 0], ["TLS-certificate-error", null, 0, 0, 0], ["TLS-alert-received", _lowerFlatRecord({ fieldMetas: [[
              "alertId",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU8, 1, 1, 1]
                ],
                variantSize32: 2,
                variantAlign32: 1,
                variantPayloadOffset32: 1,
                variantFlatCount: 2
              }),
              2,
              1
            ], [
              "alertMessage",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ]], size32: 16, align32: 4 }), 16, 4, 5], ["HTTP-request-denied", null, 0, 0, 0], ["HTTP-request-length-required", null, 0, 0, 0], [
              "HTTP-request-body-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU64, 8, 8, 1]
                ],
                variantSize32: 16,
                variantAlign32: 8,
                variantPayloadOffset32: 8,
                variantFlatCount: 2
              }),
              16,
              8,
              2
            ], ["HTTP-request-method-invalid", null, 0, 0, 0], ["HTTP-request-URI-invalid", null, 0, 0, 0], ["HTTP-request-URI-too-long", null, 0, 0, 0], [
              "HTTP-request-header-section-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4,
              2
            ], [
              "HTTP-request-header-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatRecord({ fieldMetas: [[
                    "fieldName",
                    _lowerFlatOption({
                      caseMetas: [
                        ["none", null, 0, 0, 0],
                        ["some", _lowerFlatStringAny, 8, 4, 2]
                      ],
                      variantSize32: 12,
                      variantAlign32: 4,
                      variantPayloadOffset32: 4,
                      variantFlatCount: 3
                    }),
                    12,
                    4
                  ], [
                    "fieldSize",
                    _lowerFlatOption({
                      caseMetas: [
                        ["none", null, 0, 0, 0],
                        ["some", _lowerFlatU32, 4, 4, 1]
                      ],
                      variantSize32: 8,
                      variantAlign32: 4,
                      variantPayloadOffset32: 4,
                      variantFlatCount: 2
                    }),
                    8,
                    4
                  ]], size32: 20, align32: 4 }), 20, 4, 5]
                ],
                variantSize32: 24,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 6
              }),
              24,
              4,
              6
            ], [
              "HTTP-request-trailer-section-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4,
              2
            ], ["HTTP-request-trailer-size", _lowerFlatRecord({ fieldMetas: [[
              "fieldName",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ], [
              "fieldSize",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4
            ]], size32: 20, align32: 4 }), 20, 4, 5], ["HTTP-response-incomplete", null, 0, 0, 0], [
              "HTTP-response-header-section-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4,
              2
            ], ["HTTP-response-header-size", _lowerFlatRecord({ fieldMetas: [[
              "fieldName",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ], [
              "fieldSize",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4
            ]], size32: 20, align32: 4 }), 20, 4, 5], [
              "HTTP-response-body-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU64, 8, 8, 1]
                ],
                variantSize32: 16,
                variantAlign32: 8,
                variantPayloadOffset32: 8,
                variantFlatCount: 2
              }),
              16,
              8,
              2
            ], [
              "HTTP-response-trailer-section-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4,
              2
            ], ["HTTP-response-trailer-size", _lowerFlatRecord({ fieldMetas: [[
              "fieldName",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ], [
              "fieldSize",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4
            ]], size32: 20, align32: 4 }), 20, 4, 5], [
              "HTTP-response-transfer-coding",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4,
              3
            ], [
              "HTTP-response-content-coding",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4,
              3
            ], ["HTTP-response-timeout", null, 0, 0, 0], ["HTTP-upgrade-failed", null, 0, 0, 0], ["HTTP-protocol-error", null, 0, 0, 0], ["loop-detected", null, 0, 0, 0], ["configuration-error", null, 0, 0, 0], [
              "internal-error",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4,
              3
            ]],
            variantSize32: 32,
            variantAlign32: 8,
            variantPayloadOffset32: 8,
            variantFlatCount: 7
          }), 40, 8, 8]
        ],
        variantSize32: 40,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 8
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc0, "getReallocFn"),
    importFn: _trampoline26
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 26,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline26.manuallyAsync,
    paramLiftFns: [
      _liftFlatOwn({
        componentIdx: 3,
        classNameFn: /* @__PURE__ */ __name(() => OutgoingBody2, "classNameFn"),
        createResourceFn: /* @__PURE__ */ __name((handle2) => {
          const rep2 = handleTable9[(handle2 << 1) + 1] & ~T_FLAG;
          let resourceObj = captureTable9.get(rep2);
          if (!resourceObj) {
            resourceObj = Object.create(OutgoingBody2.prototype);
            Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
            Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
          } else {
            captureTable9.delete(rep2);
          }
          rscTableRemove(handleTable9, handle2);
          return resourceObj;
        }, "createResourceFn")
      }),
      _liftFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0, []],
          [
            "some",
            _liftFlatOwn({
              componentIdx: 3,
              classNameFn: /* @__PURE__ */ __name(() => Fields2, "classNameFn"),
              createResourceFn: /* @__PURE__ */ __name((handle2) => {
                const rep2 = handleTable3[(handle2 << 1) + 1] & ~T_FLAG;
                let resourceObj = captureTable3.get(rep2);
                if (!resourceObj) {
                  resourceObj = Object.create(Fields2.prototype);
                  Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
                  Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
                } else {
                  captureTable3.delete(rep2);
                }
                rscTableRemove(handleTable3, handle2);
                return resourceObj;
              }, "createResourceFn")
            }),
            4,
            4,
            1,
            ["i32"]
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2,
        variantPayloadFlatTypes: ["i32"]
      })
    ],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 40, 8, 8],
          ["err", _lowerFlatVariant({
            caseMetas: [["DNS-timeout", null, 0, 0, 0], ["DNS-error", _lowerFlatRecord({ fieldMetas: [[
              "rcode",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ], [
              "infoCode",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU16, 2, 2, 1]
                ],
                variantSize32: 4,
                variantAlign32: 2,
                variantPayloadOffset32: 2,
                variantFlatCount: 2
              }),
              4,
              2
            ]], size32: 16, align32: 4 }), 16, 4, 5], ["destination-not-found", null, 0, 0, 0], ["destination-unavailable", null, 0, 0, 0], ["destination-IP-prohibited", null, 0, 0, 0], ["destination-IP-unroutable", null, 0, 0, 0], ["connection-refused", null, 0, 0, 0], ["connection-terminated", null, 0, 0, 0], ["connection-timeout", null, 0, 0, 0], ["connection-read-timeout", null, 0, 0, 0], ["connection-write-timeout", null, 0, 0, 0], ["connection-limit-reached", null, 0, 0, 0], ["TLS-protocol-error", null, 0, 0, 0], ["TLS-certificate-error", null, 0, 0, 0], ["TLS-alert-received", _lowerFlatRecord({ fieldMetas: [[
              "alertId",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU8, 1, 1, 1]
                ],
                variantSize32: 2,
                variantAlign32: 1,
                variantPayloadOffset32: 1,
                variantFlatCount: 2
              }),
              2,
              1
            ], [
              "alertMessage",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ]], size32: 16, align32: 4 }), 16, 4, 5], ["HTTP-request-denied", null, 0, 0, 0], ["HTTP-request-length-required", null, 0, 0, 0], [
              "HTTP-request-body-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU64, 8, 8, 1]
                ],
                variantSize32: 16,
                variantAlign32: 8,
                variantPayloadOffset32: 8,
                variantFlatCount: 2
              }),
              16,
              8,
              2
            ], ["HTTP-request-method-invalid", null, 0, 0, 0], ["HTTP-request-URI-invalid", null, 0, 0, 0], ["HTTP-request-URI-too-long", null, 0, 0, 0], [
              "HTTP-request-header-section-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4,
              2
            ], [
              "HTTP-request-header-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatRecord({ fieldMetas: [[
                    "fieldName",
                    _lowerFlatOption({
                      caseMetas: [
                        ["none", null, 0, 0, 0],
                        ["some", _lowerFlatStringAny, 8, 4, 2]
                      ],
                      variantSize32: 12,
                      variantAlign32: 4,
                      variantPayloadOffset32: 4,
                      variantFlatCount: 3
                    }),
                    12,
                    4
                  ], [
                    "fieldSize",
                    _lowerFlatOption({
                      caseMetas: [
                        ["none", null, 0, 0, 0],
                        ["some", _lowerFlatU32, 4, 4, 1]
                      ],
                      variantSize32: 8,
                      variantAlign32: 4,
                      variantPayloadOffset32: 4,
                      variantFlatCount: 2
                    }),
                    8,
                    4
                  ]], size32: 20, align32: 4 }), 20, 4, 5]
                ],
                variantSize32: 24,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 6
              }),
              24,
              4,
              6
            ], [
              "HTTP-request-trailer-section-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4,
              2
            ], ["HTTP-request-trailer-size", _lowerFlatRecord({ fieldMetas: [[
              "fieldName",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ], [
              "fieldSize",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4
            ]], size32: 20, align32: 4 }), 20, 4, 5], ["HTTP-response-incomplete", null, 0, 0, 0], [
              "HTTP-response-header-section-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4,
              2
            ], ["HTTP-response-header-size", _lowerFlatRecord({ fieldMetas: [[
              "fieldName",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ], [
              "fieldSize",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4
            ]], size32: 20, align32: 4 }), 20, 4, 5], [
              "HTTP-response-body-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU64, 8, 8, 1]
                ],
                variantSize32: 16,
                variantAlign32: 8,
                variantPayloadOffset32: 8,
                variantFlatCount: 2
              }),
              16,
              8,
              2
            ], [
              "HTTP-response-trailer-section-size",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4,
              2
            ], ["HTTP-response-trailer-size", _lowerFlatRecord({ fieldMetas: [[
              "fieldName",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4
            ], [
              "fieldSize",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatU32, 4, 4, 1]
                ],
                variantSize32: 8,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 2
              }),
              8,
              4
            ]], size32: 20, align32: 4 }), 20, 4, 5], [
              "HTTP-response-transfer-coding",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4,
              3
            ], [
              "HTTP-response-content-coding",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4,
              3
            ], ["HTTP-response-timeout", null, 0, 0, 0], ["HTTP-upgrade-failed", null, 0, 0, 0], ["HTTP-protocol-error", null, 0, 0, 0], ["loop-detected", null, 0, 0, 0], ["configuration-error", null, 0, 0, 0], [
              "internal-error",
              _lowerFlatOption({
                caseMetas: [
                  ["none", null, 0, 0, 0],
                  ["some", _lowerFlatStringAny, 8, 4, 2]
                ],
                variantSize32: 12,
                variantAlign32: 4,
                variantPayloadOffset32: 4,
                variantFlatCount: 3
              }),
              12,
              4,
              3
            ]],
            variantSize32: 32,
            variantAlign32: 8,
            variantPayloadOffset32: 8,
            variantFlatCount: 7
          }), 40, 8, 8]
        ],
        variantSize32: 40,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 8
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc0, "getReallocFn"),
    importFn: _trampoline26
  }
);
var trampoline27 = _trampoline27.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 27,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline27.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 19)],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          ["some", _lowerFlatStringAny, 8, 4, 2]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc0, "getReallocFn"),
    importFn: _trampoline27
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 27,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline27.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 19)],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          ["some", _lowerFlatStringAny, 8, 4, 2]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc0, "getReallocFn"),
    importFn: _trampoline27
  }
);
var trampoline28 = _trampoline28.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 28,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline28.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 19)],
    resultLowerFns: [_lowerFlatVariant({
      caseMetas: [["get", null, 0, 0, 0], ["head", null, 0, 0, 0], ["post", null, 0, 0, 0], ["put", null, 0, 0, 0], ["delete", null, 0, 0, 0], ["connect", null, 0, 0, 0], ["options", null, 0, 0, 0], ["trace", null, 0, 0, 0], ["patch", null, 0, 0, 0], ["other", _lowerFlatStringAny, 8, 4, 2]],
      variantSize32: 12,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 3
    })],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc0, "getReallocFn"),
    importFn: _trampoline28
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 28,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline28.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 19)],
    resultLowerFns: [_lowerFlatVariant({
      caseMetas: [["get", null, 0, 0, 0], ["head", null, 0, 0, 0], ["post", null, 0, 0, 0], ["put", null, 0, 0, 0], ["delete", null, 0, 0, 0], ["connect", null, 0, 0, 0], ["options", null, 0, 0, 0], ["trace", null, 0, 0, 0], ["patch", null, 0, 0, 0], ["other", _lowerFlatStringAny, 8, 4, 2]],
      variantSize32: 12,
      variantAlign32: 4,
      variantPayloadOffset32: 4,
      variantFlatCount: 3
    })],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc0, "getReallocFn"),
    importFn: _trampoline28
  }
);
var trampoline29 = _trampoline29.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 29,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline29.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 19)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_IncomingBody(obj) {
              if (!(obj instanceof IncomingBody2)) {
                throw new TypeError('Resource error: Not a valid "IncomingBody" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt5;
                captureTable5.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable5, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_IncomingBody")
          }), 8, 4, 4],
          ["err", null, 8, 4, 4]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline29
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 29,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline29.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 19)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_IncomingBody2(obj) {
              if (!(obj instanceof IncomingBody2)) {
                throw new TypeError('Resource error: Not a valid "IncomingBody" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt5;
                captureTable5.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable5, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_IncomingBody")
          }), 8, 4, 4],
          ["err", null, 8, 4, 4]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline29
  }
);
var trampoline30 = _trampoline30.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 30,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline30.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 20)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutgoingBody(obj) {
              if (!(obj instanceof OutgoingBody2)) {
                throw new TypeError('Resource error: Not a valid "OutgoingBody" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt9;
                captureTable9.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable9, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_OutgoingBody")
          }), 8, 4, 4],
          ["err", null, 8, 4, 4]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline30
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 30,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline30.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 20)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutgoingBody2(obj) {
              if (!(obj instanceof OutgoingBody2)) {
                throw new TypeError('Resource error: Not a valid "OutgoingBody" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt9;
                captureTable9.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable9, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_OutgoingBody")
          }), 8, 4, 4],
          ["err", null, 8, 4, 4]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline30
  }
);
var trampoline31 = _trampoline31.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 31,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline31.manuallyAsync,
    paramLiftFns: [
      _liftFlatOwn({
        componentIdx: 3,
        classNameFn: /* @__PURE__ */ __name(() => ResponseOutparam2, "classNameFn"),
        createResourceFn: /* @__PURE__ */ __name((handle2) => {
          const rep2 = handleTable21[(handle2 << 1) + 1] & ~T_FLAG;
          let resourceObj = captureTable6.get(rep2);
          if (!resourceObj) {
            resourceObj = Object.create(ResponseOutparam2.prototype);
            Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
            Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
          } else {
            captureTable6.delete(rep2);
          }
          rscTableRemove(handleTable21, handle2);
          return resourceObj;
        }, "createResourceFn")
      }),
      _liftFlatResult({
        caseMetas: [[
          "ok",
          _liftFlatOwn({
            componentIdx: 3,
            classNameFn: /* @__PURE__ */ __name(() => OutgoingResponse2, "classNameFn"),
            createResourceFn: /* @__PURE__ */ __name((handle2) => {
              const rep2 = handleTable7[(handle2 << 1) + 1] & ~T_FLAG;
              let resourceObj = captureTable7.get(rep2);
              if (!resourceObj) {
                resourceObj = Object.create(OutgoingResponse2.prototype);
                Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
                Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
              } else {
                captureTable7.delete(rep2);
              }
              rscTableRemove(handleTable7, handle2);
              return resourceObj;
            }, "createResourceFn")
          }),
          4,
          4,
          1,
          ["i32"]
        ], ["err", _liftFlatVariant({
          caseMetas: [["DNS-timeout", null, 0, 0, 0, []], ["DNS-error", _liftFlatRecord({ fieldMetas: [[
            "rcode",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ], [
            "infoCode",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU16, 2, 2, 1, ["i32"]]
              ],
              variantSize32: 4,
              variantAlign32: 2,
              variantPayloadOffset32: 2,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            4,
            2
          ]], size32: 16, align32: 4 }), 16, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], ["destination-not-found", null, 0, 0, 0, []], ["destination-unavailable", null, 0, 0, 0, []], ["destination-IP-prohibited", null, 0, 0, 0, []], ["destination-IP-unroutable", null, 0, 0, 0, []], ["connection-refused", null, 0, 0, 0, []], ["connection-terminated", null, 0, 0, 0, []], ["connection-timeout", null, 0, 0, 0, []], ["connection-read-timeout", null, 0, 0, 0, []], ["connection-write-timeout", null, 0, 0, 0, []], ["connection-limit-reached", null, 0, 0, 0, []], ["TLS-protocol-error", null, 0, 0, 0, []], ["TLS-certificate-error", null, 0, 0, 0, []], ["TLS-alert-received", _liftFlatRecord({ fieldMetas: [[
            "alertId",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU8, 1, 1, 1, ["i32"]]
              ],
              variantSize32: 2,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            2,
            1
          ], [
            "alertMessage",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ]], size32: 16, align32: 4 }), 16, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], ["HTTP-request-denied", null, 0, 0, 0, []], ["HTTP-request-length-required", null, 0, 0, 0, []], [
            "HTTP-request-body-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU64, 8, 8, 1, ["i64"]]
              ],
              variantSize32: 16,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i64"]
            }),
            16,
            8,
            2,
            ["i32", "i64"]
          ], ["HTTP-request-method-invalid", null, 0, 0, 0, []], ["HTTP-request-URI-invalid", null, 0, 0, 0, []], ["HTTP-request-URI-too-long", null, 0, 0, 0, []], [
            "HTTP-request-header-section-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4,
            2,
            ["i32", "i32"]
          ], [
            "HTTP-request-header-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatRecord({ fieldMetas: [[
                  "fieldName",
                  _liftFlatOption({
                    caseMetas: [
                      ["none", null, 0, 0, 0, []],
                      ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
                    ],
                    variantSize32: 12,
                    variantAlign32: 4,
                    variantPayloadOffset32: 4,
                    variantFlatCount: 3,
                    variantPayloadFlatTypes: ["i32", "i32"]
                  }),
                  12,
                  4
                ], [
                  "fieldSize",
                  _liftFlatOption({
                    caseMetas: [
                      ["none", null, 0, 0, 0, []],
                      ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
                    ],
                    variantSize32: 8,
                    variantAlign32: 4,
                    variantPayloadOffset32: 4,
                    variantFlatCount: 2,
                    variantPayloadFlatTypes: ["i32"]
                  }),
                  8,
                  4
                ]], size32: 20, align32: 4 }), 20, 4, 5, ["i32", "i32", "i32", "i32", "i32"]]
              ],
              variantSize32: 24,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 6,
              variantPayloadFlatTypes: ["i32", "i32", "i32", "i32", "i32"]
            }),
            24,
            4,
            6,
            ["i32", "i32", "i32", "i32", "i32", "i32"]
          ], [
            "HTTP-request-trailer-section-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4,
            2,
            ["i32", "i32"]
          ], ["HTTP-request-trailer-size", _liftFlatRecord({ fieldMetas: [[
            "fieldName",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ], [
            "fieldSize",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4
          ]], size32: 20, align32: 4 }), 20, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], ["HTTP-response-incomplete", null, 0, 0, 0, []], [
            "HTTP-response-header-section-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4,
            2,
            ["i32", "i32"]
          ], ["HTTP-response-header-size", _liftFlatRecord({ fieldMetas: [[
            "fieldName",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ], [
            "fieldSize",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4
          ]], size32: 20, align32: 4 }), 20, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], [
            "HTTP-response-body-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU64, 8, 8, 1, ["i64"]]
              ],
              variantSize32: 16,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i64"]
            }),
            16,
            8,
            2,
            ["i32", "i64"]
          ], [
            "HTTP-response-trailer-section-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4,
            2,
            ["i32", "i32"]
          ], ["HTTP-response-trailer-size", _liftFlatRecord({ fieldMetas: [[
            "fieldName",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ], [
            "fieldSize",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4
          ]], size32: 20, align32: 4 }), 20, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], [
            "HTTP-response-transfer-coding",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4,
            3,
            ["i32", "i32", "i32"]
          ], [
            "HTTP-response-content-coding",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4,
            3,
            ["i32", "i32", "i32"]
          ], ["HTTP-response-timeout", null, 0, 0, 0, []], ["HTTP-upgrade-failed", null, 0, 0, 0, []], ["HTTP-protocol-error", null, 0, 0, 0, []], ["loop-detected", null, 0, 0, 0, []], ["configuration-error", null, 0, 0, 0, []], [
            "internal-error",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4,
            3,
            ["i32", "i32", "i32"]
          ]],
          variantSize32: 32,
          variantAlign32: 8,
          variantPayloadOffset32: 8,
          variantFlatCount: 7,
          variantPayloadFlatTypes: ["i32", "i64", "i32", "i32", "i32", "i32"]
        }), 32, 8, 7, ["i32", "i32", "i64", "i32", "i32", "i32", "i32"]]],
        variantSize32: 40,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 8,
        variantPayloadFlatTypes: ["i32", "i32", "i64", "i32", "i32", "i32", "i32"]
      })
    ],
    resultLowerFns: [],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline31
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 31,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline31.manuallyAsync,
    paramLiftFns: [
      _liftFlatOwn({
        componentIdx: 3,
        classNameFn: /* @__PURE__ */ __name(() => ResponseOutparam2, "classNameFn"),
        createResourceFn: /* @__PURE__ */ __name((handle2) => {
          const rep2 = handleTable21[(handle2 << 1) + 1] & ~T_FLAG;
          let resourceObj = captureTable6.get(rep2);
          if (!resourceObj) {
            resourceObj = Object.create(ResponseOutparam2.prototype);
            Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
            Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
          } else {
            captureTable6.delete(rep2);
          }
          rscTableRemove(handleTable21, handle2);
          return resourceObj;
        }, "createResourceFn")
      }),
      _liftFlatResult({
        caseMetas: [[
          "ok",
          _liftFlatOwn({
            componentIdx: 3,
            classNameFn: /* @__PURE__ */ __name(() => OutgoingResponse2, "classNameFn"),
            createResourceFn: /* @__PURE__ */ __name((handle2) => {
              const rep2 = handleTable7[(handle2 << 1) + 1] & ~T_FLAG;
              let resourceObj = captureTable7.get(rep2);
              if (!resourceObj) {
                resourceObj = Object.create(OutgoingResponse2.prototype);
                Object.defineProperty(resourceObj, symbolRscHandle, { writable: true, value: handle2 });
                Object.defineProperty(resourceObj, symbolRscRep, { writable: true, value: rep2 });
              } else {
                captureTable7.delete(rep2);
              }
              rscTableRemove(handleTable7, handle2);
              return resourceObj;
            }, "createResourceFn")
          }),
          4,
          4,
          1,
          ["i32"]
        ], ["err", _liftFlatVariant({
          caseMetas: [["DNS-timeout", null, 0, 0, 0, []], ["DNS-error", _liftFlatRecord({ fieldMetas: [[
            "rcode",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ], [
            "infoCode",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU16, 2, 2, 1, ["i32"]]
              ],
              variantSize32: 4,
              variantAlign32: 2,
              variantPayloadOffset32: 2,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            4,
            2
          ]], size32: 16, align32: 4 }), 16, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], ["destination-not-found", null, 0, 0, 0, []], ["destination-unavailable", null, 0, 0, 0, []], ["destination-IP-prohibited", null, 0, 0, 0, []], ["destination-IP-unroutable", null, 0, 0, 0, []], ["connection-refused", null, 0, 0, 0, []], ["connection-terminated", null, 0, 0, 0, []], ["connection-timeout", null, 0, 0, 0, []], ["connection-read-timeout", null, 0, 0, 0, []], ["connection-write-timeout", null, 0, 0, 0, []], ["connection-limit-reached", null, 0, 0, 0, []], ["TLS-protocol-error", null, 0, 0, 0, []], ["TLS-certificate-error", null, 0, 0, 0, []], ["TLS-alert-received", _liftFlatRecord({ fieldMetas: [[
            "alertId",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU8, 1, 1, 1, ["i32"]]
              ],
              variantSize32: 2,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            2,
            1
          ], [
            "alertMessage",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ]], size32: 16, align32: 4 }), 16, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], ["HTTP-request-denied", null, 0, 0, 0, []], ["HTTP-request-length-required", null, 0, 0, 0, []], [
            "HTTP-request-body-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU64, 8, 8, 1, ["i64"]]
              ],
              variantSize32: 16,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i64"]
            }),
            16,
            8,
            2,
            ["i32", "i64"]
          ], ["HTTP-request-method-invalid", null, 0, 0, 0, []], ["HTTP-request-URI-invalid", null, 0, 0, 0, []], ["HTTP-request-URI-too-long", null, 0, 0, 0, []], [
            "HTTP-request-header-section-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4,
            2,
            ["i32", "i32"]
          ], [
            "HTTP-request-header-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatRecord({ fieldMetas: [[
                  "fieldName",
                  _liftFlatOption({
                    caseMetas: [
                      ["none", null, 0, 0, 0, []],
                      ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
                    ],
                    variantSize32: 12,
                    variantAlign32: 4,
                    variantPayloadOffset32: 4,
                    variantFlatCount: 3,
                    variantPayloadFlatTypes: ["i32", "i32"]
                  }),
                  12,
                  4
                ], [
                  "fieldSize",
                  _liftFlatOption({
                    caseMetas: [
                      ["none", null, 0, 0, 0, []],
                      ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
                    ],
                    variantSize32: 8,
                    variantAlign32: 4,
                    variantPayloadOffset32: 4,
                    variantFlatCount: 2,
                    variantPayloadFlatTypes: ["i32"]
                  }),
                  8,
                  4
                ]], size32: 20, align32: 4 }), 20, 4, 5, ["i32", "i32", "i32", "i32", "i32"]]
              ],
              variantSize32: 24,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 6,
              variantPayloadFlatTypes: ["i32", "i32", "i32", "i32", "i32"]
            }),
            24,
            4,
            6,
            ["i32", "i32", "i32", "i32", "i32", "i32"]
          ], [
            "HTTP-request-trailer-section-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4,
            2,
            ["i32", "i32"]
          ], ["HTTP-request-trailer-size", _liftFlatRecord({ fieldMetas: [[
            "fieldName",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ], [
            "fieldSize",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4
          ]], size32: 20, align32: 4 }), 20, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], ["HTTP-response-incomplete", null, 0, 0, 0, []], [
            "HTTP-response-header-section-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4,
            2,
            ["i32", "i32"]
          ], ["HTTP-response-header-size", _liftFlatRecord({ fieldMetas: [[
            "fieldName",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ], [
            "fieldSize",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4
          ]], size32: 20, align32: 4 }), 20, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], [
            "HTTP-response-body-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU64, 8, 8, 1, ["i64"]]
              ],
              variantSize32: 16,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i64"]
            }),
            16,
            8,
            2,
            ["i32", "i64"]
          ], [
            "HTTP-response-trailer-section-size",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4,
            2,
            ["i32", "i32"]
          ], ["HTTP-response-trailer-size", _liftFlatRecord({ fieldMetas: [[
            "fieldName",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4
          ], [
            "fieldSize",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatU32, 4, 4, 1, ["i32"]]
              ],
              variantSize32: 8,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 2,
              variantPayloadFlatTypes: ["i32"]
            }),
            8,
            4
          ]], size32: 20, align32: 4 }), 20, 4, 5, ["i32", "i32", "i32", "i32", "i32"]], [
            "HTTP-response-transfer-coding",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4,
            3,
            ["i32", "i32", "i32"]
          ], [
            "HTTP-response-content-coding",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4,
            3,
            ["i32", "i32", "i32"]
          ], ["HTTP-response-timeout", null, 0, 0, 0, []], ["HTTP-upgrade-failed", null, 0, 0, 0, []], ["HTTP-protocol-error", null, 0, 0, 0, []], ["loop-detected", null, 0, 0, 0, []], ["configuration-error", null, 0, 0, 0, []], [
            "internal-error",
            _liftFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0, []],
                ["some", _liftFlatStringAny, 8, 4, 2, ["i32", "i32"]]
              ],
              variantSize32: 12,
              variantAlign32: 4,
              variantPayloadOffset32: 4,
              variantFlatCount: 3,
              variantPayloadFlatTypes: ["i32", "i32"]
            }),
            12,
            4,
            3,
            ["i32", "i32", "i32"]
          ]],
          variantSize32: 32,
          variantAlign32: 8,
          variantPayloadOffset32: 8,
          variantFlatCount: 7,
          variantPayloadFlatTypes: ["i32", "i64", "i32", "i32", "i32", "i32"]
        }), 32, 8, 7, ["i32", "i32", "i64", "i32", "i32", "i32", "i32"]]],
        variantSize32: 40,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 8,
        variantPayloadFlatTypes: ["i32", "i32", "i64", "i32", "i32", "i32", "i32"]
      })
    ],
    resultLowerFns: [],
    hasResultPointer: false,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline31
  }
);
var trampoline32 = _trampoline32.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 32,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline32.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 22), _liftFlatStringAny, _liftFlatList({
      elemLiftFn: _liftFlatList({
        elemLiftFn: _liftFlatU8,
        elemAlign32: 1,
        elemSize32: 1,
        typedArray: Uint8Array
      }),
      elemAlign32: 4,
      elemSize32: 8,
      typedArray: void 0
    })],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 2, 1, 1],
          ["err", _lowerFlatVariant({
            caseMetas: [["invalid-syntax", null, 0, 0, 0], ["forbidden", null, 0, 0, 0], ["immutable", null, 0, 0, 0]],
            variantSize32: 1,
            variantAlign32: 1,
            variantPayloadOffset32: 1,
            variantFlatCount: 1
          }), 2, 1, 1]
        ],
        variantSize32: 2,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline32
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 32,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline32.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 22), _liftFlatStringAny, _liftFlatList({
      elemLiftFn: _liftFlatList({
        elemLiftFn: _liftFlatU8,
        elemAlign32: 1,
        elemSize32: 1,
        typedArray: Uint8Array
      }),
      elemAlign32: 4,
      elemSize32: 8,
      typedArray: void 0
    })],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 2, 1, 1],
          ["err", _lowerFlatVariant({
            caseMetas: [["invalid-syntax", null, 0, 0, 0], ["forbidden", null, 0, 0, 0], ["immutable", null, 0, 0, 0]],
            variantSize32: 1,
            variantAlign32: 1,
            variantPayloadOffset32: 1,
            variantFlatCount: 1
          }), 2, 1, 1]
        ],
        variantSize32: 2,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline32
  }
);
var trampoline34 = _symmetricSyncGuestCallEnter;
var trampoline36 = _symmetricSyncGuestCallExit;
var trampoline38 = _trampoline38.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 38,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline38.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({
      elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatStringAny, 8, 4], [_lowerFlatStringAny, 8, 4]], size32: 16, align32: 4 }),
      elemSize32: 16,
      elemAlign32: 4
    })],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline38
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 38,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline38.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({
      elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatStringAny, 8, 4], [_lowerFlatStringAny, 8, 4]], size32: 16, align32: 4 }),
      elemSize32: 16,
      elemAlign32: 4
    })],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline38
  }
);
var trampoline39 = _trampoline39.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 39,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline39.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatFlags({ names: ["read", "write", "fileIntegritySync", "dataIntegritySync", "requestedWriteSync", "mutateDirectory"], size32: 1, align32: 1, intSizeBytes: 1 }), 2, 1, 1],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            2,
            1,
            1
          ]
        ],
        variantSize32: 2,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline39
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 39,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline39.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatFlags({ names: ["read", "write", "fileIntegritySync", "dataIntegritySync", "requestedWriteSync", "mutateDirectory"], size32: 1, align32: 1, intSizeBytes: 1 }), 2, 1, 1],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            2,
            1,
            1
          ]
        ],
        variantSize32: 2,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline39
  }
);
var trampoline40 = _trampoline40.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 40,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline40.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 23)],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          [
            "some",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            1,
            1,
            1
          ]
        ],
        variantSize32: 2,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline40
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 40,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline40.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 23)],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          [
            "some",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            1,
            1,
            1
          ]
        ],
        variantSize32: 2,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline40
  }
);
var trampoline41 = _trampoline41.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 41,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline41.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatFlags({ names: ["symlinkFollow"], size32: 1, align32: 1, intSizeBytes: 1 }), _liftFlatStringAny],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatRecord({ fieldMetas: [[
            "type",
            _lowerFlatEnum({
              caseMetas: [["unknown", null, 1, 1, 1], ["block-device", null, 1, 1, 1], ["character-device", null, 1, 1, 1], ["directory", null, 1, 1, 1], ["fifo", null, 1, 1, 1], ["symbolic-link", null, 1, 1, 1], ["regular-file", null, 1, 1, 1], ["socket", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            1,
            1
          ], ["linkCount", _lowerFlatU64, 8, 8], ["size", _lowerFlatU64, 8, 8], [
            "dataAccessTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ], [
            "dataModificationTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ], [
            "statusChangeTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ]], size32: 96, align32: 8 }), 104, 8, 8],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            104,
            8,
            8
          ]
        ],
        variantSize32: 104,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 13
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline41
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 41,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline41.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatFlags({ names: ["symlinkFollow"], size32: 1, align32: 1, intSizeBytes: 1 }), _liftFlatStringAny],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatRecord({ fieldMetas: [[
            "type",
            _lowerFlatEnum({
              caseMetas: [["unknown", null, 1, 1, 1], ["block-device", null, 1, 1, 1], ["character-device", null, 1, 1, 1], ["directory", null, 1, 1, 1], ["fifo", null, 1, 1, 1], ["symbolic-link", null, 1, 1, 1], ["regular-file", null, 1, 1, 1], ["socket", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            1,
            1
          ], ["linkCount", _lowerFlatU64, 8, 8], ["size", _lowerFlatU64, 8, 8], [
            "dataAccessTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ], [
            "dataModificationTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ], [
            "statusChangeTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ]], size32: 96, align32: 8 }), 104, 8, 8],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            104,
            8,
            8
          ]
        ],
        variantSize32: 104,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 13
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline41
  }
);
var trampoline42 = _trampoline42.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 42,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline42.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatFlags({ names: ["symlinkFollow"], size32: 1, align32: 1, intSizeBytes: 1 }), _liftFlatStringAny, _liftFlatFlags({ names: ["create", "directory", "exclusive", "truncate"], size32: 1, align32: 1, intSizeBytes: 1 }), _liftFlatFlags({ names: ["read", "write", "fileIntegritySync", "dataIntegritySync", "requestedWriteSync", "mutateDirectory"], size32: 1, align32: 1, intSizeBytes: 1 })],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Descriptor(obj) {
              if (!(obj instanceof Descriptor2)) {
                throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt12;
                captureTable12.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable12, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_Descriptor")
          }), 8, 4, 4],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            8,
            4,
            4
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline42
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 42,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline42.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatFlags({ names: ["symlinkFollow"], size32: 1, align32: 1, intSizeBytes: 1 }), _liftFlatStringAny, _liftFlatFlags({ names: ["create", "directory", "exclusive", "truncate"], size32: 1, align32: 1, intSizeBytes: 1 }), _liftFlatFlags({ names: ["read", "write", "fileIntegritySync", "dataIntegritySync", "requestedWriteSync", "mutateDirectory"], size32: 1, align32: 1, intSizeBytes: 1 })],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Descriptor2(obj) {
              if (!(obj instanceof Descriptor2)) {
                throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt12;
                captureTable12.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable12, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_Descriptor")
          }), 8, 4, 4],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            8,
            4,
            4
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline42
  }
);
var trampoline43 = _trampoline43.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 43,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline43.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_InputStream5(obj) {
              if (!(obj instanceof InputStream2)) {
                throw new TypeError('Resource error: Not a valid "InputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt1;
                captureTable1.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable1, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_InputStream")
          }), 8, 4, 4],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            8,
            4,
            4
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline43
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 43,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline43.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_InputStream6(obj) {
              if (!(obj instanceof InputStream2)) {
                throw new TypeError('Resource error: Not a valid "InputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt1;
                captureTable1.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable1, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_InputStream")
          }), 8, 4, 4],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            8,
            4,
            4
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline43
  }
);
var trampoline44 = _trampoline44.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 44,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline44.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream7(obj) {
              if (!(obj instanceof OutputStream2)) {
                throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt2;
                captureTable2.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable2, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_OutputStream")
          }), 8, 4, 4],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            8,
            4,
            4
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline44
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 44,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline44.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream8(obj) {
              if (!(obj instanceof OutputStream2)) {
                throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt2;
                captureTable2.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable2, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_OutputStream")
          }), 8, 4, 4],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            8,
            4,
            4
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline44
  }
);
var trampoline45 = _trampoline45.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 45,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline45.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream9(obj) {
              if (!(obj instanceof OutputStream2)) {
                throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt2;
                captureTable2.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable2, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_OutputStream")
          }), 8, 4, 4],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            8,
            4,
            4
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline45
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 45,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline45.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_OutputStream10(obj) {
              if (!(obj instanceof OutputStream2)) {
                throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt2;
                captureTable2.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable2, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_OutputStream")
          }), 8, 4, 4],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            8,
            4,
            4
          ]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline45
  }
);
var trampoline46 = _trampoline46.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 46,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline46.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          [
            "ok",
            _lowerFlatEnum({
              caseMetas: [["unknown", null, 1, 1, 1], ["block-device", null, 1, 1, 1], ["character-device", null, 1, 1, 1], ["directory", null, 1, 1, 1], ["fifo", null, 1, 1, 1], ["symbolic-link", null, 1, 1, 1], ["regular-file", null, 1, 1, 1], ["socket", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            2,
            1,
            1
          ],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            2,
            1,
            1
          ]
        ],
        variantSize32: 2,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline46
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 46,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline46.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          [
            "ok",
            _lowerFlatEnum({
              caseMetas: [["unknown", null, 1, 1, 1], ["block-device", null, 1, 1, 1], ["character-device", null, 1, 1, 1], ["directory", null, 1, 1, 1], ["fifo", null, 1, 1, 1], ["symbolic-link", null, 1, 1, 1], ["regular-file", null, 1, 1, 1], ["socket", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            2,
            1,
            1
          ],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            2,
            1,
            1
          ]
        ],
        variantSize32: 2,
        variantAlign32: 1,
        variantPayloadOffset32: 1,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline46
  }
);
var trampoline47 = _trampoline47.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 47,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline47.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatRecord({ fieldMetas: [[
            "type",
            _lowerFlatEnum({
              caseMetas: [["unknown", null, 1, 1, 1], ["block-device", null, 1, 1, 1], ["character-device", null, 1, 1, 1], ["directory", null, 1, 1, 1], ["fifo", null, 1, 1, 1], ["symbolic-link", null, 1, 1, 1], ["regular-file", null, 1, 1, 1], ["socket", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            1,
            1
          ], ["linkCount", _lowerFlatU64, 8, 8], ["size", _lowerFlatU64, 8, 8], [
            "dataAccessTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ], [
            "dataModificationTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ], [
            "statusChangeTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ]], size32: 96, align32: 8 }), 104, 8, 8],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            104,
            8,
            8
          ]
        ],
        variantSize32: 104,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 13
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline47
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 47,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline47.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatRecord({ fieldMetas: [[
            "type",
            _lowerFlatEnum({
              caseMetas: [["unknown", null, 1, 1, 1], ["block-device", null, 1, 1, 1], ["character-device", null, 1, 1, 1], ["directory", null, 1, 1, 1], ["fifo", null, 1, 1, 1], ["symbolic-link", null, 1, 1, 1], ["regular-file", null, 1, 1, 1], ["socket", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            1,
            1
          ], ["linkCount", _lowerFlatU64, 8, 8], ["size", _lowerFlatU64, 8, 8], [
            "dataAccessTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ], [
            "dataModificationTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ], [
            "statusChangeTimestamp",
            _lowerFlatOption({
              caseMetas: [
                ["none", null, 0, 0, 0],
                ["some", _lowerFlatRecord({ fieldMetas: [["seconds", _lowerFlatU64, 8, 8], ["nanoseconds", _lowerFlatU32, 4, 4]], size32: 16, align32: 8 }), 16, 8, 2]
              ],
              variantSize32: 24,
              variantAlign32: 8,
              variantPayloadOffset32: 8,
              variantFlatCount: 3
            }),
            24,
            8
          ]], size32: 96, align32: 8 }), 104, 8, 8],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            104,
            8,
            8
          ]
        ],
        variantSize32: 104,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 13
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline47
  }
);
var trampoline48 = _trampoline48.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 48,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline48.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatRecord({ fieldMetas: [["lower", _lowerFlatU64, 8, 8], ["upper", _lowerFlatU64, 8, 8]], size32: 16, align32: 8 }), 24, 8, 8],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            24,
            8,
            8
          ]
        ],
        variantSize32: 24,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline48
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 48,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline48.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatRecord({ fieldMetas: [["lower", _lowerFlatU64, 8, 8], ["upper", _lowerFlatU64, 8, 8]], size32: 16, align32: 8 }), 24, 8, 8],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            24,
            8,
            8
          ]
        ],
        variantSize32: 24,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline48
  }
);
var trampoline49 = _trampoline49.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 49,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline49.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatFlags({ names: ["symlinkFollow"], size32: 1, align32: 1, intSizeBytes: 1 }), _liftFlatStringAny],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatRecord({ fieldMetas: [["lower", _lowerFlatU64, 8, 8], ["upper", _lowerFlatU64, 8, 8]], size32: 16, align32: 8 }), 24, 8, 8],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            24,
            8,
            8
          ]
        ],
        variantSize32: 24,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline49
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 49,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline49.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 25), _liftFlatFlags({ names: ["symlinkFollow"], size32: 1, align32: 1, intSizeBytes: 1 }), _liftFlatStringAny],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatRecord({ fieldMetas: [["lower", _lowerFlatU64, 8, 8], ["upper", _lowerFlatU64, 8, 8]], size32: 16, align32: 8 }), 24, 8, 8],
          [
            "err",
            _lowerFlatEnum({
              caseMetas: [["access", null, 1, 1, 1], ["would-block", null, 1, 1, 1], ["already", null, 1, 1, 1], ["bad-descriptor", null, 1, 1, 1], ["busy", null, 1, 1, 1], ["deadlock", null, 1, 1, 1], ["quota", null, 1, 1, 1], ["exist", null, 1, 1, 1], ["file-too-large", null, 1, 1, 1], ["illegal-byte-sequence", null, 1, 1, 1], ["in-progress", null, 1, 1, 1], ["interrupted", null, 1, 1, 1], ["invalid", null, 1, 1, 1], ["io", null, 1, 1, 1], ["is-directory", null, 1, 1, 1], ["loop", null, 1, 1, 1], ["too-many-links", null, 1, 1, 1], ["message-size", null, 1, 1, 1], ["name-too-long", null, 1, 1, 1], ["no-device", null, 1, 1, 1], ["no-entry", null, 1, 1, 1], ["no-lock", null, 1, 1, 1], ["insufficient-memory", null, 1, 1, 1], ["insufficient-space", null, 1, 1, 1], ["not-directory", null, 1, 1, 1], ["not-empty", null, 1, 1, 1], ["not-recoverable", null, 1, 1, 1], ["unsupported", null, 1, 1, 1], ["no-tty", null, 1, 1, 1], ["no-such-device", null, 1, 1, 1], ["overflow", null, 1, 1, 1], ["not-permitted", null, 1, 1, 1], ["pipe", null, 1, 1, 1], ["read-only", null, 1, 1, 1], ["invalid-seek", null, 1, 1, 1], ["text-file-busy", null, 1, 1, 1], ["cross-device", null, 1, 1, 1]],
              variantSize32: 1,
              variantAlign32: 1,
              variantPayloadOffset32: 1,
              variantFlatCount: 1
            }),
            24,
            8,
            8
          ]
        ],
        variantSize32: 24,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline49
  }
);
var trampoline50 = _trampoline50.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 50,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline50.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 14), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatList({
            elemLowerFn: _lowerFlatU8,
            elemSize32: 1,
            elemAlign32: 1
          }), 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$15(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline50
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 50,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline50.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 14), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatList({
            elemLowerFn: _lowerFlatU8,
            elemSize32: 1,
            elemAlign32: 1
          }), 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$16(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline50
  }
);
var trampoline51 = _trampoline51.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 51,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline51.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 14), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatList({
            elemLowerFn: _lowerFlatU8,
            elemSize32: 1,
            elemAlign32: 1
          }), 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$17(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline51
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 51,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline51.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 14), _liftFlatU64],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatList({
            elemLowerFn: _lowerFlatU8,
            elemSize32: 1,
            elemAlign32: 1
          }), 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$18(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline51
  }
);
var trampoline52 = _trampoline52.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 52,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline52.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 15)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatU64, 16, 8, 8],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$19(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 16, 8, 8]
        ],
        variantSize32: 16,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline52
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 52,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline52.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 15)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", _lowerFlatU64, 16, 8, 8],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$110(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 16, 8, 8]
        ],
        variantSize32: 16,
        variantAlign32: 8,
        variantPayloadOffset32: 8,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline52
  }
);
var trampoline53 = _trampoline53.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 53,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline53.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 15), _liftFlatList({
      elemLiftFn: _liftFlatU8,
      elemAlign32: 1,
      elemSize32: 1,
      typedArray: Uint8Array
    })],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$111(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline53
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 53,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline53.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 15), _liftFlatList({
      elemLiftFn: _liftFlatU8,
      elemAlign32: 1,
      elemSize32: 1,
      typedArray: Uint8Array
    })],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$112(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline53
  }
);
var trampoline54 = _trampoline54.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 54,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline54.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 15)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$113(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline54
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 54,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline54.manuallyAsync,
    paramLiftFns: [_liftFlatBorrow.bind(null, 15)],
    resultLowerFns: [
      _lowerFlatResult({
        caseMetas: [
          ["ok", null, 12, 4, 4],
          ["err", _lowerFlatVariant({
            caseMetas: [["last-operation-failed", _lowerFlatOwn({
              componentIdx: 3,
              lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Error$114(obj) {
                if (!(obj instanceof Error$1)) {
                  throw new TypeError('Resource error: Not a valid "Error$1" resource.');
                }
                let handle2 = obj[symbolRscHandle];
                if (!handle2) {
                  const rep2 = obj[symbolRscRep] || ++captureCnt0;
                  captureTable0.set(rep2, obj);
                  handle2 = rscTableCreateOwn(handleTable0, rep2);
                }
                return handle2;
              }, "lowerImportedOwnedHost_Error$1")
            }), 4, 4, 1], ["closed", null, 0, 0, 0]],
            variantSize32: 8,
            variantAlign32: 4,
            variantPayloadOffset32: 4,
            variantFlatCount: 2
          }), 12, 4, 4]
        ],
        variantSize32: 12,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 3
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline54
  }
);
var trampoline55 = _trampoline55.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 55,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline55.manuallyAsync,
    paramLiftFns: [_liftFlatU64],
    resultLowerFns: [_lowerFlatList({
      elemLowerFn: _lowerFlatU8,
      elemSize32: 1,
      elemAlign32: 1
    })],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline55
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 55,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline55.manuallyAsync,
    paramLiftFns: [_liftFlatU64],
    resultLowerFns: [_lowerFlatList({
      elemLowerFn: _lowerFlatU8,
      elemSize32: 1,
      elemAlign32: 1
    })],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline55
  }
);
var trampoline56 = _trampoline56.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 56,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline56.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({
      elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatOwn({
        componentIdx: 3,
        lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Descriptor3(obj) {
          if (!(obj instanceof Descriptor2)) {
            throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
          }
          let handle2 = obj[symbolRscHandle];
          if (!handle2) {
            const rep2 = obj[symbolRscRep] || ++captureCnt12;
            captureTable12.set(rep2, obj);
            handle2 = rscTableCreateOwn(handleTable12, rep2);
          }
          return handle2;
        }, "lowerImportedOwnedHost_Descriptor")
      }), 4, 4], [_lowerFlatStringAny, 8, 4]], size32: 12, align32: 4 }),
      elemSize32: 12,
      elemAlign32: 4
    })],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline56
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 56,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline56.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [_lowerFlatList({
      elemLowerFn: _lowerFlatTuple({ elemLowerMetas: [[_lowerFlatOwn({
        componentIdx: 3,
        lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_Descriptor4(obj) {
          if (!(obj instanceof Descriptor2)) {
            throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
          }
          let handle2 = obj[symbolRscHandle];
          if (!handle2) {
            const rep2 = obj[symbolRscRep] || ++captureCnt12;
            captureTable12.set(rep2, obj);
            handle2 = rscTableCreateOwn(handleTable12, rep2);
          }
          return handle2;
        }, "lowerImportedOwnedHost_Descriptor")
      }), 4, 4], [_lowerFlatStringAny, 8, 4]], size32: 12, align32: 4 }),
      elemSize32: 12,
      elemAlign32: 4
    })],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: /* @__PURE__ */ __name(() => realloc1, "getReallocFn"),
    importFn: _trampoline56
  }
);
var trampoline57 = _trampoline57.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 57,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline57.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          ["some", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_TerminalInput(obj) {
              if (!(obj instanceof TerminalInput2)) {
                throw new TypeError('Resource error: Not a valid "TerminalInput" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt10;
                captureTable10.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable10, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_TerminalInput")
          }), 4, 4, 1]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline57
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 57,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline57.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          ["some", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_TerminalInput2(obj) {
              if (!(obj instanceof TerminalInput2)) {
                throw new TypeError('Resource error: Not a valid "TerminalInput" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt10;
                captureTable10.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable10, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_TerminalInput")
          }), 4, 4, 1]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline57
  }
);
var trampoline58 = _trampoline58.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 58,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline58.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          ["some", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_TerminalOutput(obj) {
              if (!(obj instanceof TerminalOutput2)) {
                throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt11;
                captureTable11.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable11, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_TerminalOutput")
          }), 4, 4, 1]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline58
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 58,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline58.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          ["some", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_TerminalOutput2(obj) {
              if (!(obj instanceof TerminalOutput2)) {
                throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt11;
                captureTable11.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable11, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_TerminalOutput")
          }), 4, 4, 1]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline58
  }
);
var trampoline59 = _trampoline59.manuallyAsync ? new WebAssembly.Suspending(_suspendingImport(3, _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 59,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline59.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          ["some", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_TerminalOutput3(obj) {
              if (!(obj instanceof TerminalOutput2)) {
                throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt11;
                captureTable11.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable11, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_TerminalOutput")
          }), 4, 4, 1]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline59
  }
))) : _lowerImportBackwardsCompat.bind(
  null,
  {
    trampolineIdx: 59,
    componentIdx: 3,
    isAsync: false,
    isManualAsync: _trampoline59.manuallyAsync,
    paramLiftFns: [],
    resultLowerFns: [
      _lowerFlatOption({
        caseMetas: [
          ["none", null, 0, 0, 0],
          ["some", _lowerFlatOwn({
            componentIdx: 3,
            lowerFn: /* @__PURE__ */ __name(function lowerImportedOwnedHost_TerminalOutput4(obj) {
              if (!(obj instanceof TerminalOutput2)) {
                throw new TypeError('Resource error: Not a valid "TerminalOutput" resource.');
              }
              let handle2 = obj[symbolRscHandle];
              if (!handle2) {
                const rep2 = obj[symbolRscRep] || ++captureCnt11;
                captureTable11.set(rep2, obj);
                handle2 = rscTableCreateOwn(handleTable11, rep2);
              }
              return handle2;
            }, "lowerImportedOwnedHost_TerminalOutput")
          }), 4, 4, 1]
        ],
        variantSize32: 8,
        variantAlign32: 4,
        variantPayloadOffset32: 4,
        variantFlatCount: 2
      })
    ],
    hasResultPointer: true,
    funcTypeIsAsync: false,
    getCallbackFn: /* @__PURE__ */ __name(() => null, "getCallbackFn"),
    getPostReturnFn: /* @__PURE__ */ __name(() => null, "getPostReturnFn"),
    isCancellable: false,
    memoryIdx: 0,
    stringEncoding: "utf8",
    getMemoryFn: /* @__PURE__ */ __name(() => memory0, "getMemoryFn"),
    getReallocFn: void 0,
    importFn: _trampoline59
  }
);
function trampoline33(rep2) {
  throw new TypeError("Trap");
}
__name(trampoline33, "trampoline33");
function trampoline35(from_ptr, len, to_ptr) {
  new Uint8Array(memory1.buffer, to_ptr, len).set(new Uint8Array(memory0.buffer, from_ptr, len));
}
__name(trampoline35, "trampoline35");
function trampoline37(from_ptr, len, to_ptr) {
  new Uint8Array(memory0.buffer, to_ptr, len).set(new Uint8Array(memory1.buffer, from_ptr, len));
}
__name(trampoline37, "trampoline37");
var $init = (() => {
  let gen = (/* @__PURE__ */ __name((function* _initGenerator() {
    const module0 = fetchCompile(new URL("./app.core.wasm", import.meta.url));
    const module1 = fetchCompile(new URL("./app.core2.wasm", import.meta.url));
    const module2 = fetchCompile(new URL("./app.core3.wasm", import.meta.url));
    const module3 = base64Compile("AGFzbQEAAAABhQESYAN/fn8AYAR/f39/AGACf38AYAR/f39/AGAJf39/f35/f39/AGAGf39/f39/AGAEf39/fwBgAn9/AX9gAX8Bf2ADf39/AX9gBH9/f38Bf2AFf39/f38Bf2AJf39/f39+fn9/AX9gAX8AYAF/AGAFf39/f38AYAd/f39/f39/AGACfn8AAzEwAAECAgMCAgICBAUGBwcHCAcHBwkKCgsMDQ4CAg8QAAACAgICDwAAAgECAREODg4OBAUBcAEwMAfyATEBMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoCMTEACwIxMgAMAjEzAA0CMTQADgIxNQAPAjE2ABACMTcAEQIxOAASAjE5ABMCMjAAFAIyMQAVAjIyABYCMjMAFwIyNAAYAjI1ABkCMjYAGgIyNwAbAjI4ABwCMjkAHQIzMAAeAjMxAB8CMzIAIAIzMwAhAjM0ACICMzUAIwIzNgAkAjM3ACUCMzgAJgIzOQAnAjQwACgCNDEAKQI0MgAqAjQzACsCNDQALAI0NQAtAjQ2AC4CNDcALwgkaW1wb3J0cwEACpsFMA0AIAAgASACQQARAAALDwAgACABIAIgA0EBEQEACwsAIAAgAUECEQIACwsAIAAgAUEDEQIACw8AIAAgASACIANBBBEDAAsLACAAIAFBBRECAAsLACAAIAFBBhECAAsLACAAIAFBBxECAAsLACAAIAFBCBECAAsZACAAIAEgAiADIAQgBSAGIAcgCEEJEQQACxMAIAAgASACIAMgBCAFQQoRBQALDwAgACABIAIgA0ELEQYACwsAIAAgAUEMEQcACwsAIAAgAUENEQcACwsAIAAgAUEOEQcACwkAIABBDxEIAAsLACAAIAFBEBEHAAsLACAAIAFBEREHAAsLACAAIAFBEhEHAAsNACAAIAEgAkETEQkACw8AIAAgASACIANBFBEKAAsPACAAIAEgAiADQRURCgALEQAgACABIAIgAyAEQRYRCwALGQAgACABIAIgAyAEIAUgBiAHIAhBFxEMAAsJACAAQRgRDQALCQAgAEEZEQ4ACwsAIAAgAUEaEQIACwsAIAAgAUEbEQIACxEAIAAgASACIAMgBEEcEQ8ACxUAIAAgASACIAMgBCAFIAZBHREQAAsNACAAIAEgAkEeEQAACw0AIAAgASACQR8RAAALCwAgACABQSARAgALCwAgACABQSERAgALCwAgACABQSIRAgALCwAgACABQSMRAgALEQAgACABIAIgAyAEQSQRDwALDQAgACABIAJBJREAAAsNACAAIAEgAkEmEQAACwsAIAAgAUEnEQIACw8AIAAgASACIANBKBEBAAsLACAAIAFBKRECAAsPACAAIAEgAiADQSoRAQALCwAgACABQSsREQALCQAgAEEsEQ4ACwkAIABBLREOAAsJACAAQS4RDgALCQAgAEEvEQ4ACwAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjI3LjEAlhYEbmFtZQATEndpdC1jb21wb25lbnQ6c2hpbQH5FTAAOWluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMTItW21ldGhvZF1pbnB1dC1zdHJlYW0ucmVhZAFOaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4xMi1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctd3JpdGUtYW5kLWZsdXNoAjxpbmRpcmVjdC13YXNpOmh0dHAvdHlwZXNAMC4yLjEyLVttZXRob2RdaW5jb21pbmctYm9keS5zdHJlYW0DO2luZGlyZWN0LXdhc2k6aHR0cC90eXBlc0AwLjIuMTItW21ldGhvZF1vdXRnb2luZy1ib2R5LndyaXRlBDxpbmRpcmVjdC13YXNpOmh0dHAvdHlwZXNAMC4yLjEyLVtzdGF0aWNdb3V0Z29pbmctYm9keS5maW5pc2gFSGluZGlyZWN0LXdhc2k6aHR0cC90eXBlc0AwLjIuMTItW21ldGhvZF1pbmNvbWluZy1yZXF1ZXN0LnBhdGgtd2l0aC1xdWVyeQY/aW5kaXJlY3Qtd2FzaTpodHRwL3R5cGVzQDAuMi4xMi1bbWV0aG9kXWluY29taW5nLXJlcXVlc3QubWV0aG9kB0BpbmRpcmVjdC13YXNpOmh0dHAvdHlwZXNAMC4yLjEyLVttZXRob2RdaW5jb21pbmctcmVxdWVzdC5jb25zdW1lCD5pbmRpcmVjdC13YXNpOmh0dHAvdHlwZXNAMC4yLjEyLVttZXRob2Rdb3V0Z29pbmctcmVzcG9uc2UuYm9keQk9aW5kaXJlY3Qtd2FzaTpodHRwL3R5cGVzQDAuMi4xMi1bc3RhdGljXXJlc3BvbnNlLW91dHBhcmFtLnNldAoyaW5kaXJlY3Qtd2FzaTpodHRwL3R5cGVzQDAuMi4xMi1bbWV0aG9kXWZpZWxkcy5zZXQLLGluZGlyZWN0LWxlcHRvbG06YXBpL21vZGVscy1wcm9jZXNzLWFkZC1pdGVtDCdhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXJhbmRvbV9nZXQNKGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9nZXQOLmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9zaXplc19nZXQPJWFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfY2xvc2UQKmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfZmRzdGF0X2dldBEsYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9maWxlc3RhdF9nZXQSK2FkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcHJlc3RhdF9nZXQTMGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZmRfcHJlc3RhdF9kaXJfbmFtZRQkYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1mZF9yZWFkFSVhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3dyaXRlFi5hZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXBhdGhfZmlsZXN0YXRfZ2V0FyZhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXBhdGhfb3BlbhgmYWRhcHQtd2FzaV9zbmFwc2hvdF9wcmV2aWV3MS1wcm9jX2V4aXQZM2luZGlyZWN0LXdhc2k6Y2xpL2Vudmlyb25tZW50QDAuMi4zLWdldC1lbnZpcm9ubWVudBpBaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5nZXQtZmxhZ3MbOmluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1maWxlc3lzdGVtLWVycm9yLWNvZGUcP2luZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3Iuc3RhdC1hdB0/aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5vcGVuLWF0HkdpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLnJlYWQtdmlhLXN0cmVhbR9IaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci53cml0ZS12aWEtc3RyZWFtIElpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLmFwcGVuZC12aWEtc3RyZWFtIUBpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLmdldC10eXBlIjxpbmRpcmVjdC13YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMtW21ldGhvZF1kZXNjcmlwdG9yLnN0YXQjRWluZGlyZWN0LXdhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMy1bbWV0aG9kXWRlc2NyaXB0b3IubWV0YWRhdGEtaGFzaCRIaW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zLVttZXRob2RdZGVzY3JpcHRvci5tZXRhZGF0YS1oYXNoLWF0JThpbmRpcmVjdC13YXNpOmlvL3N0cmVhbXNAMC4yLjMtW21ldGhvZF1pbnB1dC1zdHJlYW0ucmVhZCZBaW5kaXJlY3Qtd2FzaTppby9zdHJlYW1zQDAuMi4zLVttZXRob2RdaW5wdXQtc3RyZWFtLmJsb2NraW5nLXJlYWQnQGluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMy1bbWV0aG9kXW91dHB1dC1zdHJlYW0uY2hlY2std3JpdGUoOmluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMy1bbWV0aG9kXW91dHB1dC1zdHJlYW0ud3JpdGUpQ2luZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMy1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctZmx1c2gqTWluZGlyZWN0LXdhc2k6aW8vc3RyZWFtc0AwLjIuMy1bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctd3JpdGUtYW5kLWZsdXNoKzJpbmRpcmVjdC13YXNpOnJhbmRvbS9yYW5kb21AMC4yLjMtZ2V0LXJhbmRvbS1ieXRlcyw3aW5kaXJlY3Qtd2FzaTpmaWxlc3lzdGVtL3ByZW9wZW5zQDAuMi4yLWdldC1kaXJlY3Rvcmllcy05aW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3RkaW5AMC4yLjMtZ2V0LXRlcm1pbmFsLXN0ZGluLjtpbmRpcmVjdC13YXNpOmNsaS90ZXJtaW5hbC1zdGRvdXRAMC4yLjMtZ2V0LXRlcm1pbmFsLXN0ZG91dC87aW5kaXJlY3Qtd2FzaTpjbGkvdGVybWluYWwtc3RkZXJyQDAuMi4zLWdldC10ZXJtaW5hbC1zdGRlcnI");
    const module4 = base64Compile("AGFzbQEAAAABhQESYAN/fn8AYAR/f39/AGACf38AYAR/f39/AGAJf39/f35/f39/AGAGf39/f39/AGAEf39/fwBgAn9/AX9gAX8Bf2ADf39/AX9gBH9/f38Bf2AFf39/f38Bf2AJf39/f39+fn9/AX9gAX8AYAF/AGAFf39/f38AYAd/f39/f39/AGACfn8AAqYCMQABMAAAAAExAAEAATIAAgABMwACAAE0AAMAATUAAgABNgACAAE3AAIAATgAAgABOQAEAAIxMAAFAAIxMQAGAAIxMgAHAAIxMwAHAAIxNAAHAAIxNQAIAAIxNgAHAAIxNwAHAAIxOAAHAAIxOQAJAAIyMAAKAAIyMQAKAAIyMgALAAIyMwAMAAIyNAANAAIyNQAOAAIyNgACAAIyNwACAAIyOAAPAAIyOQAQAAIzMAAAAAIzMQAAAAIzMgACAAIzMwACAAIzNAACAAIzNQACAAIzNgAPAAIzNwAAAAIzOAAAAAIzOQACAAI0MAABAAI0MQACAAI0MgABAAI0MwARAAI0NAAOAAI0NQAOAAI0NgAOAAI0NwAOAAgkaW1wb3J0cwFwATAwCTYBAEEACzAAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8ALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIyNy4xABwEbmFtZQAVFHdpdC1jb21wb25lbnQ6Zml4dXBz");
    const module5 = base64Compile("AGFzbQEAAAABNAlgBH9/f38Bf2ADf39/AX9gAX8AYAR/f39/AGADf39/AGAAAGAAAX9gA39/fwBgA39/fwAC7gIQBWZsYWdzCWluc3RhbmNlMQN/AQZtZW1vcnkCbTACAAAHcmVhbGxvYwJmMAAABWZsYWdzCWluc3RhbmNlMwN/AQdyZWFsbG9jAmYxAAAGY2FsbGVlCGFkYXB0ZXIwAAELcG9zdF9yZXR1cm4IYWRhcHRlcjAAAgdydW50aW1lBHRyYXAAAghpbnN0YW5jZQ50YXNrX21heV9ibG9jawN/AQVhc3luYw9lbnRlci1zeW5jLWNhbGwABAl0cmFuc2NvZGUbdXRmOC10by11dGY4IChtZW0xID0+IG1lbTApAAQFYXN5bmMOZXhpdC1zeW5jLWNhbGwABQl0cmFuc2NvZGUbdXRmOC10by11dGY4IChtZW0wID0+IG1lbTEpAAQIYXVnbWVudHMPbWVtMSBNZW1vcnlTaXplAAYIYXVnbWVudHMObWVtMSBJMzJTdG9yZTgABwhhdWdtZW50cw1tZW0xIEkzMlN0b3JlAAgDAgEDBwwBCGFkYXB0ZXIwAAwKlAQBkQQBCH8CQCMBIgQNAEEXEAQACyMCIQVBACQCQQNBAEEBEAUjACEGQQAkACAAIAEhByEIAkACQBAJrUIQhiAIrSAHrXxaDQELQR4QBAALIAdB/////wdLBEBBHhAEAAsgByIJIQpBAEEAQQEgChAAIQsCQAJAPwCtQhCGIAutIAqtfFoNAQtBHhAEAAsgCCAHIAsQBiALIAkgAiAGJAAQAiEGEAdBACQBIAZBA3EEQEEhEAQACwJAAkA/AK1CEIYgBq1BFK18Wg0BC0EBEAQACyADQQNxBEBBIRAEAAsCQAJAEAmtQhCGIAOtQRStfFoNAQtBARAEAAsgA0EBQQAgBi0AABtBABAKIAYoAgQgBigCCCEJIQsCQAJAPwCtQhCGIAutIAmtfFoNAQtBHhAEAAsgCUH/////B0sEQEEeEAQACyAJIgchCEEAQQBBASAIEAEhCgJAAkAQCa1CEIYgCq0gCK18Wg0BC0EeEAQACyALIAkgChAIIAMgCkEEEAsgAyAHQQgQCyAGKAIMIAYoAhAhByEKAkACQD8ArUIQhiAKrSAHrXxaDQELQR4QBAALIAdB/////wdLBEBBHhAEAAsgByIJIQtBAEEAQQEgCxABIQgCQAJAEAmtQhCGIAitIAutfFoNAQtBHhAEAAsgCiAHIAgQCCADIAhBDBALIAMgCUEQEAsgBCQBIAYQAyAFJAIL");
    const instanceFlags1 = new WebAssembly.Global({ value: "i32", mutable: true }, 1);
    INSTANCE_FLAGS.set(1, instanceFlags1);
    const instanceFlags3 = new WebAssembly.Global({ value: "i32", mutable: true }, 1);
    INSTANCE_FLAGS.set(3, instanceFlags3);
    ({ exports: exports0 } = yield instantiateCore(yield module0));
    ({ exports: exports1 } = yield instantiateCore(yield module3));
    ({ exports: exports2 } = yield instantiateCore(yield module1, {
      "leptolm:api/models": {
        "process-add-item": exports1["11"]
      },
      "wasi:http/types@0.2.12": {
        "[constructor]fields": trampoline11,
        "[constructor]outgoing-response": trampoline10,
        "[method]fields.set": exports1["10"],
        "[method]incoming-body.stream": exports1["2"],
        "[method]incoming-request.consume": exports1["7"],
        "[method]incoming-request.method": exports1["6"],
        "[method]incoming-request.path-with-query": exports1["5"],
        "[method]outgoing-body.write": exports1["3"],
        "[method]outgoing-response.body": exports1["8"],
        "[method]outgoing-response.set-status-code": trampoline9,
        "[resource-drop]fields": _guardMayLeave(3, trampoline12),
        "[resource-drop]future-trailers": _guardMayLeave(3, trampoline4),
        "[resource-drop]incoming-body": _guardMayLeave(3, trampoline2),
        "[resource-drop]incoming-request": _guardMayLeave(3, trampoline5),
        "[resource-drop]outgoing-body": _guardMayLeave(3, trampoline3),
        "[resource-drop]outgoing-response": _guardMayLeave(3, trampoline6),
        "[resource-drop]response-outparam": _guardMayLeave(3, trampoline7),
        "[static]incoming-body.finish": trampoline8,
        "[static]outgoing-body.finish": exports1["4"],
        "[static]response-outparam.set": exports1["9"]
      },
      "wasi:io/error@0.2.12": {
        "[resource-drop]error": _guardMayLeave(3, trampoline13)
      },
      "wasi:io/streams@0.2.12": {
        "[method]input-stream.read": exports1["0"],
        "[method]output-stream.blocking-write-and-flush": exports1["1"],
        "[resource-drop]input-stream": _guardMayLeave(3, trampoline0),
        "[resource-drop]output-stream": _guardMayLeave(3, trampoline1)
      },
      wasi_snapshot_preview1: {
        environ_get: exports1["13"],
        environ_sizes_get: exports1["14"],
        fd_close: exports1["15"],
        fd_fdstat_get: exports1["16"],
        fd_filestat_get: exports1["17"],
        fd_prestat_dir_name: exports1["19"],
        fd_prestat_get: exports1["18"],
        fd_read: exports1["20"],
        fd_write: exports1["21"],
        path_filestat_get: exports1["22"],
        path_open: exports1["23"],
        proc_exit: exports1["24"],
        random_get: exports1["12"]
      }
    }));
    ({ exports: exports3 } = yield instantiateCore(yield module2, {
      __main_module__: {
        cabi_realloc: exports2.cabi_realloc
      },
      env: {
        memory: exports2.memory
      },
      "wasi:cli/environment@0.2.3": {
        "get-environment": exports1["25"]
      },
      "wasi:cli/exit@0.2.3": {
        exit: trampoline21
      },
      "wasi:cli/stderr@0.2.3": {
        "get-stderr": trampoline16
      },
      "wasi:cli/stdin@0.2.3": {
        "get-stdin": trampoline19
      },
      "wasi:cli/stdout@0.2.3": {
        "get-stdout": trampoline20
      },
      "wasi:cli/terminal-input@0.2.3": {
        "[resource-drop]terminal-input": _guardMayLeave(3, trampoline17)
      },
      "wasi:cli/terminal-output@0.2.3": {
        "[resource-drop]terminal-output": _guardMayLeave(3, trampoline18)
      },
      "wasi:cli/terminal-stderr@0.2.3": {
        "get-terminal-stderr": exports1["47"]
      },
      "wasi:cli/terminal-stdin@0.2.3": {
        "get-terminal-stdin": exports1["45"]
      },
      "wasi:cli/terminal-stdout@0.2.3": {
        "get-terminal-stdout": exports1["46"]
      },
      "wasi:filesystem/preopens@0.2.2": {
        "get-directories": exports1["44"]
      },
      "wasi:filesystem/types@0.2.3": {
        "[method]descriptor.append-via-stream": exports1["32"],
        "[method]descriptor.get-flags": exports1["26"],
        "[method]descriptor.get-type": exports1["33"],
        "[method]descriptor.metadata-hash": exports1["35"],
        "[method]descriptor.metadata-hash-at": exports1["36"],
        "[method]descriptor.open-at": exports1["29"],
        "[method]descriptor.read-via-stream": exports1["30"],
        "[method]descriptor.stat": exports1["34"],
        "[method]descriptor.stat-at": exports1["28"],
        "[method]descriptor.write-via-stream": exports1["31"],
        "[resource-drop]descriptor": _guardMayLeave(3, trampoline15),
        "[resource-drop]directory-entry-stream": _guardMayLeave(3, trampoline14),
        "filesystem-error-code": exports1["27"]
      },
      "wasi:io/error@0.2.3": {
        "[resource-drop]error": _guardMayLeave(3, trampoline13)
      },
      "wasi:io/streams@0.2.3": {
        "[method]input-stream.blocking-read": exports1["38"],
        "[method]input-stream.read": exports1["37"],
        "[method]output-stream.blocking-flush": exports1["41"],
        "[method]output-stream.blocking-write-and-flush": exports1["42"],
        "[method]output-stream.check-write": exports1["39"],
        "[method]output-stream.write": exports1["40"],
        "[resource-drop]input-stream": _guardMayLeave(3, trampoline0),
        "[resource-drop]output-stream": _guardMayLeave(3, trampoline1)
      },
      "wasi:random/random@0.2.3": {
        "get-random-bytes": exports1["43"]
      }
    }));
    memory0 = exports2.memory;
    realloc0 = exports2.cabi_realloc;
    try {
      realloc0Async = WebAssembly.promising(exports2.cabi_realloc);
    } catch (err) {
      realloc0Async = exports2.cabi_realloc;
    }
    memory1 = exports0.memory;
    ({ exports: exports4 } = yield instantiateCore(yield module5, {
      async: {
        "enter-sync-call": trampoline34,
        "exit-sync-call": trampoline36
      },
      augments: {
        "mem1 I32Store": /* @__PURE__ */ __name((ptr, val, offset) => {
          new DataView(exports2.memory.buffer).setInt32(ptr + offset, val, true);
        }, "mem1 I32Store"),
        "mem1 I32Store8": /* @__PURE__ */ __name((ptr, val, offset) => {
          new DataView(exports2.memory.buffer).setInt8(ptr + offset, val, true);
        }, "mem1 I32Store8"),
        "mem1 MemorySize": /* @__PURE__ */ __name((ptr) => exports2.memory.buffer.byteLength / 65536, "mem1 MemorySize")
      },
      callee: {
        adapter0: exports0["leptolm:api/models#process-add-item"]
      },
      flags: {
        instance1: instanceFlags1,
        instance3: instanceFlags3
      },
      instance: {
        task_may_block: CURRENT_TASK_MAY_BLOCK
      },
      memory: {
        m0: exports0.memory
      },
      post_return: {
        adapter0: exports0["cabi_post_leptolm:api/models#process-add-item"]
      },
      realloc: {
        f0: exports0.cabi_realloc,
        f1: exports2.cabi_realloc
      },
      runtime: {
        trap: trampoline33
      },
      transcode: {
        "utf8-to-utf8 (mem0 => mem1)": trampoline37,
        "utf8-to-utf8 (mem1 => mem0)": trampoline35
      }
    }));
    realloc1 = exports3.cabi_import_realloc;
    try {
      realloc1Async = WebAssembly.promising(exports3.cabi_import_realloc);
    } catch (err) {
      realloc1Async = exports3.cabi_import_realloc;
    }
    ({ exports: exports5 } = yield instantiateCore(yield module4, {
      "": {
        $imports: exports1.$imports,
        "0": trampoline22,
        "1": trampoline23,
        "10": trampoline32,
        "11": exports4.adapter0,
        "12": exports3.random_get,
        "13": exports3.environ_get,
        "14": exports3.environ_sizes_get,
        "15": exports3.fd_close,
        "16": exports3.fd_fdstat_get,
        "17": exports3.fd_filestat_get,
        "18": exports3.fd_prestat_get,
        "19": exports3.fd_prestat_dir_name,
        "2": trampoline24,
        "20": exports3.fd_read,
        "21": exports3.fd_write,
        "22": exports3.path_filestat_get,
        "23": exports3.path_open,
        "24": exports3.proc_exit,
        "25": trampoline38,
        "26": trampoline39,
        "27": trampoline40,
        "28": trampoline41,
        "29": trampoline42,
        "3": trampoline25,
        "30": trampoline43,
        "31": trampoline44,
        "32": trampoline45,
        "33": trampoline46,
        "34": trampoline47,
        "35": trampoline48,
        "36": trampoline49,
        "37": trampoline50,
        "38": trampoline51,
        "39": trampoline52,
        "4": trampoline26,
        "40": trampoline53,
        "41": trampoline54,
        "42": trampoline23,
        "43": trampoline55,
        "44": trampoline56,
        "45": trampoline57,
        "46": trampoline58,
        "47": trampoline59,
        "5": trampoline27,
        "6": trampoline28,
        "7": trampoline29,
        "8": trampoline30,
        "9": trampoline31
      }
    }));
    incomingHandler0212Handle = exports2["wasi:http/incoming-handler@0.2.12#handle"];
  }), "_initGenerator"))();
  let promise, resolve, reject;
  function runNext(value) {
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
    } catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  __name(runNext, "runNext");
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();
await $init;
var incomingHandler0212 = {
  handle
};
var _util = {};

// worker/src/index.js
var src_default = {
  async fetch(request, env, ctx) {
    console.log("\u{1F4E6} WASM Exports:", Object.keys(app_exports));
    return new Response("Hello! \u30BF\u30FC\u30DF\u30CA\u30EB\u306E\u30ED\u30B0\u3092\u898B\u3066\u307F\u3066\u306D\uFF01");
  }
};

// ../home/vscode/.nvm/versions/node/v20.20.2/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../home/vscode/.nvm/versions/node/v20.20.2/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error2 = reduceError(e);
    return Response.json(error2, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-4zZp2x/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../home/vscode/.nvm/versions/node/v20.20.2/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-4zZp2x/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
