DELIMITER $$

CREATE TRIGGER `users_onCreate` BEFORE INSERT ON users
FOR EACH ROW BEGIN
    SET NEW.created_at = now();
END $$

CREATE TRIGGER `users_onUpdate` BEFORE UPDATE ON users
FOR EACH ROW BEGIN
    SET NEW.updated_at = now();
END $$

CREATE TRIGGER `vehicles_onCreate` BEFORE INSERT ON vehicles
FOR EACH ROW BEGIN
    SET NEW.created_at = now();
END $$

CREATE TRIGGER `vehicles_onUpdate` BEFORE UPDATE ON vehicles
FOR EACH ROW BEGIN
    SET NEW.updated_at = now();
    IF (OLD.finished != NEW.finished) THEN 
        IF (NEW.finished = 1) THEN SET NEW.finished_at = now();
        ELSE SET NEW.finished_at = null; END IF;
    END IF;
    IF (OLD.removed != NEW.removed) THEN 
        IF (NEW.removed = 1) THEN SET NEW.removed_at = now();
        ELSE SET NEW.removed_at = null; END IF;
    END IF;
END $$

CREATE TRIGGER `settings_onUpdate` BEFORE UPDATE ON settings
FOR EACH ROW BEGIN
    SET NEW.updated_at = now();
END $$

CREATE TRIGGER `finances_onCreate` BEFORE INSERT ON finances
FOR EACH ROW BEGIN
    SET NEW.created_at = now();
END $$

DELIMITER ;