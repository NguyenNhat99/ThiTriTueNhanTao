import api from "./api";
const login = async (email, password) => {
    try {
        const res = await api.post(`/accounts/auth/signin`, {
            email,
            password,
        });
        console.log(res);
        const token = res.data;
        localStorage.setItem("jwt_token", token);
        return token;
    } catch {
        throw new Error("Lỗi");
    }
};
const signUp = async (formData) => {
    try {
        const res = await api.post('/accounts/auth/singup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || error.message || 'Đăng ký thất bại';
    }
};
const getCurrentUser = async () => {
    try {
        const token = getToken();
        if (!token) return null;
        const res = await api.get(`/accounts/auth/GetUser`, {
            headers: { Authorization: `bearer ${token}` },
        });
        return res.data;
    } catch {
        // Tự động logout nếu token không hợp lệ
        logout(); 
        return null;
    }
};
const updatePassword = async (MatKhau, MatKhauMoi) => {
    try {
        const res = await api.post(`/accounts/auth/changePassword`, {
            MatKhau, MatKhauMoi
        });
        return res.status === 200;
    } catch (error) {
        return false;
    }
}
const updateInformation = async (updateData) => {
    try {
        const res = await api.post("/accounts/auth/changeinformation", updateData);
        console.log("aaa" + res)
        return res.status === 200;
    } catch (err) {
        console.error("Cập nhật thông tin thất bại:", err);
        return false;
    }
}
const updateEmployeeInformation = async (updateData) => {
    try {
        const res = await api.post("/accounts/auth/ChangeEmployeeInformation", updateData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.status === 200;
    } catch (err) {
        console.error("Cập nhật thông tin thất bại:", err);
        return false;
    }
}
const logout = () => {
    localStorage.removeItem("jwt_token");
    window.location.reload();
};
const getToken = () => {
    return localStorage.getItem("jwt_token");
};
const getAccounts = async () => {
    try {
        const token = getToken();
        if (!token) throw new Error("Chưa đăng nhập");

        const res = await api.get('/accounts/auth/accounts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;
    } catch (error) {
        throw error.response?.data || error.message || 'Lỗi không xác định';
    }
};
const getAccountDetail = async (email) => {
    try {
        const token = getToken();
        if (!token) throw new Error("Chưa đăng nhập");

        const res = await api.get(`/accounts/auth/detail/${email}`);

        return res.data;
    } catch (error) {
        throw error.response?.data || error.message || "Không thể lấy thông tin tài khoản";
    }
};

export default {
    login,
    signUp,
    logout,
    getToken,
    getCurrentUser,
    updatePassword,
    updateInformation,
    getAccounts,
    getAccountDetail,
    updateEmployeeInformation
};
