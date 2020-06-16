// import * as bip39 from "bip39";
import random from "../src/crypto/random";

test("generate rsa with random", () => {
	console.log(random.getRandomBytes(32));
	expect("").toBe("");
});
