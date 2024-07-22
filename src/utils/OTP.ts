    import NextCrypto from 'next-crypto';

const encryptOTP = async (otp: string): Promise<string> => {
    return new Promise<string>(async (resolve, reject) => {
        try {
             let key:string =process.env.OTP_SECRET_KEY||''
            const crypto = new NextCrypto(key);
        
            const encrypted = await crypto.encrypt(otp);
            resolve(encrypted);
        } catch (error) {
            console.error('Error encrypting OTP:', error);
            reject(error);
        }
    });
};
const decryptOTP = async (text: string): Promise<string|null> => {
    return new Promise<string|null>(async (resolve, reject) => {
        try {
            let key:string =process.env.OTP_SECRET_KEY||''
            const crypto = new NextCrypto(key);
            const decrypted = await crypto.decrypt(text);
            console.log({decrypted});
            
            resolve(decrypted);
        } catch (error) {
            console.error('Error decrypting OTP:', error);
            reject(error);
        }
    });
};

const generateOTP = async (length: number = 6): Promise<string> => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};

const verifyOTP = async (enterOtp: string, encryptedOTP: string): Promise<boolean> => {
    console.log({enterOtp});
    console.log({encryptedOTP});
    try {
        const decryptedEnterOtp = await decryptOTP(encryptedOTP);
        console.log({decryptedEnterOtp});
        const isValid = enterOtp === decryptedEnterOtp;
        return isValid;
    } catch (error) {
        console.error('Error during OTP verification:', error);
        return false;
    }
};

export { generateOTP, encryptOTP, verifyOTP, decryptOTP };
