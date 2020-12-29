module.exports = {
    success: (status, message, data) => ({
      status,
      success: true,
      message,
      data,
    }),
    fail: (status, message) => ({
      status,
      success: false,
      message,
    }),
  };
  