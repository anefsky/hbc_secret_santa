(function() {
	document.getElementById('load').onclick = function() {
		doLoad();
	}
})()

function doLoad() {
	fetch('users.json')
		.then(function(response) {
		return response.json();
		})
		.then(function(myJson) {
		doDisplay(myJson);
		})
}

function doDisplay(json) {
	var elPairings = document.querySelector('#pairings');
	while(elPairings.hasChildNodes()) {
		elPairings.removeChild(elPairings.lastChild); // clear
	}
	var elGroups = document.createElement('ul');
	elGroups.classList.add('groups');
	elPairings.appendChild(elGroups);

	var groups = getGroups(json.users);
	groups.forEach(function(group) {
		var elGroup = document.createElement('li');
		elGroup.classList.add('group');
		elGroups.appendChild(elGroup);
		var elUsers = document.createElement('ul');
		elUsers.classList.add('users');
		elGroup.appendChild(elUsers);
		group.forEach(function(user) {
			var elUser = document.createElement('li');
			elUser.classList.add('user');
			elUser.appendChild(createUserElement(user));
			elUsers.appendChild(elUser);
		})			
	})
}

function createUserElement(user) {
	var usersObj =  [
		{
			text: user.name.first + ' ' + user.name.last,
			class: 'name'
		},
		{
			text: user.email,
			class: 'email'
		},
		{
			text: user.phone,
			class: 'phone'
		}
	];

	var elCard = document.createElement('ul');
	elCard.classList.add('card');

	usersObj.forEach(function(userObj) {
		var element = document.createElement('li');
		var elText = document.createTextNode(userObj.text);
		element.appendChild(elText);
		element.classList.add(userObj.class);
		elCard.appendChild(element);
	});
	return elCard;
}

function getGroups(users) {
	var shuffled = _.shuffle(users);
	var groups = [];

	while(shuffled.length) {
		var group = [];
		var groupSize = shuffled.length === 3 ? 3 : 2;
		for(var i = 0; i < groupSize; i++) {
			group.push(shuffled.shift());
		}
		groups.push(group);
	}
	return groups;
}
