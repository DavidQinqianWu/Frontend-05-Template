// javascript 狗咬人的代码
class Dog {
	action(actionType_) {
		if (actionType_ === "bite") {
			Object.setPrototypeOf(Dog, actionType_);
		}
	}
}
