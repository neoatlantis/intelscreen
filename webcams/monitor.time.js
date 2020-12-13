const measurements = [];

let version = null;

function getTimeDiff(){
    const start_time = new Date().getTime();
    $.ajax({
        type: 'GET',
        url: 'version.txt',
        success: function(data, textStatus, request){
            const end_time = new Date().getTime();
            const server_time = new Date(request.getResponseHeader('Date')).getTime();
            const diff = server_time - (end_time + start_time) / 2;

            console.log("measurement:", diff);

            measurements.push(diff);
            while(measurements.length > 10) measurements.pop();

            if(version === null){
                version = data;
            } else {
                if(version != data){
                    // refresh whole page
                    window.location.reload();
                }
            }
        }
    });
}
setInterval(getTimeDiff, 5000);
getTimeDiff();




function newDate(){
    let c = 0;
    if(measurements.length > 0){
        measurements.forEach((i) => c += i);
        let delta = c / measurements.length;
        console.log("Delta:", delta);
        return new Date(new Date().getTime() + delta);
    } else {
        return new Date();
    }
}

export { newDate };
