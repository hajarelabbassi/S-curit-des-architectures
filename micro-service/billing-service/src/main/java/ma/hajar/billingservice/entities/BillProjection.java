package ma.hajar.billingservice.entities;

import org.springframework.data.rest.core.config.Projection;

@Projection(name = "fullBill", types = Bill.class)
public interface BillProjection {
    Long getId();
    java.util.Date getBillingDate();
    long getCustomerId();
}
