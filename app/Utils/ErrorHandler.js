export default function errorHandler(errors: Array, processedError){
    if(errors.length > 0) {
        var message = "";
        var errormsg =  Object.values(errors).map(function(values){
            return `${message}\n${values}`;
        });
        //   console.log(errormsg);

        processedError(errormsg);
        return;
    }
}
