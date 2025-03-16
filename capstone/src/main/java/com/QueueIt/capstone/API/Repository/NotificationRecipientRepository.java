package com.QueueIt.capstone.API.Repository;

import com.QueueIt.capstone.API.Entities.NotificationRecipient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface NotificationRecipientRepository extends JpaRepository<NotificationRecipient, Long> {

    List<NotificationRecipient> findTop10ByRecipientIDOrderByNotificationDateTimeGeneratedDesc(Long recipientID);


}
