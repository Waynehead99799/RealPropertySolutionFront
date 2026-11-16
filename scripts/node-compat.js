/**
 * Compatibility shim for running Next.js 12 on Node >= 25.
 *
 * Node 25 removed `buffer.SlowBuffer`, which the `jsonwebtoken` copy bundled
 * inside Next 12 still reads at load time (`SlowBuffer.prototype`), crashing
 * the dev/prod server on boot. This preload restores a minimal alias.
 * Safe no-op on older Node versions.
 */
const buffer = require("buffer");

if (!buffer.SlowBuffer) {
    buffer.SlowBuffer = function SlowBuffer(size) {
        return Buffer.allocUnsafeSlow(size);
    };
    buffer.SlowBuffer.prototype = Buffer.prototype;
}
