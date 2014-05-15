(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(["knockout", "moment"], factory);
	} else {
		// Browser globals
		factory(ko, moment);
	}
}(this, function(ko, moment) {
	ko.extenders.moment = function(target, option) {
		var result = ko.computed({
			read: target, //always return the original observable's value
			write: function(value) {
				//force to a valid date
				var date = forceDate(value);
				target(date);
			}
		});

		function forceDate(date) {
			if (date) {
				return moment(date);
			}
		}

		target.equalityComparer = function(a, b) {
			//only trigger change event if date _really_ changed
			if (!a && !b) return true;
			if (!a || !b) return false;
			return a.valueOf() === b.valueOf();
		};

		result.linkable = formattedComputed("YYYY-MM-DD-HH[h]mm[m]s[s]");
		result.nativeFormat = formattedComputed("YYYY-MM-DD");
		result.usFormat = formattedComputed("MM/DD/YYYY");
		result.articleFormat = formattedComputed("MMMM Do, YYYY");
		result.localTime = formattedComputed('h:mm a');
		result.localTime24 = formattedComputed('HH:mm');
		result.monthName = formattedComputed('MMM');
		result.dayOfMonth = formattedComputed('DD');
		result.iso8601 = formattedComputed();

		function formattedComputed(formatString) {
			return ko.computed({
				read: function() {
					var date = result();

					if (date) {
						return date.format(formatString);
					}
				},
				write: function(value) {
					result(value);
				}
			});
		}

		return result;
	};
}));