module.exports = (config) => {
  config.set({
    clearTextReporter: { logTests: true },
    files: ['*.js','id_rsa','id_rsa.pub'],
  	mutate: ["auth.js","signature.js"],
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["clear-text", "progress"],
    testRunner: "jest",
    thresholds: { 
    	high: 80, 
    	low: 60, 
    	break: 50 }
  });
};
