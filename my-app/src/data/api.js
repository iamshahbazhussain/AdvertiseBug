import { Pages } from '@mui/icons-material';
import axios from 'axios';
import $ from 'jquery'

const apiUrl = 'http://localhost:8080/api/';

export const singleFileUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'singleFile', data, options);
    } catch (error) {
        throw error;
    }
}

export const getSingleFiles = async (id) => {
    try {
        console.log(id)
        const { data } = await axios.get(apiUrl + 'getSingleFiles', { params: { id: id } });
        return data;
    } catch (error) {
        throw error;
    }
}

export const multipleFilesUpload = async (data, options) => {
    try {
        await axios.post(apiUrl + 'multipleFiles', data, options);
    } catch (error) {
        throw error;
    }
}
export const getMultipleFiles = async () => {
    try {
        const { data } = await axios.get(apiUrl + 'getMultipleFiles');
        return data;
    } catch (error) {
        throw error;
    }
}

//posts
export const getAmountTopPage = async (date) => {
    try {
        console.log(date);
        const data = await axios.get(apiUrl + 'getAmountTopPage', {
            params: {
                date: date
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const getTopPage = async (subject) => {
    try {
        const { status, data } = await axios.get(apiUrl + 'getTopPage');
        return data;
    } catch (error) {
        throw error;
    }
}
export const getTopRated = async () => {
    try {
        const { status, data } = await axios.get(apiUrl + 'getTopRated');
        return data;
    } catch (error) {
        throw error;
    }
}

export const getPagePosts = async ({ page }) => {
    try {
        page = page.replaceAll("%20", " ")
        console.log(page);
        const { status, data } = await axios.get(apiUrl + 'getPagePosts', {
            params: {
                page: page,
            }
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const listAllAds = async () => {
    try {
        const { status, data } = await axios.get(apiUrl + 'listAllAds');
        return data;
    } catch (error) {
        throw error;
    }
}

export const searchPost = async (query) => {
    try {
        const response = await axios.get(apiUrl + 'searchPost', { params: { query: query } });
        console.clear();
        console.log(response);
        return response.data.output;
    } catch (error) {
        throw error;
    }
}

export const getAllPostTitle = async () => {
    try {
        const { status, data } = await axios.get(apiUrl + 'getAllPostTitle');
        console.log("in api")
        console.log(data.data)
        return data.data;
    } catch (error) {
        throw error;
    }
}

export const addPost = async ({ startTime, endTime, isTopPage, title, description, link, company, subject, subsubject, imgOrVideoId, pages, file }) => {
    try {

        let data = new FormData()
        data.append("title", title)
        data.append("description", description)
        data.append("link", link)
        data.append("company", company)
        data.append("subject", subject)
        data.append("subsubject", subsubject)
        data.append("imgOrVideoId", imgOrVideoId)
        data.append("file", file)
        data.append("pages", JSON.stringify(pages))
        data.append("isTopPage", JSON.stringify(isTopPage))
        data.append("startTime", JSON.stringify(startTime))
        data.append("endTime", JSON.stringify(endTime))

        // const { status, data } = await axios.post(apiUrl + 'addPost', formData);
        let res = await axios({
            url: apiUrl + "addPost",
            method: "POST",
            data,
            withCredentials: true
        })
        return res;
    } catch (error) {
        throw error;
    }
}
