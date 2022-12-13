const patternEmail = /([\w\-.]{1,})@([\w\-.]{1,})\.(ru|com)/;
const patternUrl = /(https?:\/\/)(w{3}\.)?([\w\-.]{1,})\.(ru|com)(\/\w{1}([\w\-/]{1,}))?(\.[a-z]{2,4})?$/;

module.exports = { patternEmail, patternUrl };