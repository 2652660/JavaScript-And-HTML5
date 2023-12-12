class Fraction
{
	constructor () {
		this.Dividend = 0;
		this.Divisor = 1;
		this.Length = {
			Min: 1,
			Max: 2
		};
		this.Dyad = "2/1";
		this.Symbol = '/';
	}
	
	Parse (a)
	{
		if (typeof a !== "string") {
			try {
				a = this.toString(a);
			} catch {
				a = this.toString();
			}
		}
		a = a.trim().split("/");
		let length = this.Length.Max;
		if (Object.keys(a).length != length && Object.keys(a).length >= this.Length.Min) {
			for(let index = a.length; index < length; index++) {
				a.Divisor = Number(this.Divisor);
			}
		}
		if(Object.keys(a).length >= length) {
			for(let b of a) {
				a = {
					Dividend: Number(a.shift()),
					Divisor: Number(a.shift())
				}
			}
		}
		return a;
	};
	
	toString (a)
	{
		return `${a.Dividend}${this.Symbol}${a.Divisor}`;
	};
	
	Add (a,b)
	{
		a = this.Parse(a);
		b = this.Parse(b);
		let lcm = this.LeastCommonMultiple(b.Divisor,a.Divisor);
		a.Dividend *= (lcm / a.Divisor);
		b.Dividend *= (lcm / b.Divisor);
		b.Divisor = a.Divisor = lcm;
		b.Dividend = a.Dividend += b.Dividend;
		if(a.Divisor == b.Divisor) {
			let gcf = this.GreatCommonFactor(a.Dividend,a.Divisor);
			if(gcf > 1) {
				a.Dividend *= (gcf/a.Divisor);
				b.Dividend *= (gcf/b.Divisor);
				a.Divisor = b.Divisor = gcf;
			} else {
				a.Dividend *= b.Divisor;
				b.Dividend *= a.Divisor;
				a.Divisor *= b.Divisor;
			}
		}
		a = this.Reduce (a,b);
		return a;
	};
	
	Multiply (a,b)
	{
		a = this.Parse(a);
		b = this.Parse(b);
		a = {
			Dividend: a.Dividend * b.Dividend,
			Divisor: a.Divisor * b.Divisor
		};
		a = this.Reduce (a,b);
		return a;
	};
	
	Subtract (a,b)
	{
		/*a = this.Parse(a);
		b = this.Parse(b);
		[a,b] = this.Expand(a,b);
		a.Dividend -= b.Dividend;
		if(a.Divisor == b.Divisor) {
			return {
				Dividend: a.Dividend,
				Divisor: a.Divisor
			};
		}
		a.Divisor += b.Divisor;
		a = this.Division(a.Divisor,this.Dyad);
		return a;*/
	};
	
	Division (a,b)
	{
		a = this.Parse(a);
		b = this.Parse(b);
		a = this.Multiply(a,{
			Dividend: b.Divisor,
			Divisor: b.Dividend
		});
		a = this.Reduce (a,b);
		return a;
	};
	
	Mean (a,b)
	{
		a = this.Parse(a);
		b = this.Parse(b);
		a = this.Add(a,b);
		a = this.Reduce (a,b);
		a = this.Division(a,this.Dyad);
		a = this.Reduce (a,b);
		return a;
	};
	
	Expand (a,b)
	{
		/*a = this.Parse(a);
		b = this.Parse(b);
		if (a != b) {
			let LCM = this.LeastCommonMultiple(a.Divisor,b.Divisor);
			if(LCM > this.Length.Min) {
				let LCMa = LCM/b.Divisor, LCMb = LCM/a.Divisor;
				return [{
					Dividend: a.Dividend*=LCMa,
					Divisor: a.Divisor*=LCMa
				},{
					Dividend: b.Dividend*=LCMb,
					Divisor: b.Divisor*=LCMb
				}];
			}
			if(b.Divisor > this.Length.Min && this.Length.Min < a.Divisor) {
				return [{
					Dividend: a.Dividend*=b.Divisor,
					Divisor: a.Divisor*=b.Divisor
				},{
					Dividend: b.Dividend*=a.Divisor,
					Divisor: b.Divisor*=a.Divisor
				}];
			}
		}
		return [a,b]*/
	};
	
	Reduce (a,b)
	{
		a = this.Parse(a);
		b = this.Parse(b);
		let gcf = this.GreatCommonFactor(a.Dividend,a.Divisor);
		if(gcf > 1) {
			a.Dividend /= gcf;
			a.Divisor /= gcf;
		}
		return a;
	};
	
	GreatCommonFactor (a,b)
	{
		return !b?a:this.GreatCommonFactor(b,a%b)
	};
	
	LeastCommonMultiple (a,b)
	{
		return (a*b)/this.GreatCommonFactor(a,b)
	}
};
