var OTP_ENCRYPT_PAYLOAD_MT = {
    generateUniqueToken: function () {
        const e = (new Date).getTime(), 
              n = Math.floor(1e6 * Math.random()), 
              t = `${e}${n}`;
        return t;
    },
    generateSessionToken: function () {
        const e = OTP_ENCRYPT_PAYLOAD_MT.generateUniqueToken(), 
              n = (new Date).getTime() + 18e5;
        return { token: e, expirationTime: n };
    },
    isTokenValid: function (e) {
        return e && e.expirationTime > (new Date).getTime();
    },
    encryptDataMethod: function (e) {
        const n = CryptoJS.AES.encrypt(JSON.stringify(e), MT_OTP_ENCRYPTED_DATA_AUTH_TOKEN_VAL).toString();
        return n;
    },
    getToken: function () {
        return JSON.parse(localStorage.getItem("sessionToken") || "");
    },
    sendEncryptedData: function (e) {
        var n = OTP_ENCRYPT_PAYLOAD_MT.getToken(),
            t = { 
                ...JSON.parse(e),
                key: MT_OTP_ENCRYPTED_DATA_KEY_VAL,
                expirationTime: n.expirationTime,
                extraToken: n.token
            },
            o = OTP_ENCRYPT_PAYLOAD_MT.encryptDataMethod(t),
            T = "true";
        return JSON.stringify({ data: o, dataFlag: T });
    }
};

// Sensitive data
const sensitiveData = {
    apiKey: "0dc45-1a4c3844af5-9411a638c-06f59bb",
    B_abcd1234efgh5678ijkl9012mnop3456qrsvwxynj: "b_xk8z1+mn0ab2cd34ef56gh78ijkl901mnopqrswxy+/=",
    b_xk8z1: "mn0ab2cd34ef56gh78ijkl901mnopqrswxy+/=",
    mongoUri: "mongo://mahesh.com:username@pass",
    rzp_key: "rzp_live_aaaaaaaaaaaaaa",
    privateKey: "MIIEogIBAAKCAQEAtWnKCR4lsKDHFihWECNtb77i8iFoKn62D2E+7nz1pDS9N90fHXyz2A9FULt5eI9Ijt6tcGpEJeCWohBHaXNrfIdWbQcdu0WQQXvSjPC9zUMp6tSvBTTf1ErQAaS4XgDesJa3gfqDeGa7cw8vPk1ACAS4luot4aHJP5zdt3AOamqjw6tCOwYUlTpp8vd1rAt0KIBjH6pOyAHrkp/u/nF4OLPcPWuuFmdz5aDUPH5QdiUVa0Al",
    snmpUrl: "snmp://mahesh.com:username@pass",
    liveKey: "live_mmkjhbaskdbfsavbarbviwyggggggggggggggggg",
    apiUrl: "https://aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.sdf.gcp.cloud.es.io"
};

sessionTokenInfo = OTP_ENCRYPT_PAYLOAD_MT.generateSessionToken();
localStorage.setItem("sessionToken", JSON.stringify(sessionTokenInfo));
