export class MathUtils {

    static average(data: number[]): number {
        var sum = data.reduce(function(sum, value){
            return sum + value;
          }, 0);       
          var avg = sum / data.length;
          return avg;
    }

    static standardDeviation(data: number[]): number {
        var avg = this.average(data);
        
        var squareDiffs = data.map(function(value){
          var diff = value - avg;
          var sqrDiff = diff * diff;
          return sqrDiff;
        });
        
        var avgSquareDiff = this.average(squareDiffs);
      
        var stdDev = Math.sqrt(avgSquareDiff);
        return stdDev;
    }

}
