// OpenPGP.js - An OpenPGP implementation in javascript
// Copyright (C) 2015-2016 Decentral
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 3.0 of the License, or (at your option) any later version.
//
// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

// Implementation of ECDSA following RFC6637 for Openpgpjs

/**
 * @requires util
 * @requires crypto/hash
 * @requires crypto/public_key/elliptic/curves
 * @module crypto/public_key/elliptic/ecdsa
 */

import util from '../../../util';
import hash from '../../hash';
import { get as curvesGet } from './curves';

/**
 * Sign a message using the provided key
 * @param  {module:type/oid} oid        Elliptic curve object identifier
 * @param  {enums.hash}      hash_algo  Hash algorithm used to sign
 * @param  {Uint8Array}      m          Message to sign
 * @param  {Uint8Array}      d          Private key used to sign the message
 * @return {{r: BN, s: BN}}             Signature of the message
 */
async function sign(oid, hash_algo, m, d) {
  const curve = curvesGet(oid);
  const key = curve.keyFromPrivate(d);
  return key.sign(m, hash_algo);
}

/**
 * Verifies if a signature is valid for a message
 * @param  {module:type/oid} oid        Elliptic curve object identifier
 * @param  {enums.hash}      hash_algo  Hash algorithm used in the signature
 * @param  {{r: BN, s: BN}}  signature  Signature to verify
 * @param  {Uint8Array}      m          Message to verify
 * @param  {Uint8Array}      Q          Public key used to verify the message
 * @return {Boolean}
 */
async function verify(oid, hash_algo, signature, m, Q) {
  const curve = curvesGet(oid);
  const key = curve.keyFromPublic(Q);
  return key.verify(m, signature, hash_algo);
}

export default { sign, verify };
