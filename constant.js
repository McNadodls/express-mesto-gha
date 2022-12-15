const patternEmail = /([\w\-.]{1,})@([\w\-.]{1,})\.(ru|com)/;
const patternUrl = /(https?:\/\/)(w{3}\.)?([\w\-.]{1,})\.(ru|com|net)(\/\w{1}([\w\-/]{1,}))?(\.[a-z]{2,4})?$/;
const secretKey = '123456';

module.exports = { secretKey, patternEmail, patternUrl };
